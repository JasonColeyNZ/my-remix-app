import { animated, config, useTransition } from "@react-spring/web";
import { useEffect, useState } from "react";
import type {
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { cn } from "~/utils/shadcn.utils.ts";

interface PlaceHolderProps {
  snapshot: DroppableStateSnapshot;
  provided: DroppableProvided;
}

const RowPlaceHolder = ({ snapshot, provided }: PlaceHolderProps) => {
  const [minHeight, setMinHeight] = useState<number>(0);

  useEffect(() => {
    if (snapshot.isDraggingOver) {
      //get the element that is being dragged
      const draggable = document.querySelector(
        `[data-rbd-draggable-id="${snapshot.draggingOverWith}"]`,
      );
      if (!draggable) return;
      // console.log("draggable: ", draggable.offsetHeight);
      setMinHeight((draggable as HTMLElement).offsetHeight);
    } else {
      setMinHeight(0);
    }
  }, [snapshot.draggingOverWith, snapshot.isDraggingOver]);

  const transitions = useTransition(minHeight, {
    from: { minHeight: "0" },
    enter: { minHeight: minHeight + "px" },
    leave: { minHeight: "0" },
    config: config.slow,
  });

  // console.log("RowPlaceHolder: ", snapshot);
  return (
    <div ref={provided.innerRef} {...provided.droppableProps}>
      {transitions((styles, item) =>
        item ? (
          <animated.div
            className={cn(
              "!h-9",
              "[&_>div]:!h-9 [&_>div]:!w-[5px]",
              snapshot.isDraggingOver && `flex outline-1`,
              // !snapshot.isDraggingOver && "hidden",
            )}
            style={{ maxHeight: styles.minHeight, height: styles.minHeight }}
          ></animated.div>
        ) : null,
      )}
      {provided.placeholder}
    </div>
  );
};
export default RowPlaceHolder;
