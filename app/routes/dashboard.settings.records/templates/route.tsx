import type { ShouldRevalidateFunction } from "@remix-run/react";
import {
  Outlet,
  isRouteErrorResponse,
  useActionData,
  useNavigate,
  useRouteError,
} from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useEffect } from "react";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import {
  SETTINGS_RECORDS_SELECTED_TAB,
  SETTINGS_TEMPLATE_SELECTED,
} from "~/const.ts";
import {
  createTextTemplate,
  getTextTemplates,
} from "~/models/textTemplate.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { redirectToFirstId } from "~/utils/redirect-to-first-id.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import { addTemplateSchema, templateIntent } from "./addTemplateSchema.ts";
import TemplateList from "./components/TemplateList.tsx";
import Toolbar from "./components/Toolbar.tsx";
import { parseWithZod } from "@conform-to/zod";

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: addTemplateSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case templateIntent.ADD_TEMPLATE: {
      return json({
        template: await createTextTemplate(submission.value, sbUser),
      } as const);
    }
    default:
      invariantResponse({}, 'Invalid "intent" parameter');
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const session = await getSession(request);
  session.set(SETTINGS_RECORDS_SELECTED_TAB, "templates");
  const { templateId } = params;

  const templates = await getTextTemplates(sbUser);

  if (!templateId) {
    const obj = await redirectToFirstId(
      session,
      SETTINGS_TEMPLATE_SELECTED,
      params,
      "templateId",
      "/dashboard/settings/records/templates/",
      templates,
      "id",
    );
    if (obj) return obj;
  }

  return json(
    { status: "ok", templates },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const SettingsRecordsTemplates = () => {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData && actionData.template) {
      navigate(actionData.template.id);
    }
  }, [actionData, navigate]);

  return (
    <div className="flex flex-1 flex-col sm:flex-row xs:flex-auto sm:min-h-md mx-auto xs:w-full sm:w-max-lg overflow-auto">
      <div id="templates-root" className="flex-1 flex min-h-0">
        <div className="flex flex-1 flex-col md:flex-row">
          <TemplateList />
          <div className="flex flex-1 min-h-0 flex-col">
            <Toolbar />
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsRecordsTemplates;

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
