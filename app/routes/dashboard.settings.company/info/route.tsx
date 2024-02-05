// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import {
  SETTINGS_COMPANY_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";
import { getEntity, updateEntity } from "~/models/entity.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import Info from "./components/Info.tsx";
import { entitySchema } from "./entitySchema.ts";
import appInfo from "~/app-info.tsx";
import { parseWithZod } from "@conform-to/zod";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };
export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Company Information" }];
};
export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: entitySchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.UPDATE: {
      console.log(submission.value);
      const entity = await updateEntity(
        { ...submission.value, address: submission.value.address ?? undefined },
        sbUser,
      );
      invariantResponse(entity, "Company not updated");
      // const entity = await updateEntity({ ...submission.value, address: submission.value.address ?? undefined }, sbUser);
      // invariantResponse(entity, "Company not updated");
      return json(submission.reply());
    }
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const ENV = process.env as any;

  const entity = await getEntity(sbUser);
  //console.log(entity);

  const country = request.headers.get("x-vercel-ip-country");
  const session = await getSession(request);
  // console.log("Company.Info.setCookie");
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_COMPANY_SELECTED_TAB + "/info");

  return json(
    { status: "ok", entity, ENV, country },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsCompanyInfo = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Company Information</div>
        <div className="text-sm text-secondary-foreground">
          Update your company information below
        </div>
      </div>
      <SettingsRightCard>
        <Info />
      </SettingsRightCard>
    </div>
  );
};
export default SettingsCompanyInfo;

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
