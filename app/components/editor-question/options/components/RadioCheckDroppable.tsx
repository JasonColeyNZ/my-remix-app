import React, { useContext } from "react";
import type { DroppableProvided } from "react-beautiful-dnd";
import {
  DragDropContext,
  Droppable,
  useMouseSensor,
  useTouchSensor,
} from "react-beautiful-dnd";
import type { FieldOptionType } from "~/components/draggable-forms-editor/types";
import { ControlType } from "~/components/draggable-forms-editor/types";
import { RadioGroup } from "~/components/ui/radio-group";
import { AppContext } from "~/store/appContext";
import { QuestionStateTypes } from "~/store/questionReducer";
import RadioItem from "./RadioItem";
import CheckItem from "./CheckItem";

const RadioCheckDroppable = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleValueChange = (value: string) => {
    // console.log("value", value);
    dispatch({
      type: QuestionStateTypes.checkedOptionValue,
      payload: { checkedOptionValue: parseInt(value) },
    });
  };

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination || !state.questionState.fieldDefinition.options) {
      return;
    }

    //modify the sort order of the options
    const items = Array.from(
      state.questionState.fieldDefinition.options,
    ) as FieldOptionType[];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    //update the sortOrder property
    items.forEach((item, index) => {
      item.sortOrder = index;
    });

    dispatch({
      type: QuestionStateTypes.addOptions,
      payload: {
        // addOptions: items,
        addOptions: [...items],
      },
    });
  };

  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      enableDefaultSensors={false}
      sensors={[useMouseSensor, useTouchSensor]}
    >
      {state.questionState.fieldDefinition.options && (
        <Droppable
          droppableId="questionEditorCanvas"
          type="DraggableRowOuter"
          direction="vertical"
        >
          {(provided: DroppableProvided) => (
            <div
              className="overflow-auto"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {state.questionState.fieldDefinition.controlType ===
                ControlType.RADIO && (
                <RadioGroup
                  className="mt-2"
                  value={state.questionState.checkedOptionValue.toString()}
                  onValueChange={handleValueChange}
                >
                  {state.questionState.fieldDefinition.options &&
                    state.questionState.fieldDefinition.options.map(
                      (option: FieldOptionType) => (
                        <RadioItem key={option.value} option={option} />
                      ),
                    )}
                </RadioGroup>
              )}
              {state.questionState.fieldDefinition.controlType ===
                ControlType.CHECKBOX && (
                <div className="mt-2">
                  {state.questionState.fieldDefinition.options &&
                    state.questionState.fieldDefinition.options.map(
                      (option: FieldOptionType) => (
                        <CheckItem key={option.value} option={option} />
                      ),
                    )}
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
};

export default RadioCheckDroppable;
