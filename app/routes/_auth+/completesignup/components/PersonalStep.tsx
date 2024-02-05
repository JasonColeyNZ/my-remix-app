import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { cn } from "~/utils/shadcn.utils.ts";

import {
  CompleteSignupStepIntent,
  personalStepSchema,
} from "../completeSignupSchema.ts";
import { type action } from "../route.tsx";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";

import DatePicker from "~/components/form-controls/date-picker/DatePicker.tsx";

interface PersonalStepProps {
  user: any;
  visible: boolean;
  nextClick: boolean;
  setNextClick: React.Dispatch<React.SetStateAction<boolean>>;
  nextStep: () => void;
}

const PersonalStep = ({
  user,
  visible,
  nextClick,
  setNextClick,
}: PersonalStepProps) => {
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const submit = useSubmit();

  // console.log(
  //   "actionData.submission.payload.intent",
  //   actionData?.submission.payload.intent,
  // );

  // const isBigScreen = useMediaQuery({ query: "(min-width: 1824px)" });
  // const isLandscape = useMediaQuery({ query: "(orientation: landscape)" });

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
    id: "personal-step-form",
    ref: formRef,
    defaultValue: user,
    constraint: getFieldsetConstraint(personalStepSchema),
    lastSubmission:
      actionData?.submission &&
      actionData?.submission.payload.intent ===
        CompleteSignupStepIntent.PERSONAL
        ? actionData?.submission
        : undefined,

    onValidate({ formData }) {
      return parse(formData, { schema: personalStepSchema });
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
      <div className={cn("grid w-full grid-cols-2 gap-2 p-0")}>
        <input {...conform.input(fields.intent)} type="hidden" />
        <TextInput
          labelProps={{ children: "First Name" }}
          inputProps={{
            ...conform.input(fields.firstName),
            autoFocus: true,
          }}
          errors={fields.firstName.errors}
        />
        <TextInput
          labelProps={{ children: "Last Name" }}
          inputProps={{
            ...conform.input(fields.lastName),
          }}
          errors={fields.lastName.errors}
        />
        <TextInput
          labelProps={{ children: "Home Number" }}
          inputProps={{
            ...conform.input(fields.homeNumber),
          }}
          errors={fields.homeNumber.errors}
        />
        <TextInput
          labelProps={{ children: "Work Number" }}
          inputProps={{
            ...conform.input(fields.workNumber, {}),
          }}
          errors={fields.workNumber.errors}
        />
        <TextInput
          labelProps={{ children: "Mobile Number" }}
          inputProps={{
            ...conform.input(fields.mobileNumber, {}),
          }}
          errors={fields.mobileNumber.errors}
        />
        <DatePicker
          disableFutureDate={true}
          labelProps={{ children: "Date of Birth" }}
          inputProps={{
            ...conform.input(fields.dateOfBirth, {}),
          }}
          errors={fields.dateOfBirth.errors}
        />
      </div>
    </Form>
  );
};

export default PersonalStep;
