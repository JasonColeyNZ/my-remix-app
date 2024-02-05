import type { FieldDefinition } from "../types";
import TimeitSelect from "~/components/form-controls/timeit-select/TimeitSelect";

interface DraggableFieldProps {
  type?: string;
  field: FieldDefinition;
  disabled?: boolean;
  toolbox?: boolean;
  preview?: boolean;
  // prop: FieldName<string>;
  fieldName: string;
}
export const TimeitDraggable = ({
  type = "text",
  field,
  // prop,
  disabled = false,
  toolbox = false,
  preview,
  fieldName,
}: DraggableFieldProps) => {
  // const [meta] = useField<string>(fieldName);
  return (
    <TimeitSelect
      labelProps={{
        children: field.shortLabel && toolbox ? field.shortLabel : field.label,
      }}
      fieldName={fieldName}
      // inputProps={{
      //   ...getInputProps(meta, { type: "text" }),
      //   autoFocus: true,
      // }}
    />
  );
};
