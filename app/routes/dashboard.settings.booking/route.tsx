// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";

import { settingsTabs } from "./tabs.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import {
  SETTINGS_BOOKING_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export async function loader({ request }: LoaderFunctionArgs) {
  const pathname = new URL(request.url).pathname;

  const tabInfo = settingsTabs.find((x) => x.regExp.test(pathname));
  if (!tabInfo) {
    return redirect("details");
  }

  // console.log("Booking.setCookie");
  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_BOOKING_SELECTED_TAB);
  return json(
    {},
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsBooking = () => {
  return (
    <div className="flex flex-1 mb-2 mt-1 flex-col sm:flex-row xs:flex-auto mx-auto xs:w-full sm:w-max-lg pt-1">
      <Outlet />
    </div>
  );
};
export default SettingsBooking;

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
