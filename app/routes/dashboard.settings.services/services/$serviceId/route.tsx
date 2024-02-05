import { parseWithZod } from "@conform-to/zod";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import {
  formViewerIntent,
  // formViewerProductListIntent,
} from "~/components/form-viewer/formViewerSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { getCategories } from "~/models/category.server.ts";
// import { getAreaForms } from "~/models/form.server.ts";
import { getConsents } from "~/models/consents.server.ts";
import { getLocations } from "~/models/location.server.ts";
import {
  addService,
  getServiceById,
  updateService,
  // updateServiceProducts,
} from "~/models/services.server.ts";
import { getUsers } from "~/models/user.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import ServiceForm from "./components/ServiceForm.tsx";
import { ServiceSchema } from "./serviceSchema.ts";
import { getProducts } from "~/models/product.server.ts";

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: ServiceSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const newService = await addService(submission.value, sbUser);
      redirect(`/dashboard/settings/services/${newService?.id}`);
    }
    case formViewerIntent.UPDATE: {
      // console.log("submission.addon: ", submission.value.addon);

      const result = await updateService(submission.value, sbUser);
      if (!result.successful) {
        return json(
          submission.reply({
            // You can also pass additional error to the `reply` method
            formErrors: ["Submission failed"],
          }),
        );
      }
      return json(submission.reply({ resetForm: true }));
      // return json({ status: 200, data: newService, submission } as const);
    }
    // case formViewerProductListIntent.UPDATE: {
    //   const newService = await updateServiceProducts(submission.value, sbUser);
    //   return json(submission.reply({ resetForm: true }));
    //   // return json({ status: 200, data: newService, submission } as const);
    // }
  }
  //console.log("user: ", result.data.users);
  //result.data.entityId = entityId;

  // if (!newService)
  //   return json({
  //     status: 404,
  //     data: null,
  //     error: adding ? "Service not created" : "Service not updated",
  //   });

  // if (adding) return redirect(`/dashboard/settings/services/${newService.id}`);
  // else return json({ status: 200, data: newService });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log(".service:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { serviceId } = params;
  invariantResponse(serviceId, "serviceId is required");

  const [
    service,
    rawCategories,
    rawUsers,
    rawProducts,
    // rawForms,
    rawLocations,
    rawConsents,
  ] = await Promise.all([
    getServiceById({ id: serviceId }, sbUser),
    getCategories(sbUser),
    getUsers(sbUser),
    getProducts(sbUser),
    // getAreaForms({ area: "ClientRecord" }, sbUser),
    getLocations(sbUser),
    getConsents(sbUser),
  ]);

  if (!service) {
    console.log("service not found: ", serviceId);
    redirect("/dashboard/settings/services");
    return;
  }

  const users = rawUsers.map((user, index) => {
    return {
      value: user.id,
      text: `${user.firstName} ${user.lastName}`,
      sortOrder: index,
    };
  });

  const categories = rawCategories.map((category, index) => {
    return {
      value: category.id,
      text: category.name,
      sortOrder: index,
    };
  });

  // const forms = rawForms.map((form, index) => {
  //   return {
  //     value: form.id,
  //     text: form.name,
  //     sortOrder: index,
  //   };
  // });

  const products = rawProducts.map((product, index) => {
    return {
      value: product.id,
      text: product.name,
      sortOrder: index,
    };
  });

  const locations = rawLocations.map((location, index) => {
    return {
      value: location.id,
      text: location.name,
      sortOrder: index,
    };
  });

  const concurrent = Array.from(Array(20)).map((_, i) => {
    return {
      value: i + 1 + "",
      text: i + 1 + "",
    };
  });

  const consents = rawConsents.map((consent, index) => {
    return {
      value: consent.id,
      text: consent.name,
      sortOrder: index,
    };
  });

  // const processedQuestionnaires = questionnaires.map((questionnaire: any) => {
  //     return {
  //       value: questionnaire.id,
  //       text: questionnaire.name,
  //     };
  //   });

  // const categoriesAndServices = rawCategoriesAndServices?.categories.map(
  //   (questionnaire: any) => {
  //     return {
  //       value: questionnaire.id,
  //       text: questionnaire.name,
  //     };
  //   },
  // );

  return json({
    service,
    categories,
    users,
    // forms,
    products,
    locations,
    consents,
    concurrent,
  });
}

const Service = () => {
  return (
    <div className="flex w-full h-full">
      <ServiceForm />
    </div>
  );
};
export default Service;

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
