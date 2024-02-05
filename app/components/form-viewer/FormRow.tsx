import { type FormRowDefinition } from "../draggable-forms-editor/types";
import FormControlOuter from "./FormControlOuter";

interface FormRowProps {
  row: FormRowDefinition;
  // fields: Fieldset<{
  //   [x: string]: any;
  // }>;
}

const FormRow = ({ row }: FormRowProps) => {
  return row.controls.map((rowControl, controlIndex) => (
    <FormControlOuter
      key={controlIndex}
      row={row}
      rowControl={rowControl}
      // fields={fields}
    ></FormControlOuter>
  ));
};

export default FormRow;
