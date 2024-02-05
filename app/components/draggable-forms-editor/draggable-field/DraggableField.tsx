// import type { Fieldset } from "@conform-to/react";
import { type BoxModel, type Position, getBox } from "css-box-model";
import { useCallback, useContext, useEffect, useRef } from "react";
import type {
  BeforeCapture,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";
import { cn } from "~/utils/shadcn.utils.ts";

import GetControl from "../GetControl.tsx";
import { getColSpan } from "../formUtils.ts";
import { DraggableFormContext } from "../store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "../store/draggableFormReducer.ts";
import type { FormFieldDefinition } from "../types.ts";
import { FieldParentType } from "../types.ts";
import DragHandle from "./DragHandle.tsx";
import FieldSelectionBox from "./FieldSelectionBox.tsx";
import bindEvents from "./bind-event.ts";

interface DraggableFieldProps {
  controls: FormFieldDefinition[];
  formField: FormFieldDefinition;
  parent?: FieldParentType;
  snapshot: DroppableStateSnapshot;
  // fields: Fieldset<{
  //   [x: string]: any;
  // }>;
  // formRef: any;
  shouldAllowTrimming?: boolean;
}

const DraggableField = ({
  // fields,
  controls,
  formField,
  parent = FieldParentType.ROW,
  snapshot: rowDroppableSnapshot,
  // formRef,
  shouldAllowTrimming,
}: DraggableFieldProps) => {
  const { state, dispatch } = useContext(DraggableFormContext);
  const ref = useRef<HTMLElement | null>(null);

  // console.log("formField: ", formField);

  const handleFieldClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (parent === FieldParentType.ROW || parent === FieldParentType.TOOLBOX) {
      dispatch({
        type: DraggableFormStateTypes.selectedControl,
        payload: {
          selectedControl: formField,
        },
      });
    }
  };

  // useEffect(() => {}, []);
  const useTrimming: boolean = true;

  function isCustomEvent(event: Event): event is CustomEvent {
    return "detail" in event;
  }

  const unsubscribe = useCallback(() => {
    const handleBeforeCapture = (event: Event) => {
      //typeGuard https://stackoverflow.com/questions/47166369/argument-of-type-e-customevent-void-is-not-assignable-to-parameter-of-ty
      if (!isCustomEvent(event)) throw new Error("not a custom event");

      if (!useTrimming) {
        return;
      }
      if (!shouldAllowTrimming) {
        return;
      }

      const before: BeforeCapture = event.detail.before;
      const clientSelection: Position = event.detail.clientSelection;

      if (before.mode !== "FLUID") {
        return;
      }

      if (before.draggableId !== formField.field.id) {
        return;
      }

      const el: HTMLElement | null = ref.current;

      if (!el) {
        return;
      }
      const box: BoxModel = getBox(el);

      // want to shrink the item to 200px wide.
      // want it to be centred as much as possible to the cursor
      const targetWidth: number = 350;
      // const targetHeight: number = 80;
      const halfWidth: number = targetWidth / 2;
      // const halfHeight: number = targetHeight / 2;
      const distanceToLeft: number = Math.max(
        clientSelection.x - box.borderBox.left,
        0,
      );

      // const distanceToTop: number = Math.max(
      //   clientSelection.y - box.borderBox.top,
      //   0,
      // );

      // el.style.setProperty("width", `${targetWidth}px`, "important");
      // // el.style.setProperty("height", `60px`, "important");

      const oldHeight = el.offsetHeight;
      let maxHeight = 9;
      if (oldHeight >= 240) maxHeight = 60;
      else if (oldHeight >= 224) maxHeight = 56;
      else if (oldHeight >= 208) maxHeight = 52;
      else if (oldHeight >= 192) maxHeight = 48;
      else if (oldHeight >= 176) maxHeight = 44;
      else if (oldHeight >= 160) maxHeight = 40;
      else if (oldHeight >= 144) maxHeight = 36;
      else if (oldHeight >= 128) maxHeight = 32;
      else if (oldHeight >= 112) maxHeight = 28;
      else if (oldHeight >= 96) maxHeight = 24;
      else if (oldHeight >= 80) maxHeight = 20;
      else if (oldHeight >= 63) maxHeight = 16;
      else if (oldHeight >= 55) maxHeight = 14;
      else if (oldHeight >= 47) maxHeight = 12;
      else if (oldHeight >= 43) maxHeight = 11;
      else if (oldHeight >= 39) maxHeight = 10;
      else if (oldHeight >= 35) maxHeight = 9;
      else if (oldHeight >= 31) maxHeight = 8;

      console.log("oldHeight: ", oldHeight, "maxHeight: ", maxHeight);

      el.className = el.className
        .replace(/flex-\d+/, "flex-30") //30% of row
        .replace("h-full", `max-h-${maxHeight}`)
        .trim();

      // el.style.setProperty("max-height", `${oldHeight}px`, "important");
      // console.log("el.style.height", el.style.maxHeight);

      // Nothing left to do
      if (distanceToLeft > halfWidth) {
        // what the new left will be
        const proposedLeftOffset: number = distanceToLeft - halfWidth;
        // what the raw right value would be
        const targetRight: number =
          box.borderBox.left + proposedLeftOffset + targetWidth;

        // how much we would be going past the right value
        const rightOverlap: number = Math.max(
          targetRight - box.borderBox.right,
          0,
        );
        // need to ensure that we don't pull the element past
        // it's resting right position
        const leftOffset: number = proposedLeftOffset - rightOverlap;
        el.style.position = "relative";
        el.style.left = `${leftOffset}px`;
      }

      // if (distanceToTop > halfHeight) {
      //   // what the new top will be
      //   const proposedTopOffset: number = distanceToTop - halfHeight;
      //   // what the raw right value would be
      //   const targetBottom: number =
      //     box.borderBox.top + proposedTopOffset + targetHeight;

      //   // how much we would be going past the right value
      //   const bottomOverlap: number = Math.max(
      //     targetBottom - box.borderBox.bottom,
      //     0,
      //   );
      //   // need to ensure that we don't pull the element past
      //   // it's resting bottom position
      //   const topOffset: number = proposedTopOffset - bottomOverlap + 80;
      //   el.style.position = "relative";
      //   el.style.top = `${topOffset}px`;
      //   console.log("adjust top", topOffset);
      // }
    };

    return bindEvents(window, [
      {
        eventName: "onBeforeCapture",
        fn: handleBeforeCapture,
        options: { passive: true },
      },
    ]);
  }, [formField.field.id, shouldAllowTrimming, useTrimming]);

  // console.log("formField: ", formField);
  useEffect(() => {
    unsubscribe();
  }, [unsubscribe]);

  return (
    <Draggable
      key={formField.field.id}
      draggableId={formField.field.id}
      index={formField.sortOrder}
      disableInteractiveElementBlocking={true}
    >
      {(provided, snapshot) => (
        <div
          id={`draggable-formField-outer-${formField.field.id}`}
          // shouldallowtrimming={
          //   shouldAllowTrimming ? shouldAllowTrimming.toString() : "false"
          // }
          {...provided.draggableProps}
          ref={(node: HTMLElement | null) => {
            provided.innerRef(node);
            ref.current = node;
          }}
          // ref={provided.innerRef}
          // {...provided.dragHandleProps}
          className={cn(
            "flex relative h-full overflow-x-clip overflow-y-clip !pt-0 !pb-0 !pl-0",
            snapshot.isDragging &&
              "bg-white border-[1px] whitespace-nowrap border-solid border-gray-200 rounded-[5px]",
            !snapshot.isDragging && parent !== FieldParentType.TOOLBOX
              ? getColSpan(
                  controls,
                  formField,
                  null,
                  false,
                  rowDroppableSnapshot.isDraggingOver,
                )
              : "w-full",
          )}
          // style={{ flex: getColSpan(controls, formField) }}
          onClick={handleFieldClick}
        >
          <DragHandle draggableProvided={provided} />
          {/* Green selection box */}
          {state.formState.selectedControl?.id === formField.field.id && (
            <div className={cn("absolute w-full h-full flex")}>
              <FieldSelectionBox parent={parent} />
            </div>
          )}
          <div
            className={cn(
              "relative flex flex-start overflow-x-clip !pt-[4px] flex-auto",
              "[&_>div]:mt-0 [&_>div]:mr-0 [&_>div]:pl-0 [&_>div]:pr-[5px]",
              snapshot.isDragging ||
                (rowDroppableSnapshot.isDraggingOver && "self-center"),
            )}
          >
            {GetControl(
              // fields,
              parent,
              formField.field,
              false,
              false,
              // formRef,
              "",
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default DraggableField;
