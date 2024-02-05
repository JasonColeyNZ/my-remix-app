// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
// import { SETTINGS_COMPANY_SELECTED_TAB } from "~/const.ts";
// import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import SystemInfo from "./components/SystemInfo.tsx";
import {
  SystemInfoFormIntent,
  updateSystemSchema,
} from "./components/updateSystemSchema.ts";
import appInfo from "~/app-info.tsx";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import {
  SETTINGS_COMPANY_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import { parseWithZod } from "@conform-to/zod";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Company System Settings" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: updateSystemSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case SystemInfoFormIntent.UPDATE: {
      console.log(submission.value);
      // const updatedLocation = await updateLocation(
      //   { ...submission.value, address: submission.value.address ?? undefined },
      //   sbUser,
      // );

      return json(submission.reply());
    }
  }

  // return json({ status: "ok", data: updatedLocation });
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  // const city = request.headers.get("x-vercel-ip-city") || "Emerald";
  // const country = request.headers.get("x-vercel-ip-country") || "AU";
  // const region = request.headers.get("x-vercel-ip-country-region") || "QLD";

  //console.log("request: ", request);

  // const session = await getSession(request);
  // session.set(SETTINGS_COMPANY_SELECTED_TAB, "system");
  const session = await getSession(request);

  // console.log("Company.System.setCookie");
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_COMPANY_SELECTED_TAB + "/system");

  return json(
    { status: "ok", systemInfo: {} },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsCompanySystem = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">System Settings</div>
        <div className="text-sm text-secondary-foreground">
          Use the options below to configure your Easy MedSpa system
        </div>
      </div>
      <SystemInfo />
    </div>
  );
};
export default SettingsCompanySystem;

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
