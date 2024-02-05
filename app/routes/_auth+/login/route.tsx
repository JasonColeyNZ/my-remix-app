import { parse } from "@conform-to/zod";
import { type MetaFunction } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { z } from "zod";
import getSupabaseServerClient from "~/services/supabase.ts";
import { safeRedirect } from "~/utils.server.ts";
import { createUserSession } from "~/utils/auth.server.ts";
import { validateCSRF } from "~/utils/csrf.server.ts";
import { checkHoneypot } from "~/utils/honeypot.server.ts";

import LoginForm from "./components/login-form/LoginForm.tsx";
import { emailLoginSchema } from "./loginSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { getUserById } from "~/models/user.server.ts";
import { UserOnboarding } from "~/utils/types.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  const response = new Response();
  const supabaseClient = getSupabaseServerClient(request, response);

  //  await oAuthStrategy.checkSession(request, {
  //    successRedirect: "/dashboard",
  //  });
  // const session = await sessionStorage.getSession(
  //   request.headers.get("Cookie"),
  // );

  // const error = session.get(authenticator.sessionErrorKey);

  // return json({});

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  if (user) {
    const dbUser = await getUserById(user.id, user);
    console.log("dbUser", dbUser);
    if (dbUser?.onboardingStatus === UserOnboarding.COMPLETED)
      return redirect("/dashboard", { headers: response.headers });
    return redirect("/completesignup", { headers: response.headers });
  }

  //get user from db to check onboarding progress
  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const response = new Response();
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  if (requestUrl.host !== "192.168.20.100:3000")
    await validateCSRF(formData, request.headers);
  checkHoneypot(formData);

  const supabaseClient = getSupabaseServerClient(request, response);

  const submission = await parse(formData, {
    schema: (intent) =>
      emailLoginSchema.transform(async (data, ctx) => {
        if (intent !== "submit") return { ...data, user: null };

        const { data: user } = await supabaseClient.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

        // console.log("user", user);
        if (!user.user) {
          ctx.addIssue({
            code: "custom",
            message: "Invalid username or password",
          });
          return z.NEVER;
        }
        return { ...data, user: { id: user.user?.id } };
      }),
    async: true,
  });
  // get the password off the payload that's sent back
  delete submission.payload.password;

  if (submission.intent !== "submit") {
    // @ts-expect-error - conform should probably have support for doing this
    delete submission.value?.password;
    return json({ status: "idle", submission } as const);
  }

  //no user found
  if (!submission.value?.user?.id) {
    // @ts-expect-error - conform should probably have support for doing this
    delete submission.value?.password;
    return json({ status: "error", submission } as const);
  }

  const redirectTo = safeRedirect(formData.get("redirectTo"), "/dashboard");

  return createUserSession({
    redirectTo,
    response,
  });
}

export const meta: MetaFunction = () => [{ title: "Sign In" }];

const LoginPage = () => {
  return (
    <div className="flex flex-col flex-1 items-center w-full">
      <LoginForm />
    </div>
  );
};
export default LoginPage;

export function ErrorBoundary() {
  <GeneralErrorBoundary />;
}
