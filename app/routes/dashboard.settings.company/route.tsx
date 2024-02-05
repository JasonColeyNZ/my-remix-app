// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json, redirect } from "@remix-run/cloudflare";
import { useContext, useEffect } from "react";
import { AppContext } from "~/store/appContext.tsx";
import { FormStateTypes } from "~/store/formReducer.ts";

import { settingsTabs } from "./tabs.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import {
  SETTINGS_COMPANY_SELECTED_TAB,
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

  if (!moduleInRoles(roles, [ModuleIdentifier.CompanySettings], "Read"))
    return redirect("/dashboard", { headers: {} });

  const pathname = new URL(request.url).pathname;

  const tabInfo = settingsTabs.find((x) => x.regExp.test(pathname));
  if (!tabInfo) {
    return redirect("info");
  }
  // console.log("Company.setCookie");

  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_COMPANY_SELECTED_TAB);
  return json(
    {},
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsCompany = () => {
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

  return (
    <div className="flex flex-1 flex-col sm:flex-row xs:flex-auto mx-auto xs:w-full sm:w-max-lg">
      <Outlet />
    </div>
  );
};
export default SettingsCompany;

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
