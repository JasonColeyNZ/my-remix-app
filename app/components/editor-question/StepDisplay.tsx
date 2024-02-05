import { useContext, useEffect, useMemo } from "react";
import { cn } from "~/utils/shadcn.utils";
import { AppContext } from "~/store/appContext";
import type { StepProps } from "./EditorQuestion";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { QuestionStateTypes } from "~/store/questionReducer";
import ComboBox from "../combobox/ComboBox";
import { FieldType } from "../draggable-forms-editor/types";
import ControlPreview from "./components/ControlPreview";

interface columnType {
  text: string;
  value: string;
}

const StepDisplay = ({ visible, setNextEnabled }: StepProps) => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (visible) {
      setNextEnabled && setNextEnabled(true);
    }
  }, [setNextEnabled, visible]);

  const columns = useMemo(() => {
    const optionCount =
      state.questionState.fieldDefinition.options?.length ?? 0;
    const columns: columnType[] = [];
    for (let i = 1; i <= optionCount; i++) {
      columns.push({ text: i.toString(), value: i.toString() });
    }
    return columns;
  }, [state.questionState.fieldDefinition.options?.length]);

  const handleOrientationChange = (value: string) => {
    dispatch({
      type: QuestionStateTypes.textAlign,
      payload: {
        textAlign: value,
      },
    });
  };

  const onColumnSelect = (value: string) => {
    dispatch({
      type: QuestionStateTypes.displayColumns,
      payload: {
        displayColumns: parseInt(value),
      },
    });
  };

  return (
    <div className={cn(visible ? "flex flex-col" : "hidden")}>
      <div className="flex p-4">
        <div className="flex flex-col flex-1">
          <div>Label Alignment</div>

          <RadioGroup
            className="pl-2"
            value={
              state.questionState.fieldDefinition.displayOptions?.textAlign
            }
            onValueChange={handleOrientationChange}
          >
            <div className="flex flex-row py-1 pr-2 pl-0 overflow-y-auto mt-px select-none items-center">
              <RadioGroupItem id="left" value="left"></RadioGroupItem>
              <Label htmlFor="left" className="pl-1 py-1 select-none">
                Label left of controls
              </Label>
            </div>
            <div className="flex flex-row py-1 pr-2 pl-0 overflow-y-auto mt-px select-none items-center">
              <RadioGroupItem id="top" value="top">
                Label above controls
              </RadioGroupItem>
              <Label htmlFor="top" className="pl-1 py-1 select-none">
                Label above controls
              </Label>
            </div>
          </RadioGroup>
        </div>
        {state.questionState.fieldDefinition.fieldType === FieldType.SELECT &&
          state.questionState.fieldDefinition.displayOptions?.textAlign ===
            "top" && (
            <div className="flex flex-col flex-1">
              <div>
                Number of Columns
                <span className="text-xs">- Label above only</span>
              </div>
              <ComboBox
                initialValue={
                  state.questionState.fieldDefinition.displayOptions
                    .displayColumns
                    ? state.questionState.fieldDefinition.displayOptions?.displayColumns.toString()
                    : "1"
                }
                options={columns}
                onSelect={onColumnSelect}
                tooltip="Select the number of columns for the options"
                // clearSelected={clearSelected}
                // setClearSelected={setClearSelected}
              />
            </div>
          )}
      </div>
      <ControlPreview />
    </div>
  );
};

export default StepDisplay;
