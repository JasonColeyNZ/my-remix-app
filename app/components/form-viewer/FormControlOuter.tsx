import { cn } from "~/utils/shadcn.utils";

import { getColSpan } from "../draggable-forms-editor/formUtils";
import type {
  FormFieldDefinition,
  FormRowDefinition,
} from "../draggable-forms-editor/types";
import { FieldParentType } from "../draggable-forms-editor/types";
import GetControl from "../draggable-forms-editor/GetControl";

interface FormControlOuterProps {
  row: FormRowDefinition;
  rowControl: FormFieldDefinition;
  preview?: boolean;
}

const FormControlOuter = ({
  row,
  // form,
  rowControl,
}: FormControlOuterProps) => {
  return (
    <div
      className={cn(
        "flex w-full min-w-[60px] items-start",
        // row.controls.length - 1 === rowControl.sortOrder
        //   ? "flex-1"
        getColSpan(row.controls, rowControl, null, false),
      )}
      id="control-outer"
      key={rowControl.id}
    >
      <div className="flex-1 mr-2">
        {GetControl(
          // fields,
          FieldParentType.ROW,
          rowControl.field,
          false,
          rowControl.field.autoFocus || false,
          // form.ref,
          // fields[rowControl.field.id].defaultValue,
        )}
      </div>
    </div>
  );
};

export default FormControlOuter;
