// import type { Fieldset } from "@conform-to/react";
import { useContext, useEffect } from "react";
import { Droppable } from "react-beautiful-dnd";

import DraggableField from "../draggable-field/DraggableField.tsx";
import { DraggableFormStateTypes } from "../store/draggableFormReducer.ts";
import type { FormFieldDefinition } from "../types.ts";
import { AreaType, FieldParentType } from "../types.ts";
import AddFieldButton from "./AddFieldButton.tsx";
import AddQuestionButton from "./AddQuestionButton.tsx";
import { DraggableFormContext } from "../store/draggableFormContext.tsx";
import FormSectionHeader from "~/components/typography/FormSectionHeader.tsx";

interface ControlToolbarProps {
  // fields: Fieldset<{
  //   [x: string]: any;
  // }>;
  area: string;
  sectionFields: FormFieldDefinition[];
  customFields: FormFieldDefinition[];
}

const ControlToolbar = ({
  // fields,
  area,
  sectionFields,
  customFields,
}: ControlToolbarProps) => {
  const { state, dispatch } = useContext(DraggableFormContext);

  useEffect(() => {
    // if (state.formState.selectedControl?.field.area  .controlSource === "custom") {
    const fieldOnForm =
      state.formState.formDefinition?.rows?.find(
        (row) =>
          row.controls?.find(
            (control) => control.id === state.formState.selectedControl?.id,
          ),
      ) !== undefined;
    if (fieldOnForm) return;

    const field = customFields.find(
      (field) => field.id === state.formState.selectedControl?.id,
    );
    if (!field) {
      dispatch({
        type: DraggableFormStateTypes.clearSelections,
        payload: {},
      });
    }
    // }
  }, [
    customFields,
    dispatch,
    state.formState.formDefinition?.rows,
    state.formState.selectedControl?.id,
  ]);

  useEffect(() => {
    //if there is a selectedFieldId in state, then select it
    if (state.formState.selectedFieldId) {
      customFields.forEach((field) => {
        if (field.id === state.formState.selectedFieldId) {
          dispatch({
            type: DraggableFormStateTypes.selectedControl,
            payload: {
              selectedControl: field,
            },
          });
        }
      });
    }
  }, [customFields, dispatch, state.formState.selectedFieldId]);

  // console.log("customFields: ", customFields);

  return (
    <Droppable droppableId="control-toolbar" isDropDisabled={true}>
      {(provided, snapshot) => (
        <div className="f" ref={provided.innerRef} {...provided.droppableProps}>
          <FormSectionHeader
            title={`${area.replace(/([A-Z])/g, " $1").trim()} Fields`}
          />
          <div className="flex flex-col flex-wrap mr-1 mb-[15px]">
            {sectionFields.length > 0 &&
              sectionFields.map((field, index) => (
                <DraggableField
                  //fieldCount={sectionFields.length}
                  parent={FieldParentType.TOOLBOX}
                  key={field.id}
                  formField={field}
                  controls={[]}
                  snapshot={snapshot}
                  // fields={fields}
                  // formRef={undefined}
                />
              ))}
            {sectionFields.length === 0 && (
              <div className="flex flex-row flex-wrap text-xs mb-[6px] pt-[3px] text-center font-medium text-primary-6">
                {`All ${area
                  .replace(/([A-Z])/g, " $1")
                  .trim()} fields have been added to the form.`}
              </div>
            )}
          </div>
          {state.formState.selectedForm?.area ===
            AreaType.CLIENT_QUESTIONNAIRE && <AddQuestionButton />}

          {state.formState.selectedForm?.area !==
            AreaType.CLIENT_QUESTIONNAIRE && (
            <div className="flex">
              <FormSectionHeader
                title={"Custom Fields"}
                children={<AddFieldButton />}
              />
            </div>
          )}

          {customFields && (
            <>
              <div className="flex flex-col flex-wrap mr-1">
                {customFields.map((field, index) => (
                  <DraggableField
                    //fieldCount={sectionFields.length}
                    parent={FieldParentType.TOOLBOX}
                    key={field.id}
                    formField={field}
                    controls={[]}
                    snapshot={snapshot}
                  />
                ))}
              </div>
            </>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
export default ControlToolbar;
