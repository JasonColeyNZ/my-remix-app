import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { Droppable } from "react-beautiful-dnd";
import { cn } from "~/utils/shadcn.utils.ts";

const PlaceHolder = () => {
  return (
    <Droppable droppableId={"placeholder"}>
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          className={cn(
            "m-[10px] mx-2 border-2 border-dashed",
            "border-gray-300 rounded-md p-[25px] text-center",
            "text-2xl font-bold text-gray-300",
            // show && "p-[10px]",
            snapshot.isDraggingOver && "bg-green-200",
          )}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          Dropzone
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default PlaceHolder;
