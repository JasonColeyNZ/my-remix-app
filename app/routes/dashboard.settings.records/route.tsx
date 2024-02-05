// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";

import { settingsTabs } from "./tabs.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import {
  SETTINGS_RECORDS_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import { moduleInRoles, requireUserSession } from "~/utils/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { ModuleIdentifier } from "@prisma/client";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser, roles } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  if (!moduleInRoles(roles, [ModuleIdentifier.FormsSettings], "Read"))
    return redirect("/dashboard", { headers: {} });

  const pathname = new URL(request.url).pathname;

  const tabInfo = settingsTabs.find((x) => x.regExp.test(pathname));
  if (!tabInfo) {
    return redirect("forms");
  }

  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_RECORDS_SELECTED_TAB);

  return json(
    { selectedSettingsTab: tabInfo.url },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsRecords = () => {
  return <Outlet />;
};
export default SettingsRecords;

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
