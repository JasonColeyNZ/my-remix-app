import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { cn } from "~/utils/shadcn.utils.ts";

import {
  CompleteSignupStepIntent,
  // CompleteSignupStepIntent,
  companyStepSchema,
} from "../completeSignupSchema.ts";
import { type action } from "../route.tsx";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

interface CompanyStepProps {
  company: any;
  visible: boolean;
  nextClick: boolean;
  setNextClick: React.Dispatch<React.SetStateAction<boolean>>;
  nextStep: () => void;
}

const CompanyStep = ({
  company,
  visible,
  nextClick,
  setNextClick,
  nextStep,
}: CompanyStepProps) => {
  // console.log("company", company);
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const submit = useSubmit();

  useEffect(() => {
    if (!nextClick || !visible) return;
    // console.log("nextClickonCompanyStep", nextClick);
    //submit form
    if (!formRef.current) return;
    // console.log("submitting form");
    // setNextClick(false);
    submit(formRef.current);
  }, [nextClick, visible, submit, setNextClick]);

  const [form, fields] = useForm({
    id: "company-step-form",
    // ref: formRef,
    defaultValue: company,
    constraint: getZodConstraint(companyStepSchema),
    lastResult:
      actionData?.status === "success" &&
      // actionData?. .submission &&
      actionData?.initialValue?.intent === CompleteSignupStepIntent.COMPANY
        ? actionData?.initialValue
        : undefined,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: companyStepSchema });
    },
  });

  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  // const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });

  return (
    <Form
      method="POST"
      className="create-account-form flex-1"
      {...getFormProps(form)}
      style={{ display: `${visible ? "block" : "none"}` }}
    >
      <AuthenticityTokenInput />
      <div className={cn("grid w-full gap-2 p-0")}>
        <input {...getInputProps(fields.intent, { type: "hidden" })} />
        <TextInput
          labelProps={{ children: "Company Name" }}
          descriptionProps={{
            children:
              "This is the name that will be displayed to your customers",
          }}
          fieldName={"name"}
          // field={fields.company}
          // getInputProp inputProps={{
          //   ...conform.input(fields.company),
          //   autoFocus: true,
          // }}
          errors={fields.company.errors}
        />
        <input {...getInputProps(fields.locationId, { type: "hidden" })} />
        <TextInput
          labelProps={{ children: "Default Location" }}
          descriptionProps={{
            children:
              "You may only have one location, if so this will be your default",
          }}
          // inputProps={{
          //   ...conform.input(fields.location),
          // }}
          errors={fields.location.errors}
          fieldName={"location"}
        />
      </div>
    </Form>
  );
};

export default CompanyStep;
