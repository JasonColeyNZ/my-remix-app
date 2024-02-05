import { useContext } from "react";
import FormSectionHeader from "~/components/typography/FormSectionHeader.tsx";

import { DraggableFormContext } from "../../store/draggableFormContext.tsx";
import FormInput from "../controls/FormInput.tsx";
import FormSelect from "../controls/FormSelect.tsx";
import {
  columnSpanOptions,
  openOnOptions,
  trueFalseOptions,
} from "../controls/select-constants.ts";
import { FieldType } from "../../types.ts";

const DisplayOptions = () => {
  const { state } = useContext(DraggableFormContext);

  if (
    !state.formState.selectedControl ||
    !state.formState.selectedControl.field
  )
    return null;

  return (
    <>
      <FormSectionHeader title={"Display Options"} paddingTop="10px" />
      <FormSelect
        label="Width"
        id="colSpan"
        value={state.formState.selectedControl.colSpan}
        options={columnSpanOptions}
      />

      {state.formState.selectedControl.field.displayOptions
        ?.startInputAdornment && (
        <FormInput
          id="field.displayOptions.startInputAdornment"
          label="Prefix"
          text={
            state.formState.selectedControl.field.displayOptions
              .startInputAdornment
          }
        />
      )}

      {state.formState.selectedControl.field.fieldType ===
        FieldType.DATETIME && (
        <>
          <FormSelect
            id="field.displayOptions.disablePastDates"
            label="Disable Past Dates"
            value={
              state.formState.selectedControl.field.displayOptions
                ?.disablePastDates ?? false
            }
            options={trueFalseOptions}
          />
          <FormSelect
            id="field.displayOptions.disableFutureDates"
            label="Disable Future Dates"
            value={
              state.formState.selectedControl.field.displayOptions
                ?.disableFutureDates ?? false
            }
            options={trueFalseOptions}
          />
          <FormSelect
            id="field.displayOptions.openOn"
            label="Open On"
            value={
              state.formState.selectedControl.field.displayOptions?.openOn ??
              "date"
            }
            options={openOnOptions}
          />
        </>
      )}
    </>
  );
};
export default DisplayOptions;
