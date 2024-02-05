import { useContext } from "react";
import FormSectionHeader from "~/components/typography/FormSectionHeader";
import type { OptionType } from "~/utils/types";

import { DraggableFormContext } from "../../store/draggableFormContext";
import FormSelect from "../controls/FormSelect";

const requiredOptions: OptionType[] = [
  { value: "true", text: "True" },
  { value: "false", text: "False" },
];

const Validation = () => {
  const { state } = useContext(DraggableFormContext);

  if (
    !state.formState.selectedControl ||
    !state.formState.selectedControl.field ||
    (state.formState.selectedControl.field?.validation &&
      Object.keys(state.formState.selectedControl.field?.validation).length ===
        0)
  )
    return null;

  return (
    <>
      <FormSectionHeader title={"Validation"} paddingTop="10px" />
      <FormSelect
        label="Required"
        id="field.validation.required"
        value={
          state.formState.selectedControl?.field?.validation?.required
            ? state.formState.selectedControl?.field?.validation?.required.toString()
            : "false"
        }
        options={requiredOptions}
      />
    </>
  );
};
export default Validation;
