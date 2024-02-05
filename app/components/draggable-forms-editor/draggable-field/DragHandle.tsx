import type { DraggableProvided } from "react-beautiful-dnd";
import { MdOutlineMoreVert } from "react-icons/md/index.js";
import { cn } from "~/utils/shadcn.utils.ts";

interface DragHandleProps {
  draggableProvided: DraggableProvided;
}

const DragHandle = ({ draggableProvided }: DragHandleProps) => {
  return (
    <div
      id="drag-handle"
      className={cn(
        "z-10 relative left-0 ml-0 my-auto cursor-grab " +
          "w-4 h-8 flex justify-center items-center",
      )}
      {...draggableProvided.dragHandleProps}
    >
      <MdOutlineMoreVert />
    </div>
  );
};

export default DragHandle;
