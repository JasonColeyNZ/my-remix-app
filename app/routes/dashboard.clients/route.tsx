import {
  Outlet,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { useContext, useEffect, useMemo } from "react";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard";
import SectionPage from "~/layouts/page-layouts/SectionPage.tsx";
import { getClients } from "~/models/client.server.ts";
import { getTableDefault } from "~/models/user.default.server.ts";
// import { getUsers } from "~/models/user.server.ts";
import { AppContext } from "~/store/appContext.tsx";
import { FormStateTypes } from "~/store/formReducer.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { TableTypes } from "~/utils/types.ts";
import ClientsDataGrid from "./components/ClientsDataGrid";
import appInfo from "~/app-info";

import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary";

//VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// import reactgrids from "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: reactgrids }];
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Clients" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "sbUser is required");

  const [clients, tableDefaults] = await Promise.all([
    getClients(sbUser),
    // getUsers(sbUser),
    getTableDefault(TableTypes.CLIENTS, sbUser),
  ]);

  invariantResponse(clients, "clients should be defined", { status: 404 });

  return json({ clients, tableDefaults });
}

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  // let formData = await request.formData();

  // const result = await withZod(deleteClientSchema).validate(formData);
  // if (result.error) {
  //   return validationError(result.error);
  // }
  // if (result.data.action !== "client-delete") {
  //   return json({ status: "action-invalid" });
  // }

  // await deleteClient(result.data.id, sbUser);

  return json({ status: "ok" });
}
const Clients = () => {
  // console.log("Render Clients");
  const location = useLocation();

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

  const clientsForm = useMemo(() => {
    // console.log("location.pathname", location.pathname);
    const regExpClients = new RegExp(`/dashboard/clients\\s`);
    return regExpClients.test(location.pathname + " ");
  }, [location.pathname]);

  return (
    <>
      <SectionPage id="clients-background" hideUI={false} breadcrumbOnly={true}>
        {!clientsForm && <Outlet />}
        {clientsForm && (
          <FullScreenCardLayout>
            <ClientsDataGrid />
            <Outlet />
          </FullScreenCardLayout>
        )}
      </SectionPage>
    </>
  );
};
export default Clients;

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
