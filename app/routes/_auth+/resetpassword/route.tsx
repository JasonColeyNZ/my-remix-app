import {
  type MetaFunction,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import getSupabaseServerClient from "~/services/supabase.ts";
import { safeRedirect } from "~/utils.server.ts";
import { validateCSRF } from "~/utils/csrf.server.ts";

import ResetPasswordForm from "./components/reset-password-form/ResetPasswordForm.tsx";
import { resetSchema } from "./resetSchema.ts";
import { parseWithZod } from "@conform-to/zod";

export const meta: MetaFunction = () => [{ title: "Sign Up" }];

export async function action({ request }: ActionFunctionArgs) {
  // const response = new Response();

  const formData = await request.formData();
  await validateCSRF(formData, request.headers);

  // const supabaseClient = getSupabaseServerClient(request, response);
  const submission = parseWithZod(formData, { schema: resetSchema });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }
  // const redirectTo = safeRedirect(formData.get("redirectTo"), "/dashboard");

  if (submission.value?.intent !== "reset-password") {
    return json({ status: "idle", submission } as const);
  }
  // 🐨 you can change this check to !submission.value?.user
  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  // if (error) {
  return json({ status: "error", submission } as const, { status: 400 });
  // }
}

const ResetPassword = () => {
  return <ResetPasswordForm />;
};
export default ResetPassword;

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
