import { useNavigate } from "@remix-run/react";
import React from "react";
import { Button } from "~/components/ui/button.tsx";
import type { StepConfig } from "~/components/ui/stepper.tsx";

type NavigationButtonsProps = {
  activeStep: number;
  steps: StepConfig[];
  nextStep: () => void;
  prevStep: () => void;
  resetSteps: () => void;
  setStep: (step: number) => void;
  isDisabledStep: boolean;
  isLastStep: boolean;
  isOptionalStep: boolean | undefined;
  nextClick: boolean;
  setNextClick: (nextClick: boolean) => void;
};

const NavigationButtons = ({
  activeStep,
  steps,
  resetSteps,
  isDisabledStep,
  prevStep,
  nextClick,
  setNextClick,
  isOptionalStep,
  isLastStep,
}: NavigationButtonsProps) => {
  const navigate = useNavigate();

  const handleNextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isLastStep) {
      navigate("/dashboard");
      return;
    }

    console.log("next click", nextClick);
    setNextClick(!nextClick);
    //check form for errors

    //if no errors, submit form
    //if errors, show errors

    // nextStep();
  };
  return (
    <div className="flex w-full justify-end gap-2 ml-auto">
      <Button
        className="mr-auto"
        variant="outline"
        onClick={() => navigate("/")}
      >
        Close
      </Button>

      {activeStep === steps.length ? (
        <>
          {/* <h2>All steps completed!</h2> */}
          <Button onClick={() => navigate("/dashboard")}>
            Proceed to Dashboard
          </Button>
        </>
      ) : (
        <>
          <Button disabled={isDisabledStep} onClick={prevStep}>
            Prev
          </Button>
          <Button disabled={nextClick} onClick={handleNextStep}>
            {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
          </Button>
        </>
      )}
    </div>
  );
};

export default NavigationButtons;
