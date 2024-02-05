import { useContext } from "react";
import { AppContext } from "~/store/appContext.tsx";

import EditorTextField from "./DCTextSkeleton.tsx";
import { type FieldDefinition } from "../types.ts";
import DatePicker from "~/components/form-controls/date-picker/DatePicker.tsx";
import { getInputProps, useField } from "@conform-to/react";

interface DateTimeOptionsProps {
  field: FieldDefinition;
  // prop: FieldName<string>;
  toolbox?: boolean;
  fieldName: string;
}

// interface FieldProps extends FieldName<string> {
//   error?: string;
// }

const DateTime = ({
  field: fieldData,
  // prop,
  toolbox,
  fieldName,
}: DateTimeOptionsProps) => {
  const { state } = useContext(AppContext);
  const [meta] = useField<Date>(fieldName);
  //  const { control } = useFormContext();

  //  const defaultControlValue = control._defaultValues[fieldData.id];
  //console.log("defaultControlValue", control._defaultValues);
  // const [dateValue, setDateValue] = useState<Dayjs | null>(
  //   defaultControlValue ? dayjs(defaultControlValue) : null
  // );
  if (state.formState.formEditor && !state.formState.preview) {
    return (
      <EditorTextField
        labelProps={{
          children:
            fieldData.shortLabel && toolbox
              ? fieldData.shortLabel
              : fieldData.label,
        }}
        dropDown={true}
        date={true}
        field={fieldData}
      />
    );
  }

  return (
    <>
      <DatePicker
        labelProps={{
          children:
            fieldData.shortLabel && toolbox
              ? fieldData.shortLabel
              : fieldData.label,
        }}
        inputProps={{
          ...getInputProps(meta, { type: "text" }),
          disabled: state.formState.preview,
        }}
        errors={meta.errors}
        //     inputProps={}
        // labelProps={}
        // descriptionProps={}
        // errors={}

        // label={fieldData.label}
        // props={prop}
        disableFutureDate={fieldData.validation?.disableFutureDate}
        disablePastDate={fieldData.validation?.disablePastDate}
        openTo={fieldData.displayOptions?.openOn || "day"}
        views={["year", "month", "day"]}
        // defaultValue={defaultValue || ""}
        // required={fieldData.validation.required}
      />
    </>
  );
};
export default DateTime;
