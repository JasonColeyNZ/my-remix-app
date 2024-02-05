import { getFormProps, useForm } from "@conform-to/react";
// import type { ShouldRevalidateFunction } from "@remix-run/react";
import {
  Form,
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { Button } from "~/components/ui/button.tsx";
import { demoDataInstall, getEntity } from "~/models/entity.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import { DemoFormIntent, demoSchema } from "./demoSchema.ts";
import appInfo from "~/app-info.tsx";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import {
  SETTINGS_COMPANY_SELECTED_TAB,
  SETTINGS_SELECTED_TAB,
} from "~/const.ts";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

// export const shouldRevalidate: ShouldRevalidateFunction = () => {
//   return true;
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Company Demo" }];
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: demoSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  if (submission.value) {
    switch (submission.value.intent) {
      case DemoFormIntent.INSTALL: {
        // console.log(submission.value);
        await demoDataInstall(true, sbUser, request);
        return json(submission.reply());
      }
      case DemoFormIntent.UNINSTALL: {
        // console.log(submission.value);
        await demoDataInstall(false, sbUser, request);
        return json(submission.reply());
      }
    }

    return json(submission.reply({ formErrors: ["Invalid intent"] }));
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const entity = await getEntity(sbUser);

  const session = await getSession(request);
  // console.log("Company.Demo.setCookie");
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_COMPANY_SELECTED_TAB + "/demo");

  return json(
    {
      status: "ok",
      demoInstalled: entity?.demoDataInstalled ?? false,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const DemoData = () => {
  const { demoInstalled } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const [form] = useForm({
    id: "demo-data",
    constraint: getZodConstraint(demoSchema),
    // defaultValue: demoInstalled,
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: demoSchema });
    },
  });
  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Demo Data</div>
        <div className="text-sm text-secondary-foreground">
          Demonstration data can be automatically generated for your company.
          This data can be used to test the functionality of Easy MedSpa. You
          can even have your own data alongside the demo data. When you are
          ready to remove the demo data, you can do so with the click of a
          button.
        </div>
      </div>
      <SettingsRightCard>
        <>
          <div className="p-4 mx-auto">
            <Form method="post" {...getFormProps(form)}>
              <Button
                className="mr-2"
                name="intent"
                type="submit"
                value="add-demo-data"
                variant="default"
                disabled={demoInstalled}
              >
                Install Demo Data
              </Button>
              <Button
                name="intent"
                type="submit"
                value="remove-demo-data"
                variant="default"
                disabled={!demoInstalled}
              >
                Remove Demo Data
              </Button>
            </Form>
          </div>
          {demoInstalled && (
            <div className="p-4 px-20">
              <div className="text-sm font-medium">
                A new location has been added called "Demo Location". This
                location has rooms, services, products and staff members. You
                can use this data to test the functionality of Easy MedSpa.
              </div>
            </div>
          )}
        </>
      </SettingsRightCard>
    </div>
  );
};

export default DemoData;

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
