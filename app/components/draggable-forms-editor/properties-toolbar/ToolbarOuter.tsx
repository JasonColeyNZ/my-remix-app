import { useContext } from "react";
import FormLabel from "~/components/typography/FormLabel.tsx";
import FormLeftLabel from "~/components/typography/FormLeftLabel.tsx";
import FormSectionHeader from "~/components/typography/FormSectionHeader.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import { DraggableFormContext } from "../store/draggableFormContext.tsx";
import { FieldType } from "../types.ts";
import DeleteFieldButton from "./DeleteFieldButton.tsx";
import EditFieldButton from "./EditFieldButton.tsx";
import FormInput from "./controls/FormInput.tsx";
import FormSelect from "./controls/FormSelect.tsx";
import {
  datetimeSubTypeOptions,
  selectSubTypeOptions,
} from "./controls/select-constants.ts";
import DisplayOptions from "./display/DisplayOptions.tsx";
import Options from "./options/Options.tsx";
import Validation from "./validation/Validation.tsx";
import { camelCaseToWords, isUUid } from "~/utils/strings.tsx";

const PropertiesToolbarOuter = () => {
  const { state } = useContext(DraggableFormContext);
  //if (state.formState.selectedControl) state.formState.selectedControl.action = 'edit-field';

  return (
    <div
      id="toolbar-outer"
      className={cn(
        "flex flex-col h-full flex-[0_0_220px] xl:flex-[0_0_300px] p-2 ",
        "z-10 overflow-y-hidden overflow-x-hidden",
      )}
    >
      <div className="flex flex-col flex-1 py-2 px-[10px] bg-white rounded-md shadow-card">
        <div className="relative w-full">
          <FormSectionHeader
            title={"Control Properties"}
            children={<EditFieldButton />}
          />
        </div>
        <div className="flex flex-col flex-auto overflow-hidden">
          {!state.formState.selectedControl && (
            <div className="pt-3 text-center text-[12px] font-light select-none text-[rgba(0,0,0,0.5)]">
              Please select a control to
              <br />
              see its properties.
            </div>
          )}
          {state.formState.selectedControl && (
            <div className="flex flex-col h-full overflow-y-auto">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full h-[20px] items-center">
                  {/* alignItems="center" */}
                  <FormLeftLabel label="Type" />
                  <FormLabel
                    text={
                      isUUid(state.formState.selectedControl?.field.id)
                        ? state.formState.selectedControl?.field.fieldType
                        : camelCaseToWords(
                            state.formState.selectedControl?.field.id,
                          )
                    }
                  />
                </div>
              </div>

              {state.formState.selectedControl?.field.fieldType ===
                FieldType.SELECT && (
                <FormSelect
                  label="Sub Type"
                  id="field.controlType"
                  value={state.formState.selectedControl.field.fieldType + ""}
                  options={selectSubTypeOptions}
                />
              )}
              {state.formState.selectedControl?.field.fieldType ===
                FieldType.DATETIME && (
                <FormSelect
                  label="Sub Type"
                  id="field.controlType"
                  value={state.formState.selectedControl.field.controlType + ""}
                  options={datetimeSubTypeOptions}
                />
              )}
              {state.formState.selectedControl?.field.fieldType !==
                FieldType.HEADER &&
                state.formState.selectedControl?.field.fieldType !==
                  FieldType.PARAGRAPH &&
                state.formState.selectedControl?.field.fieldType !==
                  FieldType.RICHTEXT && (
                  <FormInput
                    id={"field.label"}
                    label="Label"
                    multiline={false}
                    text={state.formState.selectedControl?.field.label}
                  />
                )}

              {state.formState.selectedControl?.field.fieldType !==
                FieldType.HEADER &&
                state.formState.selectedControl?.field.fieldType !==
                  FieldType.PARAGRAPH &&
                state.formState.selectedControl?.field.fieldType !==
                  FieldType.RICHTEXT && (
                  <FormInput
                    id={"field.shortLabel"}
                    label="Short Label"
                    multiline={false}
                    text={
                      state.formState.selectedControl?.field.shortLabel + ""
                    }
                  />
                )}
              {state.formState.selectedControl?.field.fieldType !==
                FieldType.HEADER &&
                state.formState.selectedControl?.field.fieldType !==
                  FieldType.PARAGRAPH &&
                state.formState.selectedControl?.field.fieldType !==
                  FieldType.RICHTEXT && (
                  <FormInput
                    id={"field.description"}
                    label="Description"
                    multiline={true}
                    minRows={3}
                    text={
                      state.formState.selectedControl?.field.description + ""
                    }
                  />
                )}
              {/* {(state.formState.selectedControl?.fieldType ===
                FieldType.richtext ||
                state.formState.selectedControl?.fieldType ===
                  FieldType.header ||
                state.formState.selectedControl?.fieldType ===
                  FieldType.paragraph) && <FormOpenEditor id={"field.text"} />} */}
              <Options />
              <DisplayOptions />
              <Validation />
            </div>
          )}
        </div>
        <div className="flex">
          <DeleteFieldButton />
        </div>
      </div>
    </div>
  );
};
export default PropertiesToolbarOuter;
