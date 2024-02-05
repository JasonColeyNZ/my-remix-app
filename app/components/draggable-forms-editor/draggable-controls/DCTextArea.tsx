import { useContext } from "react";
import { AppContext } from "~/store/appContext.tsx";

import EditorTextField from "./DCTextSkeleton.tsx";
import { type FieldDefinition } from "../types.ts";
import TextArea from "../../form-controls/text-area/TextArea.tsx";
// import { useField } from "@conform-to/react";

interface DraggableFieldProps {
  field: FieldDefinition;
  disabled?: boolean;
  toolbox?: boolean;
  // prop: FieldName<string>;
  focus: boolean;
  fieldName: string;
}

const TextAreaDraggable = ({
  field,
  // prop,
  fieldName,
  disabled = false,
  toolbox = false,
  focus,
}: DraggableFieldProps) => {
  const { state: appState } = useContext(AppContext);
  // const [meta] = useField<string>(fieldName);
  if (
    appState.formState.formEditor &&
    !appState.formState.recordEditors.includes(field.area) &&
    !appState.formState.preview
  ) {
    return (
      <EditorTextField
        multiline={true}
        labelProps={{
          children:
            field.shortLabel && toolbox ? field.shortLabel : field.label,
        }}
        field={field}
      />
    );
  }

  return (
    <TextArea
      labelProps={{
        children: field.shortLabel && toolbox ? field.shortLabel : field.label,
      }}
      // inputProps={{
      //   ...getInputProps(meta, { type: "text" }),
      //   autoFocus: focus,
      //   disabled: disabled,
      //   required: field.validation?.required,
      // }}
      // errors={meta.errors}
      field={field}
      fieldName={field.id}
      hideError={false}
    />
  );
};
export default TextAreaDraggable;
