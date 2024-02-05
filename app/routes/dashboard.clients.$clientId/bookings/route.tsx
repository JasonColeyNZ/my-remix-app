import {
  Outlet,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard.tsx";
import { getClientBookings } from "~/models/booking.server.ts";
import { getTableDefault } from "~/models/user.default.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { TableTypes } from "~/utils/types.ts";

import BookingsDataGrid from "./components/BookingsDataGrid.tsx";
import appInfo from "~/app-info.tsx";
import { metaMatchesData } from "~/utils/routeData/route-matches.ts";

export const meta: MetaFunction = ({ matches }) => {
  const data = metaMatchesData(
    "routes/dashboard.clients.$clientId/route",
    matches,
  );
  return [
    {
      title: `${appInfo.title} -  ${
        data ? data.client.firstName + " " + data.client.lastName : "Client"
      } Bookings`,
    },
  ];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const clientId = params.clientId;
  invariantResponse(clientId, "clientId is required");
  // const session = await getSession(request);

  // setSessionVariable(
  //   request,
  //   session,
  //   CLIENTS_SELECTED_TAB,
  //   "bookings",
  //   ClientInfoTabs,
  // );

  const [bookings, tableDefaults] = await Promise.all([
    getClientBookings(clientId, sbUser),
    getTableDefault(TableTypes.CLIENT_BOOKINGS, sbUser),
  ]);

  return json(
    {
      status: "ok",
      bookings,
      clientId,
      tableDefaults,
    },
    // {
    //   headers: {
    //     "Set-Cookie": await sessionStorage.commitSession(session),
    //   },
    // },
  );
}

const ClientBookings = () => {
  const location = useLocation();
  const regExpBookings = new RegExp(
    `/dashboard/clients/\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+/bookings\\s`,
  );
  const bookingsForm = regExpBookings.test(location.pathname + " ");

  return (
    <>
      {!bookingsForm && <Outlet />}
      {bookingsForm && (
        <>
          <FullScreenCardLayout>
            <BookingsDataGrid />
            {/* <DataTable
              columns={columns}
              data={bookings}
              tableDefaults={tableDefaults}
              tableArea={TableTypes.CLIENT_BOOKINGS}
              onRowClick={(row: any) => {
                navigate(
                  `/dashboard/clients/${clientId}/bookings/${row.original.id}`,
                );
              }}
            /> */}
          </FullScreenCardLayout>
        </>
      )}
    </>
  );
};

export default ClientBookings;

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
