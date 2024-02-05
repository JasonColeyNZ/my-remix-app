import { cn } from "~/utils/shadcn.utils";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Step, type StepConfig, Steps } from "../ui/stepper";
import { useStepper } from "../ui/use-stepper";
import StepDisplay from "./StepDisplay";
import StepName from "./StepName";
import NavigationButtons from "./components/NavigationButtons";
import StepOptions from "./StepOptions";
import StepValidation from "./StepValidation";
import { useContext, useEffect, useState } from "react";
import StepFinish from "./StepFinish";
import { AppContext } from "~/store/appContext";
import { EditorTypeEnum } from "~/utils/types";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { FormStateTypes } from "~/store/formReducer";

export type StepProps = {
  setNextEnabled?: React.Dispatch<React.SetStateAction<boolean>>;
  visible: boolean;
};

const EditorQuestion = () => {
  const [nextEnabled, setNextEnabled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { state, dispatch } = useContext(AppContext);
  const steps = [
    { label: "Name" },
    { label: "Options" },
    { label: "Display" },
    { label: "Validation" },
  ] satisfies StepConfig[];

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
    initialStep: 0,
    steps,
  });

  useEffect(() => {
    resetSteps();
    // console.log("EditorQuestion", state.formState.showEditor);
    setOpen(state.formState.showEditor === EditorTypeEnum.QUESTION);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.formState.showEditor]);

  const handleClose = () => {
    setOpen(false);
    dispatch({
      type: FormStateTypes.showEditor,
      payload: {
        showEditor: null,
      },
    });
  };

  return (
    <DialogComponent
      isModal={true}
      close={handleClose}
      visible={open}
      open={(args) => {
        // args.preventFocus = true;
        // console.log("open", args);
      }}
      className={cn(
        "notWide:!w-[800px] border-0 shadow-none [&_.e-dlg-content]:p-0",
        "[&_.e-dlg-content]:bg-transparent [&_.e-dlg-content]:shadow-none",
        "[&_.e-dlg-content]:overflow-visible",
        // open && "block",
      )}
    >
      <Card
        className={cn(
          "flex flex-col w-full border-0 shadow-none " +
            " notWide:m-auto notWide:align-center notWide:shadow-md notWide:border wide:flex-1",
        )}
      >
        <CardHeader tabIndex={-1} className="flex-shrink text-xl font-medium">
          Question Builder
        </CardHeader>
        <CardContent tabIndex={-1} className={"grow flex flex-col flex-1"}>
          <div
            className={cn(
              "align-top flex flex-col flex-1 min-h-[520px] wide:min-h-[unset]",
            )}
          >
            <div className="flex flex-col flex-1">
              <Steps
                activeStep={activeStep}
                className="align-top flex-none mb-6"
                // onClickStep={(step) => setStep(step)}
              >
                {steps.map((step, index) => (
                  <Step
                    index={index}
                    key={index}
                    {...step}
                    // additionalClassName={{ label: "text-xs" }}
                  >
                    <StepName
                      setNextEnabled={setNextEnabled}
                      visible={step.label === "Name"}
                    />
                    <StepOptions
                      setNextEnabled={setNextEnabled}
                      visible={step.label === "Options"}
                    />
                    <StepDisplay
                      setNextEnabled={setNextEnabled}
                      visible={step.label === "Display"}
                    />
                    <StepValidation
                      setNextEnabled={setNextEnabled}
                      visible={step.label === "Validation"}
                    />
                    <StepFinish
                      setNextEnabled={setNextEnabled}
                      visible={activeStep === steps.length}
                    />
                  </Step>
                ))}
              </Steps>
              <StepFinish visible={activeStep === steps.length} />
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
                  nextEnabled={nextEnabled}
                />
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="hidden notWide:flex">
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
            nextEnabled={nextEnabled}
          />
        </CardFooter>
      </Card>
    </DialogComponent>
  );
};

export default EditorQuestion;
