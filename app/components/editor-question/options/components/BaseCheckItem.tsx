import type { CheckedState } from "@radix-ui/react-checkbox";
import { useContext } from "react";
import type { DraggableProvided } from "react-beautiful-dnd";
import DragHandle from "~/components/draggable-forms-editor/draggable-field/DragHandle";
import type { FieldOptionType } from "~/components/draggable-forms-editor/types";
import { Checkbox } from "~/components/ui/checkbox";
import { Label } from "~/components/ui/label";
import { AppContext } from "~/store/appContext";
import { QuestionStateTypes } from "~/store/questionReducer";
import { cn } from "~/utils/shadcn.utils";

interface OptionItemProperties {
  option: FieldOptionType;
  draggableProvided: DraggableProvided | null;
}

const BaseCheckItem = ({ option, draggableProvided }: OptionItemProperties) => {
  const { dispatch } = useContext(AppContext);

  const handleListItemClick = (value: number) => {
    if (!draggableProvided) return;
    dispatch({
      type: QuestionStateTypes.editFieldOptionIndex,
      payload: { editFieldOptionIndex: option.sortOrder },
    });
  };

  const handleCheckChange = (value: CheckedState, option: FieldOptionType) => {
    // console.log("handleCheckChange", value, option);
    if (value === "indeterminate") return;
    option.checked = value;
    dispatch({
      type: QuestionStateTypes.checkBoxChange,
      payload: { option: option },
    });
  };

  return (
    <div
      className={cn(
        "flex flex-row py-1 pr-2 pl-0 overflow-y-auto mt-px select-none items-center",
      )}
      onClick={() => handleListItemClick(option.sortOrder)}
    >
      {draggableProvided && (
        <DragHandle draggableProvided={draggableProvided} />
      )}
      <div className="flex w-6 items-center select-none">
        <Checkbox
          value={option.value.toString()}
          checked={option.checked}
          id={option.text}
          onCheckedChange={(value) => handleCheckChange(value, option)}
        />
      </div>
      <Label htmlFor={option.text} className="py-1 select-none">
        {option.text}
        {option.textBox && (
          <span className="ml-2 text-xs font-normal text-gray-800">
            {option.textBox}
          </span>
        )}
      </Label>
    </div>
  );
};

export default BaseCheckItem;
