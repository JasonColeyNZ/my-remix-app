import { Form, Link, useActionData, useSubmit } from "@remix-run/react";
import React, { useEffect, useRef } from "react";
import type { action } from "../route";
import { Label } from "@radix-ui/react-dropdown-menu";
import SwitchField from "~/components/form-controls/switch/Switch";
import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import {
  CompleteSignupStepIntent,
  legalStepSchema,
} from "../completeSignupSchema";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";

interface LegalStepProps {
  legal: any;
  visible: boolean;
  nextClick: boolean;
  setNextClick: React.Dispatch<React.SetStateAction<boolean>>;
  nextStep: () => void;
}

const LegalStep = ({
  legal,
  visible,
  nextClick,
  setNextClick,
}: LegalStepProps) => {
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const submit = useSubmit();

  // console.log("legal", legal);

  useEffect(() => {
    if (!nextClick || !visible) return;

    // console.log("nextClickonPersonalStep", nextClick);
    //submit form
    if (!formRef.current) return;
    // console.log("submitting form");
    // setNextClick(false);
    submit(formRef.current);
  }, [nextClick, setNextClick, submit, visible]);

  const [form, fields] = useForm({
    id: "legal-step-form",
    ref: formRef,
    defaultValue: legal,
    constraint: getFieldsetConstraint(legalStepSchema),
    lastSubmission:
      actionData?.submission &&
      actionData?.submission.payload.intent === CompleteSignupStepIntent.LEGAL
        ? actionData?.submission
        : undefined,
    onValidate({ formData }) {
      return parse(formData, { schema: legalStepSchema });
    },
  });

  return (
    <Form
      method="POST"
      className="create-account-form flex-1"
      {...form.props}
      style={{ display: `${visible ? "block" : "none"}` }}
    >
      <AuthenticityTokenInput />
      <div className={"grid w-full gap-2 p-0"}>
        <input {...conform.input(fields.intent)} type="hidden" />
        <div className="text-center policy-info col-span-2 font-light text-sm gap-3">
          <div className="pb-2 text-foreground">
            By creating an account, you agree to the following policies
          </div>
          <div className="grid w-full items-center">
            <Label>
              <Link className="font-semibold text-lg text-primary" to="#">
                Terms of Service
              </Link>
            </Label>
          </div>
          <div className="grid w-full items-center">
            <div className="p-2 mx-auto flex space-x-2">
              <SwitchField
                labelProps={{
                  children: "I have read and agree to the Terms of Service",
                }}
                inputProps={{
                  ...conform.input(fields.agreeToTerms, { type: "checkbox" }),
                }}
                errors={fields.agreeToTerms.errors}
                hideError={false}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-1">
            <Label>
              <Link className="font-semibold text-lg text-primary" to="#">
                Privacy Policy
              </Link>
            </Label>
          </div>
          <div className="grid w-full items-center gap-1">
            <div className="p-2 mx-auto flex space-x-2">
              <SwitchField
                labelProps={{
                  children: "I have read and agree to the Privacy Policy",
                }}
                inputProps={{
                  ...conform.input(fields.agreeToPrivacy, { type: "checkbox" }),
                }}
                errors={fields.agreeToPrivacy.errors}
                hideError={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default LegalStep;
