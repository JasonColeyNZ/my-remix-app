// import type { ShouldRevalidateFunction } from "@remix-run/react";
import {
  Outlet,
  isRouteErrorResponse, // useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";

import { clientSettingsTabs } from "./tabs.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import {
  SETTINGS_CLIENT_SELECTED_TAB,
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

  if (!moduleInRoles(roles, [ModuleIdentifier.ClientSettings], "Read"))
    return redirect("/dashboard", { headers: {} });

  //get the last used tab and redirect if needed
  const pathname = new URL(request.url).pathname;

  const tabInfo = clientSettingsTabs.find((x) => x.regExp.test(pathname));
  if (!tabInfo) {
    return redirect("tags");
  }
  // console.log("Client.setCookie");
  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_CLIENT_SELECTED_TAB);
  return json(
    { selectedSettingsTab: tabInfo.url },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const ClientSettings = () => {
  // const { selectedSettingsTab } = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-1 flex-col sm:flex-row xs:flex-auto mx-auto xs:w-full sm:w-max-lg">
      <Outlet />
    </div>
  );
};
export default ClientSettings;

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
