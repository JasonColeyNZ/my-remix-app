import {
  useLoaderData,
  // type ShouldRevalidateFunction,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import IntegrationEditor from "./components/IntegrationEditor";
import { requireUserSession } from "~/utils/session.server";
import { invariantResponse } from "~/utils/misc";
import { IntegrationIntent, integrationSchema } from "./integrationSchema";
import { getIntegration, getIntegrations } from "~/models/integration.server";
import IntegrationDetails from "./components/IntegrationDetails";
import { IntegrationsProvider } from "./store/integrationsContext";
import integrationsJSON from "./integrations.json";
import { MailchimpProvider } from "~/utils/marketing-providers/mailchimp.server";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary";
import { getSession, sessionStorage } from "~/services/session.server";
import { SETTINGS_COMPANY_SELECTED_TAB, SETTINGS_SELECTED_TAB } from "~/const";
import { parseWithZod } from "@conform-to/zod";
// import { IntegrationType } from "~/utils/types";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };
export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Company Integrations" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: integrationSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  //get MarketingProvider
  let provider = null;
  //console.log(submission.value.integration);

  switch (submission.value.intent) {
    case IntegrationIntent.CONNECT: {
      const requestUrl = new URL(request.url);
      switch (submission.value.integration.toLowerCase()) {
        case "mailchimp":
          provider = new MailchimpProvider(sbUser, requestUrl, null);
      }
      invariantResponse(provider, "No Provider Found");
      console.log(submission.value);
      return provider?.connect();
    }
    case IntegrationIntent.CHECK: {
      //load integration
      const integration = await getIntegration(
        submission.value.integration,
        sbUser,
      );
      switch (submission.value.integration.toLowerCase()) {
        case "mailchimp":
          provider = new MailchimpProvider(sbUser, null, integration);
      }
      invariantResponse(provider, "No Provider Found");

      return provider?.check();
    }
  }

  return json({ status: "error", submission } as const);
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const _integrations = await getIntegrations(sbUser);

  const integrations = await Promise.all(
    integrationsJSON.map(async (integration) => {
      const _integration = _integrations.find(
        (_integration) =>
          _integration.integrationType === integration.integrationType,
      );
      return {
        ...integration,
        id: _integration?.id,
        lists: _integration?.lists,
      };
    }),
  );
  const session = await getSession(request);

  // console.log("Company.Integrations.setCookie");
  session.set(
    SETTINGS_SELECTED_TAB,
    SETTINGS_COMPANY_SELECTED_TAB + "/integrations",
  );

  return json(
    { integrations },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Integrations = () => {
  const { integrations } = useLoaderData<typeof loader>();
  // console.log("integrations", integrations);

  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Third Party Integrations</div>
        <div className="text-sm text-secondary-foreground">
          Easy MedSpa can integrate with other websites allowing you to sync and
          share your company information with other services your company
          utilizes. Use the controls below to integrate Easy MedSpa with your
          other services.
        </div>
      </div>
      <div>
        <IntegrationsProvider>
          <div className="p-4">
            <div className="flex flex-col gap-4 mt-4">
              {integrations?.map((integration) => (
                <IntegrationDetails
                  key={integration.integrationType}
                  integration={integration}
                />
              ))}
            </div>
          </div>
          <div className="p-4 mx-auto"></div>
          <IntegrationEditor />
        </IntegrationsProvider>
      </div>
    </div>
  );
};

export default Integrations;

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
