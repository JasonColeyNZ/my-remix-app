import type { DraggableProvided } from "react-beautiful-dnd";
import { MdDragIndicator } from "react-icons/md/index.js";

interface DragHandleProps {
  draggableProvided: DraggableProvided;
}

const DragHandle = ({ draggableProvided }: DragHandleProps) => {
  return (
    <span
      className="z-10 relative left-0 ml-0 my-auto cursor-grab w-8 h-8 flex justify-center items-center"
      id="drag-handle"
      // sx={{
      //   justifyContent: "center",
      //   alignItems: "center",
      // }}
      {...draggableProvided.dragHandleProps}
    >
      <MdDragIndicator />
    </span>
  );
};

export default DragHandle;
