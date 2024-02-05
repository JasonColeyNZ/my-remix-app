import { Button } from "~/components/ui/button.tsx";
import type { StepConfig } from "~/components/ui/stepper.tsx";
import TooltipWrapper from "../../ui/TooltipWrapper";
import { useFetcher } from "@remix-run/react";
import { serialize } from "object-to-formdata";
import { useContext, useEffect } from "react";
import { AppContext } from "~/store/appContext";
import { formEditorIntent } from "~/routes/dashboard.settings.records/forms/$formId/updateFormDefinitionSchema";
import { DraggableFormContext } from "../../draggable-forms-editor/store/draggableFormContext";
import {
  processFieldDefinition,
  processFormDefinition,
} from "../../draggable-forms-editor/formUtils";
import { FormStateTypes } from "~/store/formReducer";
import type { action } from "~/routes/dashboard.settings.records/forms/$formId/route";

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
  nextEnabled: boolean;
  // closeClick: () => void;
};

const NavigationButtons = ({
  activeStep,
  steps,
  resetSteps,
  isDisabledStep,
  prevStep,
  nextStep,
  nextEnabled,
  isOptionalStep,
  isLastStep, // closeClick,
}: NavigationButtonsProps) => {
  const { state, dispatch } = useContext(AppContext);
  const { state: draggableState } = useContext(DraggableFormContext);
  const fetcher = useFetcher<typeof action>();

  const handleFinish = (e: React.MouseEvent<HTMLButtonElement>) => {
    const data = {
      intent:
        state.questionState.fieldDefinition.id === ""
          ? formEditorIntent.ADDFIELD
          : formEditorIntent.UPDATEFIELD,
      addToForm: state.questionState.addToForm,
      area: draggableState.formState.selectedForm?.area,
      field: processFieldDefinition(state.questionState.fieldDefinition),
      id: draggableState.formState.selectedForm?.id,
      formDefinition: processFormDefinition(
        draggableState.formState.formDefinition,
      ),
    };

    if (!data.field || !data.formDefinition) {
      console.error("missing data", data);
      return;
    }

    //send field via fetcher
    fetcher.submit(serialize(data), {
      method: "POST",
    });
  };

  useEffect(() => {
    if (!fetcher.data) return;
    if (fetcher.data.status === "error") {
      console.error(fetcher);
    }
    if (fetcher.data.status === 200) {
      handleClose();
    }
    //do not put nextStep as a dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetcher.data]);

  const handleClose = () => {
    dispatch({
      type: FormStateTypes.showEditor,
      payload: {
        showEditor: null,
      },
    });
  };

  return (
    <div className="flex w-full justify-end gap-2 ml-auto">
      {activeStep === steps.length ? (
        <>
          <TooltipWrapper tooltip="Save Field to Form">
            <Button
              onClick={handleFinish}
              disabled={fetcher.state === "submitting"}
            >
              {state.questionState.fieldDefinition.id === ""
                ? "Add new Question"
                : "Update Question"}
            </Button>
          </TooltipWrapper>
        </>
      ) : (
        <>
          <TooltipWrapper tooltip="Go back to the previous step">
            <Button
              disabled={isDisabledStep || fetcher.state === "submitting"}
              onClick={prevStep}
            >
              Prev
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Go to the next step">
            <Button
              disabled={!nextEnabled || fetcher.state === "submitting"}
              onClick={() => nextStep()}
            >
              {isLastStep ? "Finish" : isOptionalStep ? "Skip" : "Next"}
            </Button>
          </TooltipWrapper>
        </>
      )}
      <TooltipWrapper tooltip="Close the builder and discard changes">
        <Button
          className=""
          variant="outline"
          disabled={fetcher.state === "submitting"}
          onClick={handleClose}
        >
          Cancel
        </Button>
      </TooltipWrapper>
    </div>
  );
};

export default NavigationButtons;
