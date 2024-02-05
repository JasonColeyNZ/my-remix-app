import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { Form, useActionData } from "@remix-run/react";
import { createBrowserClient } from "@supabase/ssr";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { Checkbox } from "~/components/ui/checkbox.tsx";
import { Label } from "~/components/ui/label.tsx";

import { emailLoginSchema } from "../../loginSchema.ts";
import type { action } from "../../route.tsx";
import Button from "~/components/button/Button.tsx";
import Spacer from "~/components/spacer.tsx";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";
import ErrorList from "~/components/form-controls/ErrorList.tsx";
import RightPane from "~/layouts/page-layouts/RightPane.tsx";
import { Separator } from "~/components/ui/separator.tsx";

export default function LoginForm() {
  const actionData = useActionData<typeof action>();

  const handleSignInWithGithub = async () => {
    const supabase = createBrowserClient(
      window.ENV.SUPABASE_URL,
      window.ENV.SUPABASE_ANON_KEY,
    );
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/callback"
            : ""
        }`,
      },
    });
  };

  const handleSignInWithGoogle = async () => {
    const supabase = createBrowserClient(
      window.ENV.SUPABASE_URL,
      window.ENV.SUPABASE_ANON_KEY,
    );
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${
          process.env.NODE_ENV === "development"
            ? "http://localhost:3000/callback"
            : ""
        }`,
      },
    });
  };

  const [form, fields] = useForm({
    id: "login-form",
    constraint: getFieldsetConstraint(emailLoginSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      // console.log(parse(formData, { schema: loginSchema }));
      return parse(formData, { schema: emailLoginSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <RightPane>
      <div className="text-2xl font-normal text-foreground my-2">
        Welcome to Easy MedSpa!
      </div>
      <div className="flex text-base font-light text-secondary-foreground my-2 flex-wrap">
        Please sign-in to your account and start the adventure
      </div>
      <div className="grid w-full gap-2 grid-cols-1 wide:grid-cols-2 my-4">
        <Form method="POST" {...form.props}>
          <div className="grid gap-2">
            <AuthenticityTokenInput />
            <HoneypotInputs />

            <TextInput
              labelProps={{ children: "Email" }}
              inputProps={{
                ...conform.input(fields.email),
                autoComplete: "username",
                autoFocus: true,
                className: "lowercase",
              }}
              errors={fields.email.errors}
            />
            <TextInput
              labelProps={{ children: "Password" }}
              inputProps={{
                ...conform.input(fields.password, {
                  type: "password",
                }),
                autoComplete: "current-password",
                className: "lowercase",
              }}
              errors={fields.password.errors}
            />
            <div className="grid gap-3 grid-cols-2 mb-4">
              <div className="items-center flex space-x-2">
                <Checkbox id="remember" name="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember Me
                </label>
              </div>
              <div className="flex flex-col items-end">
                <Button
                  classNames="text-sm font-normal text-right p-0 h-4 normal-case hover:no-underline"
                  variant={"link"}
                  labelDefault="Forgot password?"
                  url="/resetpassword"
                ></Button>
              </div>
            </div>
            <Button
              classNames="normal-case"
              name="intent"
              value="email"
              type="submit"
              labelDefault={"Sign In"}
              url={null}
            />
          </div>
          <ErrorList errors={form.errors} id={form.errorId} />
          <Spacer size={"4xs"} />
        </Form>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center items-baseline text-sm font-light text-foreground my-2 gap-4">
            New on our platform?
            <Button
              classNames="text-sm font-normal text-right p-0 h-unset normal-case hover:no-underline"
              variant={"link"}
              labelDefault="Create an account"
              url="/signup"
            ></Button>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <div className="flex mb-4">
              <Separator className="flex-1 mt-2" />
              <Label className="px-4 text-foreground font-light">or</Label>
              <Separator className="flex-1 mt-2" />
            </div>
            <Button
              type="button"
              classNames="bg-github border-github text-github-foreground normal-case"
              labelDefault={"Sign In with Github"}
              color={"#24292d"}
              url={null}
              onClick={handleSignInWithGithub}
            />
            <Button
              type="button"
              classNames="bg-google border-google text-google-foreground normal-case"
              labelDefault={"Sign In with Google"}
              url={null}
              onClick={handleSignInWithGoogle}
            />
          </div>
          <Spacer size={"3xs"} />
        </div>
      </div>
    </RightPane>
  );
}
