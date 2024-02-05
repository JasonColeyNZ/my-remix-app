import type { FieldDefinition } from "../types";
import ColorPicker from "~/components/form-controls/color-picker/ColorPicker";

interface DraggableFieldProps {
  type?: string;
  field: FieldDefinition;
  disabled?: boolean;
  toolbox?: boolean;
  preview?: boolean;
  fieldName: string;
  // prop: FieldName<string>;
}
export const ColorPickerDraggable = ({
  type = "text",
  field,
  fieldName,
  disabled = false,
  toolbox = false,
  preview,
}: DraggableFieldProps) => {
  return (
    <ColorPicker
      labelProps={{
        children: field.shortLabel && toolbox ? field.shortLabel : field.label,
      }}
      fieldName={fieldName}
    />
  );
};
