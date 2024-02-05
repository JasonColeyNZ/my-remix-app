import type { ListOfErrors } from "../ErrorList.tsx";
import ErrorList from "../ErrorList.tsx";
import { countries } from "./country.ts";
import { getInputProps, useField } from "@conform-to/react";
import AutoComplete from "../auto-complete-headless-ui/AutoComplete.tsx";

type AutoCompleteType = {
  showPhone?: Boolean;
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  autoValue?: string;
  fieldName: string;
};

const CountryAutoComplete = ({
  labelProps,
  errors,
  fieldName,
}: AutoCompleteType) => {
  const [meta] = useField<string>(fieldName);

  const props = getInputProps(meta, { type: "text" });

  const errorId = errors?.length ? `${props.id}-error` : undefined;

  return (
    <>
      <div className="grid w-full items-center gap-1">
        <AutoComplete
          fieldName={props.name}
          labelProps={labelProps}
          labelName="label"
          valueName="code"
          options={countries as any}
          hideError={false}
        />
        <div className="min-h-[20px] px-4 py-0">
          {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
        </div>
      </div>
    </>
  );
};
export default CountryAutoComplete;
