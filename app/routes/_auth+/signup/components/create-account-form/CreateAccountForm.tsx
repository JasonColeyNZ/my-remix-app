import { Form, useActionData } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import RightPane from "~/layouts/page-layouts/RightPane.tsx";
import { createAccountSchema } from "../../createAccountSchema.ts";
import type { action } from "../../route.tsx";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";
import Button from "~/components/button/Button.tsx";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import { getFormProps, useForm } from "@conform-to/react";
import { Separator } from "~/components/ui/separator.tsx";
import { Label } from "~/components/ui/label.tsx";
import Spacer from "~/components/spacer.tsx";
import { createBrowserClient } from "@supabase/ssr";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

export default function CreateAccountForm() {
  const actionData = useActionData<typeof action>();
  // const navigate = useNavigate();

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

  const [form] = useForm({
    id: "login-form",
    defaultValue: {
      intent: formViewerIntent.CREATE,
    },
    constraint: getZodConstraint(createAccountSchema),
    lastResult: actionData,
    onValidate({ formData }) {
      const parsed = parseWithZod(formData, {
        schema: createAccountSchema,
      });
      if (parsed.status !== "success")
        console.log("onValidate: formData.error", parsed.error);
      return parsed;
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <RightPane>
      <div className="text-2xl font-normal text-foreground my-2">
        Adventure starts here
      </div>
      <div className="text-l font-light text-secondary-foreground my-2">
        Make your Med Spa management easy and fun
      </div>
      <div className="grid w-full gap-2 grid-cols-1 wide:grid-cols-2 my-4">
        <Form
          method="POST"
          className="create-account-form"
          {...getFormProps(form)}
        >
          <AuthenticityTokenInput />
          <HoneypotInputs />
          <div className="grid w-full grid-cols-2 gap-2 ">
            <TextInput
              labelProps={{ children: "First Name" }}
              fieldName="firstName"
            />
            <TextInput
              labelProps={{ children: "Last Name" }}
              fieldName="lastName"
            />
            <div className="policy-info col-span-2">
              <TextInput labelProps={{ children: "Email" }} fieldName="email" />
            </div>
            <div className="policy-info col-span-2">
              <TextInput
                labelProps={{ children: "Password" }}
                fieldName="password"
                // inputProps={{
                //   ...conform.input(fields.password, {
                //     type: "password",
                //   }),
                //   className: "lowercase",
                // }}
                // errors={fields.password.errors}
              />
            </div>
            <div className="policy-info col-span-2">
              <TextInput
                labelProps={{ children: "Confirm Password" }}
                fieldName="confirmPassword"
                // inputProps={{
                //   ...conform.input(fields.confirmPassword, {
                //     type: "password",
                //   }),
                //   className: "lowercase",
                // }}
                // errors={fields.confirmPassword.errors}
              />
            </div>
            <div className="col-span-2">
              <Button
                classNames="normal-case"
                name="intent"
                value="CREATE"
                type="submit"
                fullWidth={true}
                labelDefault={"Create Account"}
                url={null}
              />
            </div>
          </div>

          {/* <div className="grid gap-3 grid-cols-2 "> */}

          {/* </div> */}
          <Spacer size={"4xs"} />
        </Form>
        <div className="flex flex-col gap-3">
          <div className="flex justify-center items-baseline text-sm font-light text-foreground my-2 gap-4">
            Already have an account?
            <Button
              classNames="text-sm font-normal text-right p-0 h-unset normal-case hover:no-underline"
              variant={"link"}
              labelDefault="Sign in insead"
              url="/login"
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
