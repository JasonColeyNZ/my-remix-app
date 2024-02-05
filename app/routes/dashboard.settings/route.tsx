import {
  Outlet,
  isRouteErrorResponse,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { type LoaderFunctionArgs, json, redirect } from "@remix-run/cloudflare";
import { SETTINGS_SELECTED_TAB } from "~/const.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";

import { settingsTabs } from "./tabs.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import { useMemo } from "react";
import { requireUserSession } from "~/utils/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "sbUser is required");

  //get the last used tab and redirect if needed
  // const session = await getSession(request);
  // // console.log("SETTINGS_SELECTED_TAB", session.get(SETTINGS_SELECTED_TAB));
   const selectedSettingsTab =
     //   session.get(SETTINGS_SELECTED_TAB) || 
     settingsTabs[0].url;
  //compare url with last selected
  const pathname = new URL(request.url).pathname;

  const tabInfo = settingsTabs.find((x) => x.regExp.test(pathname));
  // console.log("tabInfo", tabInfo);
  //only redirect if the tab is not found
   if (!tabInfo) {
  //   // console.log("redirectingto:", selectedSettingsTab);
     return redirect(selectedSettingsTab);
   }
  return json(
    {  },
    {
      // headers: {
      //   "Set-Cookie": await sessionStorage.commitSession(session),
      // },
    },
  );
}

const Settings = () => {
  //if path records/forms/ is requested, redirect to records/forms/records
  const location = useLocation();

  //we want the forms route to be full width
  const formRoute = useMemo(() => {
    const regExpForms = new RegExp(
      `/dashboard/settings/records/forms/(\\w+\\-\\w+\\-\\w+\\-\\w+\\-\\w+|new)\\s`,
    );
    return regExpForms.test(location.pathname + " ");
  }, [location.pathname]);

  return (
    <div
      className={cn(
        "flex flex-1 flex-col sm:flex-row min-h-0 mx-auto ",
        formRoute && "w-full",
      )}
    >
      <Outlet />
    </div>
  );
};
export default Settings;

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        400: () => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>{isRouteErrorResponse(error) ? error.data : "unknown"}</p>
            </div>
          );
        },
        404: () => {
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
