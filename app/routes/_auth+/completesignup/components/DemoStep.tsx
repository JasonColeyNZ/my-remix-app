import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { Form, useSubmit } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { Label } from "~/components/ui/label.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import {
  // CompleteSignupStepIntent,
  demoStepSchema,
} from "../completeSignupSchema.ts";
// import { type action } from "../route.tsx";
import SwitchField from "~/components/form-controls/switch/Switch.tsx";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

interface DemoStepProps {
  demo: any;
  visible: boolean;
  nextClick: boolean;
  setNextClick: React.Dispatch<React.SetStateAction<boolean>>;
  nextStep: () => void;
}

const DemoStep = ({
  demo,
  visible,
  nextClick,
  setNextClick,
  nextStep,
}: DemoStepProps) => {
  // console.log("company", company);
  // const actionData = useActionData<typeof action>();
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
    id: "demo-step-form",
    // ref: formRef,
    defaultValue: demo,
    constraint: getZodConstraint(demoStepSchema),
    // lastResult:
    //   actionData?.submission &&
    //   actionData?.submission.payload.intent === CompleteSignupStepIntent.DEMO
    //     ? actionData?.submission
    //     : undefined,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: demoStepSchema });
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
        <div className="grid w-full items-center gap-1">
          <Label>Install Demonstration Data?</Label>
          <Label className="pl-2 text-xs font-light">
            Another location will be created with demonstration data inserted
            allowing you to see how the system works.
          </Label>
        </div>
        <div className="grid w-full items-center gap-1">
          <div className="p-4 mx-auto flex space-x-2">
            <SwitchField
              labelProps={{ children: "Install Demo Data" }}
              inputProps={{
                ...getInputProps(fields.installDemo, { type: "checkbox" }),
              }}
              errors={fields.installDemo.errors}
              hideError={false}
            />
            {/* <Label htmlFor="airplane-mode">Install Demonstration Data</Label> */}
          </div>
          <Label className="text-xs font-light text-center">
            The demo data can be removed by going to
            <br />
            Settings | Company | Demo Data
          </Label>
        </div>
      </div>
    </Form>
  );
};

export default DemoStep;
