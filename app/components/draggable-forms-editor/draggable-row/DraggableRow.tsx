// import type { Fieldset } from "@conform-to/react";
import { useContext } from "react";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { cn } from "~/utils/shadcn.utils.ts";

import DraggableField from "../draggable-field/DraggableField.tsx";
import { DraggableFormContext } from "../store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "../store/draggableFormReducer.ts";
import type { FormFieldDefinition } from "../types.ts";
import DragHandle from "./DragHandle.tsx";
import RowDeleteButton from "./RowDeleteButton.tsx";
import RowPlaceHolder from "./RowPlaceHolder.tsx";

interface DraggableRowProps {
  id: string;
  sortOrder: number;
  controls: FormFieldDefinition[];
  // fields: Fieldset<{
  //   [x: string]: any;
  // }>;
  // formRef: any;
}

const DraggableRowOuter = ({
  id,
  sortOrder,
  controls, // fields,
  // formRef,
}: DraggableRowProps) => {
  //console.log("DraggableRowOuter: ", id, sortOrder, controls);
  const { state, dispatch } = useContext(DraggableFormContext);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch({
      type: DraggableFormStateTypes.selectedRowId,
      payload: {
        selectedRowId: id,
      },
    });
  };
  return (
    <Draggable draggableId={`draggable-row-${id}`} index={sortOrder} key={id}>
      {(draggableProvided, snapshot) => (
        <div
          className={cn(
            "flex w-full mt-[10px] pr-1 border-[1px] border-solid border-gray-200 rounded-[5px]",
            state.formState.selectedRowId === id &&
              "bg-[#beffc288] border-[#beffc2]",
            snapshot.isDragging && "shadow-md bg-white",
          )}
          id={`draggable-row-${id}`}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          // sx={[
          //   {
          //     display: "flex",
          //     width: "100%",
          //     marginTop: "10px",
          //   },
          //   state.formState.selectedRowId === id && {
          //     backgroundColor: "#beffc288",
          //   },
          //   snapshot.isDragging && {
          //     boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
          //   },
          // ]}
          onClick={handleClick}
        >
          <DragHandle draggableProvided={draggableProvided} />
          <div className="flex flex-1 w-full relative pt-0 pb-0 pl-0">
            <DroppableRowInner
              id={id}
              sortOrder={sortOrder}
              controls={controls}
              // fields={fields}
              // formRef={formRef}
            />
            {state.formState.selectedRowId === id && <RowDeleteButton />}
          </div>
        </div>
      )}
    </Draggable>
  );
};

const DroppableRowInner = ({
  id,
  sortOrder,
  controls,
} // fields,
// formRef,
: DraggableRowProps) => {
  // const columnCount = (snapshot: DroppableStateSnapshot) => {
  //   //console.log("snapshot: ", snapshot);

  //   const columns =
  //     snapshot.isDraggingOver && !snapshot.draggingFromThisWith
  //       ? (10 / controls.length) * (controls.length + 1)
  //       : 10;

  //   //console.log("columnCount: ", columns);
  //   return columns;
  // };

  return (
    <Droppable droppableId={`droppable-row-${id}`} direction="horizontal">
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div
          className={cn(
            "flex flex-auto flex-row flex-wrap items-start",
            // "min-h-[50px]",
            "!pr-0",
            "mt-0 ml-[-32px] pl-[32px] ",
            snapshot.isDraggingOver && "bg-[#eafceb88] ",
          )}
          ref={provided.innerRef}
          {...provided.droppableProps}
          // sx={[
          //   {
          //     marginTop: 0,
          //     marginLeft: "-32px",
          //     paddingLeft: "32px",
          //   },
          //   snapshot.isDraggingOver && {
          //     backgroundColor: "#beffc288",
          //   },
          // ]}
        >
          {controls.map((control) => (
            <DraggableField
              controls={controls}
              key={control.field.id}
              formField={control}
              snapshot={snapshot}
              // fields={fields}
              // formRef={formRef}
              shouldAllowTrimming={true}
            />
          ))}
          <RowPlaceHolder provided={provided} snapshot={snapshot} />
          {/* {provided.placeholder} */}
        </div>
      )}
    </Droppable>
  );
};
export default DraggableRowOuter;
