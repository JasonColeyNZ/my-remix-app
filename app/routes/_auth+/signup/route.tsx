import {
  type MetaFunction,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import getSupabaseServerClient from "~/services/supabase.ts";
import { validateCSRF } from "~/utils/csrf.server.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import CreateAccountForm from "./components/create-account-form/CreateAccountForm.tsx";
import { createAccountSchema } from "./createAccountSchema.ts";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import { createNewEntity } from "~/models/user.server.ts";
import { safeRedirect } from "~/utils.server.ts";
import { createUserSession } from "~/utils/auth.server.ts";
import { parseWithZod } from "@conform-to/zod";

export async function loader({ request }: LoaderFunctionArgs) {
  // const response = new Response();

  const { user: sbUser } = await requireUserSession(request, true);

  if (sbUser) return redirect("/");

  // console.log("sbUser", sbUser.user_metadata);
  //get user from database

  // const supabaseClient = await getSupabaseServerClient(request, response);
  // const {
  //   data: { user },
  // } = await supabaseClient.auth.getUser();
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const response = new Response();

  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  const submission = parseWithZod(formData, {
    schema: createAccountSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  // const submission = parseWithZod(formData, { schema: createAccountSchema });

  const supabaseClient = getSupabaseServerClient(request, response);
  // get the password off the payload that's sent back
  delete submission.payload.password;
  delete submission.payload.confirmPassword;

  if (submission.value?.intent !== formViewerIntent.CREATE) {
    // @ts-expect-error - conform should probably have support for doing this
    delete submission.value?.password;
    // @ts-expect-error - conform should probably have support for doing this
    delete submission.value?.confirmPassword;
    return json(submission.reply());
  }
  // you can change this check to !submission.value?.user
  // if (submission.status !== "success") {
  //   return json(submission.reply(), {
  //     status: submission.status === "error" ? 400 : 200,
  //   });
  // }

  const { email, password, firstName, lastName } = submission.value;

  //A trigger exists on the auth.User table called create_user
  //the trigger creates a public.user record with the id and email
  const { error, data } = await supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        firstName,
        lastName,
      },
    },
  });
  // console.log("error", error);
  if (!error) {
    if (data.user) {
      if (await createNewEntity(data.user.id, firstName, lastName, request)) {
        //we have added a new entity, so should finish our onboarding

        const redirectTo = safeRedirect("/logout");

        return createUserSession({
          redirectTo,
          response,
        });
      }
    }
  }

  if (error) {
    return json(submission.reply(), {
      status: 400,
    });
  }

  return redirect("/login");
}

export const meta: MetaFunction = () => [{ title: "Sign Up" }];

export default function Join() {
  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <CreateAccountForm />
    </div>
  );
}

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
