import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useContext, useEffect } from "react";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard.tsx";
import { deleteProduct, getProducts } from "~/models/product.server.ts";
import { getTableDefault } from "~/models/user.default.server.ts";
import { AppContext } from "~/store/appContext.tsx";
import { FormStateTypes } from "~/store/formReducer.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { useUser } from "~/utils/routeData/dashboard.ts";
import { moduleInRoles, requireUserSession } from "~/utils/session.server.ts";
import { ModuleIdentifier, TableTypes } from "~/utils/types.ts";

import ProductsDataGrid from "./components/ProductsDataGrid.tsx";
import appInfo from "~/app-info.tsx";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import {
  SETTINGS_PRODUCTS_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";

// VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// import reactgrids from "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: reactgrids }];
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Products" }];
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();

  switch (formData.get("intent")) {
    case "product-delete": {
      const productId = formData.get("id")?.toString();
      invariantResponse(productId, "Product Id should be provided");
      const deletedProduct = await deleteProduct(productId, sbUser);
      invariantResponse(deletedProduct, "Product not deleted");
      return json({ status: 200 });
    }
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  console.log("products:loader: ");
  const { user: sbUser, roles } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  // const session = await getSession(request);

  if (!moduleInRoles(roles, [ModuleIdentifier.ProductsSettings], "Read"))
    return redirect("/dashboard", { headers: {} });

  const [products, tableDefaults] = await Promise.all([
    getProducts(sbUser),
    getTableDefault(TableTypes.PRODUCTS, sbUser),
  ]);

  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_PRODUCTS_SELECTED_TAB);

  // console.log("Products.setCookie");
  return json(
    {
      status: "ok",
      products,
      tableDefaults,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Products = () => {
  const user = useUser();

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (!state.formState.formEditor) return;
    dispatch({
      type: FormStateTypes.formEditor,
      payload: {
        formEditor: false,
      },
    });
  }, [state.formState.formEditor, dispatch]);

  if (!user) return null;

  // const handleAddClick = () => {
  //   navigate(`/dashboard/settings/products/new`, { replace: true });
  //   // const data = { letterId, intent: "add-consent" };
  //   // fetcher.submit(data, {
  //   //   method: "POST",
  //   //   // action: ``,
  //   // });
  //   // setConsentId("new");
  //   // setShowEditor(!showEditor);
  // };

  return (
    <div className="flex flex-col w-full h-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Product Catalogue</div>
        <div className="text-sm text-secondary-foreground">
          Manage the Products available for Clients below.
        </div>
      </div>
      <div className="flex flex-1">
        <FullScreenCardLayout>
          <ProductsDataGrid />
          <Outlet />
        </FullScreenCardLayout>
      </div>
    </div>
  );
};
export default Products;

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
