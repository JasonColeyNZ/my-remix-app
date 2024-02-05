import { useContext } from "react";
import { AppContext } from "~/store/appContext.tsx";

import EditorTextField from "./DCTextSkeleton.tsx";
import { type FieldDefinition } from "../types.ts";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";

interface DraggableFieldProps {
  field: FieldDefinition;
  disabled?: boolean;
  toolbox?: boolean;
  // prop: FieldName<string>;
  focus: boolean;
  fieldName: string;
}

const TextInputDraggable = ({
  field,
  // prop,
  disabled = false,
  toolbox = false,
  focus,
  fieldName,
}: DraggableFieldProps) => {
  const { state } = useContext(AppContext);
  // const [meta] = useField<string>(fieldName);
  if (
    state.formState.formEditor &&
    !state.formState.recordEditors.includes(field.area) &&
    !state.formState.preview
  ) {
    return (
      <EditorTextField
        labelProps={{
          children:
            field.shortLabel && toolbox ? field.shortLabel : field.label,
        }}
        field={field}
      />
    );
  }

  return (
    <TextInput
      labelProps={{
        children: field.shortLabel && toolbox ? field.shortLabel : field.label,
      }}
      fieldName={fieldName}
      // inputProps={{
      //   ...getInputProps(meta, { type: "text" }),
      //   autoFocus: focus,
      //   disabled: disabled || state.formState.preview,
      //   required: field.validation?.required,
      // }}
      // errors={meta.errors}
      hideError={false}
      field={field}
    />
  );
};
export default TextInputDraggable;
