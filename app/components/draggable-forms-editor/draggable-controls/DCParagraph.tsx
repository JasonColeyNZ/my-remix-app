import EditorTextField from "./DCTextSkeleton.tsx";
import { type FieldDefinition } from "../types.ts";

interface DraggableFieldProps {
  field: FieldDefinition;
}

const Paragraph = ({ field }: DraggableFieldProps) => {
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
    // <div
    //   className={cn(
    //     "flex flex-1 whitespace-break-spaces mr-[8px] items-center mb-2 font-semibold text-primary-10 ",
    //     !preview && "border border-gray-300 rounded-md mx-1 mb-[8px]",
    //   )}
    // >
    //   {field.shortLabel ? field.shortLabel : field.label}
    // </div>
  );
};
export default Paragraph;
