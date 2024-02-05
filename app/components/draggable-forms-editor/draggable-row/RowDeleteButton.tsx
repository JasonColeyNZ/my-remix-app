import { useContext } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md/index.js";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import { DraggableFormContext } from "../store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "../store/draggableFormReducer.ts";

const RowDeleteButton = () => {
  const { dispatch } = useContext(DraggableFormContext);
  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    //console.log("delete");
    dispatch({
      type: DraggableFormStateTypes.deleteSelectedControl,
      payload: {},
    });
  };
  return (
    <Tooltip delayDuration={1000}>
      <TooltipContent className="z-20">Remove Row</TooltipContent>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "absolute z-20 text-destructive",
            "top-[-4px] right-[-4px] w-[24px] h-[24px]",
            "border-none rounded-sm bg-white shadow-md",
            "cursor-pointer flex items-center justify-center",
          )}
          onClick={handleDelete}
        >
          <MdOutlineDeleteOutline />
        </div>
      </TooltipTrigger>
    </Tooltip>
  );
};
export default RowDeleteButton;
