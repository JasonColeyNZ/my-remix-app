import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import {
  createProduct,
  getProductById,
  getProductTypes,
  getUnitsOfMeasure,
  updateProduct,
} from "~/models/product.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import ProductForm from "./components/ProductForm.tsx";
import { productSchema } from "./productSchema.ts";
import { getEntityServices } from "~/models/services.server.ts";
import { TrackingType } from "~/utils/types.ts";
import { parseWithZod } from "@conform-to/zod";

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  // console.log("services:action: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: productSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const newProduct = await createProduct(submission.value, sbUser);

      invariantResponse(newProduct, "Product not created");
      return redirect("..");
    }
    case formViewerIntent.UPDATE: {
      const newProduct = await updateProduct(submission.value, sbUser);

      invariantResponse(newProduct, "Product not updated");
      return json(submission.reply());
    }
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const productId = params.productId;
  invariantResponse(productId, "Product Id should be provided");

  const [rawProduct, productTypes, services] = await Promise.all([
    getProductById(productId, sbUser),
    (await getProductTypes(sbUser)).map((pt) => ({
      text: pt.name,
      value: pt.id,
    })),
    (await getEntityServices(sbUser)).map((s) => ({
      text: s.name,
      value: s.id,
    })),
  ]);

  const product = {
    ...rawProduct,
    services: rawProduct.services.map((s) => {
      return {
        // id: s.id,
        serviceId: s.serviceId,
        trackingType: s.trackingType === TrackingType.UNIT ? "on" : "off",
        qty: s.qty,
      };
    }),
  };

  const unitsOfMeasure = getUnitsOfMeasure().map((uom) => ({
    text: uom.name,
    value: uom.id,
  }));

  return json({
    status: "ok",
    product,
    productTypes,
    services,
    unitsOfMeasure,
  });
}

const ProductDetail = () => {
  return <ProductForm />;
};

export default ProductDetail;

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        400: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>{isRouteErrorResponse(error) ? error.data : "unknown"}</p>
            </div>
          );
        },
        404: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>Page not found</p>
            </div>
          );
        },
      }}
    />
  );
}
