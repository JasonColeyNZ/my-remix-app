import EditorTextField from "./DCTextSkeleton.tsx";
import { type FieldDefinition } from "../types.ts";

interface DraggableFieldProps {
  type?: string;
  field: FieldDefinition;
  disabled?: boolean;
}

const Header = ({ type, field, disabled }: DraggableFieldProps) => {
  // console.log("preview: ", preview);
  return (
    <EditorTextField
      labelProps={{
        children: field.label,
      }}
      multiline={false}
      text={field.text}
      field={field}
    />
  );
};
export default Header;
