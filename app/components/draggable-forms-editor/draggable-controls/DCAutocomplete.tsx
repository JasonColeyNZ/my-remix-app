import { useContext } from "react";
import { AppContext } from "~/store/appContext.tsx";

import EditorTextField from "./DCTextSkeleton.tsx";
import { type FieldDefinition } from "../types.ts";
import AutoComplete from "~/components/form-controls/auto-complete-headless-ui/AutoComplete.tsx";
import ComboBox from "~/components/form-controls/combobox/ComboBox.tsx";
import { useField, getInputProps } from "@conform-to/react";
// import { ListOfErrors } from "../form-controls/ErrorList.tsx";

interface DraggableFieldProps {
  field: FieldDefinition;
  disabled?: boolean;
  defaultValue?: any;
  multiple?: boolean;
  focus: boolean;
  fieldName: string;
  // prop: FieldName<string>;
}

const AutocompleteDraggable = ({
  field: fieldData,
  disabled = false,
  defaultValue,
  // prop,
  fieldName,
  focus,
  multiple = false,
}: DraggableFieldProps) => {
  // console.log("AutocompleteDraggable: ", fieldData);

  const { state } = useContext(AppContext);
  const [meta] = useField<string>(fieldName);
  if (
    state.formState.formEditor &&
    !state.formState.recordEditors.includes(fieldData.area) &&
    !state.formState.preview
  ) {
    return (
      <EditorTextField
        labelProps={{
          children: fieldData.label,
        }}
        dropDown={true}
        field={fieldData}
      />
    );
  }

  return fieldData.displayOptions?.multiple ? (
    <ComboBox
      options={fieldData.options || []}
      labelProps={{
        children: fieldData.shortLabel ? fieldData.shortLabel : fieldData.label,
      }}
      inputProps={{
        ...getInputProps(meta, { type: "text" }),
        autoFocus: focus,
        disabled: state.formState.preview,
      }}
    />
  ) : (
    <AutoComplete
      // id={fieldData.id}
      options={fieldData.options || []}
      labelProps={{
        children: fieldData.shortLabel ? fieldData.shortLabel : fieldData.label,
      }}
      // inputProps={{
      //   ...getInputProps(meta, { type: "text" }),
      //   autoFocus: focus,
      //   disabled: state.formState.preview,
      // }}
      hideError={false}
      fieldName={fieldData.id}
      // defaultValue={defaultValue}
      // label={fieldData.label}
      // props={prop} // required={fieldData.validation.required}
      // preview={preview}
      // disabled={disabled}
    />
  );
};
export default AutocompleteDraggable;
