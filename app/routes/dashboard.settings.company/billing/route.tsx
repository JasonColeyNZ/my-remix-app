// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import {
  SETTINGS_COMPANY_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Company Billing" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  // console.log("Company.Billing.setCookie");
  session.set(
    SETTINGS_SELECTED_TAB,
    SETTINGS_COMPANY_SELECTED_TAB + "/billing",
  );

  return json(
    { status: "ok" },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsCompanyBilling = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Easy MedSpa Billing</div>
        <div className="text-sm text-secondary-foreground">
          Select your billing plan from the options below
        </div>
      </div>
    </div>
  );
};
export default SettingsCompanyBilling;

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
