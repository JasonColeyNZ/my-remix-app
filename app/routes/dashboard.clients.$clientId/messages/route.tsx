import {
  Outlet,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard.tsx";
// import type { MessageItemType } from "~/models/message.server.ts";
import { getClientMessages } from "~/models/message.server.ts";
import { getTableDefault } from "~/models/user.default.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { TableTypes } from "~/utils/types.ts";

import MessagesDataGrid from "./components/MessagesDataGrid.tsx";
import appInfo from "~/app-info.tsx";
import { metaMatchesData } from "~/utils/routeData/route-matches.ts";

// VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// import reactgrids from "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: reactgrids }];
// };

export const meta: MetaFunction = ({ matches }) => {
  const data = metaMatchesData(
    "routes/dashboard.clients.$clientId/route",
    matches,
  );
  return [
    {
      title: `${appInfo.title} -  ${
        data ? data.client.firstName + " " + data.client.lastName : "Client"
      } Messages`,
    },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("client.messages:loader: ");
  // const session = await getSession(request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { clientId } = params;
  invariantResponse(clientId, "clientId is required");
  //console.log("client.records:loader: ");
  const [messages, tableDefaults] = await Promise.all([
    getClientMessages(clientId, sbUser),
    getTableDefault(TableTypes.CLIENT_MESSAGES, sbUser),
  ]);

  // setSessionVariable(
  //   request,
  //   session,
  //   CLIENTS_SELECTED_TAB,
  //   "messages",
  //   ClientInfoTabs,
  // );

  return json(
    {
      status: "ok",
      clientId,
      messages,
      tableDefaults,
    },
    // {
    //   headers: {
    //     "Set-Cookie": await sessionStorage.commitSession(session),
    //   },
    // },
  );
}

const ClientMessages = () => {
  // const { dispatch } = useContext(AppContext);
  const location = useLocation();

  const regExpMessages = new RegExp(
    `/dashboard/clients/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/messages\\s`,
  );
  const messagesForm = regExpMessages.test(location.pathname + " ");

  return (
    <>
      {!messagesForm && <Outlet />}
      {messagesForm && (
        <FullScreenCardLayout>
          <MessagesDataGrid />
        </FullScreenCardLayout>
      )}
    </>
  );
};

export default ClientMessages;

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
