import { cn } from "~/utils/shadcn.utils";
import { useContext, useEffect } from "react";
import { AppContext } from "~/store/appContext";
import { QuestionStateTypes } from "~/store/questionReducer";
import { Button } from "../ui/button";
import OptionEditor from "./options/components/OptionEditor";
import { ControlType } from "../draggable-forms-editor/types";
import TooltipWrapper from "../ui/TooltipWrapper";
import type { StepProps } from "./EditorQuestion";
import QuestionType from "./components/QuestionType";
import RadioCheckDroppable from "./options/components/RadioCheckDroppable";
import TextItem from "./options/components/TextItem";

const StepOptions = ({ visible, setNextEnabled }: StepProps) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (visible) {
      let nextEnabled = false;
      if (
        state.questionState.fieldDefinition.controlType === ControlType.RADIO ||
        state.questionState.fieldDefinition.controlType === ControlType.CHECKBOX
      ) {
        nextEnabled = state.questionState.fieldDefinition.options
          ? state.questionState.fieldDefinition.options.length > 0
          : false;
      } else {
        nextEnabled = true;
      }

      setNextEnabled && setNextEnabled(nextEnabled);
    }
  }, [
    setNextEnabled,
    state.questionState.fieldDefinition.controlType,
    state.questionState.fieldDefinition.options,
    visible,
  ]);

  const handleAddClick = () => {
    //get next value
    const nextValue =
      state.questionState.fieldDefinition.options &&
      state.questionState.fieldDefinition.options.length > 0
        ? Math.max(
            ...state.questionState.fieldDefinition.options.map((option) =>
              parseInt(option.value.toString()),
            ),
          ) * 2
        : 1;

    dispatch({
      type: QuestionStateTypes.addOption,
      payload: {
        addOption: {
          text: "New",
          value: nextValue,
          textBox: "",
          sortOrder: state.questionState.fieldDefinition.options
            ? state.questionState.fieldDefinition.options.length
            : 0,
        },
      },
    });
  };

  const handleClearClick = () => {
    // setClearSelected(true);
    dispatch({
      type: QuestionStateTypes.addOptions,
      payload: {
        addOptions: [],
      },
    });
  };

  return (
    <div className={cn(visible ? "flex flex-col flex-1 " : "hidden", "gap-2")}>
      <div className="flex flex-row">
        <div className="flex flex-row items-baseline w-96">
          <QuestionType />
        </div>
        <div className="flex ml-auto gap-2">
          <TooltipWrapper tooltip="Add a new option to the list">
            <Button size="sm" onClick={handleAddClick}>
              Add Option
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Remove all options">
            <Button size="sm" variant="outline" onClick={handleClearClick}>
              Clear Options
            </Button>
          </TooltipWrapper>
        </div>
      </div>
      <div className="flex flex-col p-2 rounded-sm border-[1px] border-slate-200 max-h-72 overflow-hidden">
        <div className="font-medium">
          <div>{state.questionState.fieldDefinition.label}</div>
          <div className="text-xs font-light pl-2">
            {state.questionState.fieldDefinition.description}
          </div>
        </div>
        {(state.questionState.fieldDefinition.controlType ===
          ControlType.RADIO ||
          state.questionState.fieldDefinition.controlType ===
            ControlType.CHECKBOX) && <RadioCheckDroppable />}
        {state.questionState.fieldDefinition.controlType ===
          ControlType.NULL && <TextItem />}
      </div>
      {(state.questionState.fieldDefinition.controlType === ControlType.RADIO ||
        state.questionState.fieldDefinition.controlType ===
          ControlType.CHECKBOX) && (
        <div className="flex mt-auto w-full">
          <OptionEditor />
        </div>
      )}
    </div>
  );
};

export default StepOptions;
