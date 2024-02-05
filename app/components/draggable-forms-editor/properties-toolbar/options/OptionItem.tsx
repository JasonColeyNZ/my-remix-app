import { useContext } from "react";
import { MdModeEdit } from "react-icons/md/index.js";
import { Button } from "~/components/ui/button.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import { DraggableFormContext } from "../../store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "../../store/draggableFormReducer.ts";
import type { FieldOptionType } from "../../types.ts";
import OptionEditor from "./OptionEditor.tsx";

interface OptionItemProperties {
  index: number;
  option: FieldOptionType;
  selectedIndex?: number;
  setSelectedIndex?: any;
}

const OptionItem = ({
  index,
  option,
  selectedIndex,
  setSelectedIndex,
}: OptionItemProperties) => {
  //console.log("OptionItem, option: ", option);
  const { state, dispatch } = useContext(DraggableFormContext);

  const handleListItemClick = (value: number | string) => {
    setSelectedIndex(value);
    dispatch({
      type: DraggableFormStateTypes.editFieldOptionIndex,
      payload: { editFieldOptionIndex: null },
    });
  };
  // console.log("editFieldOptionIndex: ", state.formState.editFieldOptionIndex);
  return (
    <>
      <div
        className={cn(
          "flex flex-row p-0 overflow-y-auto rounded-sm mt-px",
          selectedIndex && selectedIndex === option.value
            ? "bg-gray-300"
            : "bg-gray-100",
        )}
        onClick={() => handleListItemClick(option.value)}
      >
        <div className="text-xs p-1">{option.text}</div>
        {state.formState.editMode && (
          <Button
            className="ml-auto h-5 p-1 mr-[2px] hover:bg-primary-10 hover:text-white self-center"
            variant="ghost"
            onClick={(event) => {
              event.stopPropagation();
              // console.log("editFieldOptionIndex: ", index);
              dispatch({
                type: DraggableFormStateTypes.editFieldOptionIndex,
                payload: { editFieldOptionIndex: index },
              });
              setSelectedIndex && setSelectedIndex(index);
            }}
          >
            <MdModeEdit />
          </Button>
        )}
      </div>
      {state.formState.editMode &&
        state.formState.editFieldOptionIndex !== null &&
        index === state.formState.editFieldOptionIndex && (
          <OptionEditor index={index} option={option} />
        )}
    </>
  );
};
export default OptionItem;
