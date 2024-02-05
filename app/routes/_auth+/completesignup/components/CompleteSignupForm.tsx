import { useActionData, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { StepConfig } from "~/components/ui/stepper.tsx";
import { Step, Steps } from "~/components/ui/stepper.tsx";
import { useStepper } from "~/components/ui/use-stepper.ts";
import { cn } from "~/utils/shadcn.utils.ts";
import { UserOnboarding } from "~/utils/types.ts";

import type { action, loader } from "../route.tsx";
import CompanyStep from "./CompanyStep.tsx";
import LegalStep from "./LegalStep.tsx";
import NavigationButtons from "./NavigationButtons.tsx";
import PersonalStep from "./PersonalStep.tsx";
import Finished from "./Finished.tsx";
import RightPane from "~/layouts/page-layouts/RightPane.tsx";
import DemoStep from "./DemoStep.tsx";

export default function CompleteSignupForm() {
  const { user, company, demo, legal, onboardingStatus } =
    useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  const steps = [
    { label: "Personal" },
    { label: "Company" },
    { label: "Demo" },
    { label: "Legal" },
    { label: "Finished" },
  ] satisfies StepConfig[];

  const getStepIndex = () => {
    switch (onboardingStatus) {
      case UserOnboarding.NOT_STARTED:
        return 0;
      case UserOnboarding.PERSONAL_COMPLETED:
        return 1;
      case UserOnboarding.COMPANY_COMPLETED:
        return 2;
      case UserOnboarding.DEMO_COMPLETED:
        return 3;
      case UserOnboarding.LEGAL_COMPLETED:
        return 4;
      default:
        return 0;
    }
  };

  const {
    nextStep,
    prevStep,
    resetSteps,
    setStep,
    activeStep,
    isDisabledStep,
    isLastStep,
    isOptionalStep,
  } = useStepper({
    initialStep: getStepIndex(),
    steps,
  });
  const [nextClick, setNextClick] = useState<boolean>(false);

  useEffect(() => {
    // console.log("actionData", actionData);

    if (!actionData) return;
    if (actionData.status === "error") {
      setNextClick(false);
      console.error(actionData);
    }
    if (actionData.status === 200) {
      setNextClick(false);
      nextStep && nextStep();
    }
    //do not put nextStep as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData]);

  return (
    <RightPane>
      <div className="text-2xl font-normal text-foreground my-2">
        Complete Sign Up
      </div>
      <div className="flex text-base font-light text-secondary-foreground my-2 flex-wrap">
        Please sign-in to your account and start the adventure
      </div>
      <div className={cn("align-top flex flex-col flex-1")}>
        <div className="flex flex-col flex-1">
          <Steps
            orientation="vertical"
            activeStep={activeStep}
            className="align-top flex-none"
          >
            {steps.map((step, index) => (
              <Step isVertical={true} index={index} key={index} {...step}>
                <PersonalStep
                  user={user}
                  visible={step.label === "Personal"}
                  nextClick={nextClick}
                  setNextClick={setNextClick}
                  nextStep={nextStep}
                />
                <CompanyStep
                  company={company}
                  visible={step.label === "Company"}
                  nextClick={nextClick}
                  setNextClick={setNextClick}
                  nextStep={nextStep}
                />
                <DemoStep
                  demo={demo}
                  visible={step.label === "Demo"}
                  nextClick={nextClick}
                  setNextClick={setNextClick}
                  nextStep={nextStep}
                />
                <LegalStep
                  legal={legal}
                  visible={step.label === "Legal"}
                  nextClick={nextClick}
                  setNextClick={setNextClick}
                  nextStep={nextStep}
                />
                <Finished
                  visible={step.label === "Finished"}
                  nextClick={nextClick}
                  setNextClick={setNextClick}
                  nextStep={nextStep}
                />

                <div className="pt-2 notWide:hidden align-bottom">
                  <NavigationButtons
                    activeStep={activeStep}
                    steps={steps}
                    nextStep={nextStep}
                    prevStep={prevStep}
                    resetSteps={resetSteps}
                    setStep={setStep}
                    isDisabledStep={isDisabledStep}
                    isLastStep={isLastStep}
                    isOptionalStep={isOptionalStep}
                    nextClick={nextClick}
                    setNextClick={setNextClick}
                  />
                </div>
              </Step>
            ))}
          </Steps>
        </div>
      </div>

      <div className="hidden notWide:flex">
        <NavigationButtons
          activeStep={activeStep}
          steps={steps}
          nextStep={nextStep}
          prevStep={prevStep}
          resetSteps={resetSteps}
          setStep={setStep}
          isDisabledStep={isDisabledStep}
          isLastStep={isLastStep}
          isOptionalStep={isOptionalStep}
          nextClick={nextClick}
          setNextClick={setNextClick}
        />
      </div>
    </RightPane>
  );
}
