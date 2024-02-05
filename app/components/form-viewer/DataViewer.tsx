// import { cn } from "~/utils/shadcn.utils.ts";

// import { getColSpan } from "../draggable-forms-editor/formUtils.ts";
import type { FormDefinition } from "../draggable-forms-editor/types.ts";
// import { FieldParentType } from "../draggable-forms-editor/types.ts";
// import GetControl from "../draggable-forms-editor/GetControl.tsx";

interface FormViewerProps {
  formDefinition: FormDefinition;
  defaultValues?: any;
}

const DataViewer = ({ formDefinition, defaultValues }: FormViewerProps) => {
  return null;
  // return (
  //   <>
  //     <div className="flex flex-1 flex-col">
  //       <div className="p-1 flex flex-row">
  //         {formDefinition.rows.map((row, rowIndex) => (
  //           <div
  //             className={cn(
  //               "flex flex-row flex-wrap ",
  //               rowIndex === formDefinition.rows.length - 1 && "flex-1 h-full",
  //             )}
  //             id="row-outer"
  //             key={row.id}
  //             // sx={[
  //             //   rowIndex === formDefinition.rows.length - 1 && {
  //             //     flex: "1 1 0",
  //             //     height: "100%",
  //             //   },
  //             // ]}
  //           >
  //             {row.controls.map((rowControl, controlIndex) => (
  //               <div
  //                 className={cn(
  //                   "p-1 flex min-w-[165px] ",
  //                   controlIndex > 0 &&
  //                     (rowControl.field.controlType === "radio" ||
  //                       rowControl.field.controlType === "checkbox") &&
  //                     "border-l border-gray-300",
  //                   (rowControl.field.type === "richtext" ||
  //                     rowControl.field.type === "texttemplate") &&
  //                     "flex-1 h-full",
  //                 )}
  //                 // sx={[
  //                 //   controlIndex > 0 &&
  //                 //     (rowControl.field.controlType === "radio" ||
  //                 //       rowControl.field.controlType === "checkbox") && {
  //                 //       borderLeft: "1px solid rgba(0,0,0,0.12)",
  //                 //     },
  //                 //   // {
  //                 //   //   p: 1,
  //                 //   //   display: "flex",
  //                 //   // },
  //                 //   (rowControl.field.type === "richtext" ||
  //                 //     rowControl.field.type === "texttemplate") && {
  //                 //     flex: "1 1 0",
  //                 //     height: "100%",
  //                 //   },
  //                 // ]}
  //                 // flex={`${getColSpan(row.controls, rowControl)}%`}
  //                 // minWidth={"165px"}
  //                 key={rowControl.id}
  //               >
  //                 {GetControl(
  //                   FieldParentType.VIEWER,
  //                   rowControl.field,
  //                   false,
  //                   true,
  //                   defaultValues?.[rowControl.field.id],
  //                   null,
  //                   null,
  //                   null, //control,
  //                   rowIndex === 0 && controlIndex === 0,
  //                 )}
  //               </div>
  //             ))}
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </>
  // );
};
export default DataViewer;
