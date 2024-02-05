import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";

import { resetSchema } from "../../resetSchema.ts";
import type { action } from "../../route.tsx";
import Modal from "~/components/modal/Modal.tsx";
import Button from "~/components/button/Button.tsx";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";

export default function ResetPasswordForm() {
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  const [form, fields] = useForm({
    id: "reset-password-form",
    constraint: getFieldsetConstraint(resetSchema),
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: resetSchema });
    },
    shouldRevalidate: "onBlur",
  });

  return (
    <Modal
      title="Reset Password"
      showTitle={true}
      width={400}
      height={0}
      onClose={() => navigate("/")}
    >
      <Form {...form} method="POST" className="login-form ">
        <AuthenticityTokenInput />
        <div className="flex flex-col gap-4">
          <TextInput
            labelProps={{ children: "Email" }}
            inputProps={{
              ...conform.input(fields.email, {}),
            }}
            errors={fields.email.errors}
          />
          <Button
            type="submit"
            name="intent"
            value="reset-password"
            labelDefault={"Reset your password"}
            url={null} // labelSubmitting="Resetting your password.."
          />
          <div className="flex flex-col justify-center ">
            <div className="m-auto text-sm font-light p-1">Return to</div>
            <Button labelDefault="Sign In" url="/login"></Button>
          </div>
        </div>
      </Form>
    </Modal>
  );
}
