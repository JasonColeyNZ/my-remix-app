import { useContext } from "react";
import type { DraggableProvided } from "react-beautiful-dnd";
import DragHandle from "~/components/draggable-forms-editor/draggable-field/DragHandle";
import type { FieldOptionType } from "~/components/draggable-forms-editor/types";
import { Label } from "~/components/ui/label";
import { RadioGroupItem } from "~/components/ui/radio-group";
import { Textarea } from "~/components/ui/textarea";
import { AppContext } from "~/store/appContext";
import { QuestionStateTypes } from "~/store/questionReducer";
import { cn } from "~/utils/shadcn.utils";

interface OptionItemProperties {
  option: FieldOptionType;
  draggableProvided: DraggableProvided | null;
}

const BaseRadioItem = ({ option, draggableProvided }: OptionItemProperties) => {
  const { dispatch } = useContext(AppContext);

  const handleListItemClick = (value: number) => {
    if (!draggableProvided) return;
    dispatch({
      type: QuestionStateTypes.editFieldOptionIndex,
      payload: { editFieldOptionIndex: option.sortOrder },
    });
  };

  return (
    <>
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
          <RadioGroupItem value={option.value.toString()} id={option.text} />
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
      {option.textBox && (
        <div
          className="flex flex-row ml-14 pb-1 overflow-y-auto select-none items-baseline"
          onClick={() => handleListItemClick(option.sortOrder)}
        >
          <Textarea
            id={option.text}
            disabled={true}
            className="w-full mx-1 py-0.5 bg-white pointer-events-none cursor-pointer"
            placeholder="Enter text"
          />
        </div>
      )}
    </>
  );
};

export default BaseRadioItem;
