import { useContext } from "react";
import { cn } from "~/utils/shadcn.utils.ts";
import type { FieldOptionType } from "../../../draggable-forms-editor/types";
import { AppContext } from "~/store/appContext";
import { Draggable } from "react-beautiful-dnd";
import BaseRadioItem from "./BaseRadioItem";

interface OptionItemProperties {
  option: FieldOptionType;
}

const RadioItem = ({ option }: OptionItemProperties) => {
  const { state } = useContext(AppContext);

  return (
    <Draggable
      draggableId={`draggable-option-${option.value}`}
      index={option.sortOrder}
      key={option.value}
    >
      {(draggableProvided, snapshot) => (
        <div
          className={cn(
            "flex flex-col rounded-sm p-1 cursor-pointer",
            state.questionState.editFieldOptionIndex === option.sortOrder
              ? "bg-primary-4"
              : "bg-gray-100",
          )}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          <BaseRadioItem
            option={option}
            draggableProvided={draggableProvided}
          />
        </div>
      )}
    </Draggable>
  );
};
export default RadioItem;
