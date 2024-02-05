// import { useState } from "react";
import { Checkbox } from "~/components/ui/checkbox.tsx";
import { Label } from "~/components/ui/label.tsx";

import type { ListOfErrors } from "../ErrorList.tsx";
import ErrorList from "../ErrorList.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import type { CheckedState } from "@radix-ui/react-checkbox";
import { getInputProps, useField, useInputControl } from "@conform-to/react";

type CheckBoxFieldType = {
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  autoValue?: CheckedState;
  fieldName: string;
  hideError: boolean;
  labelClassName?: string;
};

const CheckBoxField = ({
  labelProps,
  fieldName,
  descriptionProps,
  errors,
  hideError = false,
  labelClassName, // autoValue,
}: CheckBoxFieldType) => {
  const [meta] = useField<boolean>(fieldName);
  // console.log("meta: ", meta.initialValue);
  const props = getInputProps(meta, { type: "checkbox" });
  const control = useInputControl(meta);
  // console.log("props: ", props);

  // const errorId = errors?.length ? `${meta.id}-error` : undefined;

  // const [internalValue, setInternalValue] = useState<CheckedState>(
  //   props.defaultChecked ?? false,
  // );

  const { type, ...rest } = props;

  // useEffect(() => {
  //   if (autoValue === undefined) return;
  //   // console.log("autoValue: ", autoValue);
  //   setInternalValue(autoValue);
  // }, [autoValue, meta]);

  return (
    <div className="flex w-full p-2">
      <Checkbox
        // id={meta.id}
        aria-invalid={meta.errorId ? true : undefined}
        aria-describedby={meta.errorId}
        className="ml-1 self-center"
        // name={meta.name}
        // checked={internalValue}
        // onCheckedChange={setInternalValue}

        // required={props.required}
        {...rest}
        // defaultChecked={props.defaultChecked}
      />

      {labelProps && labelProps.children && (
        <Label
          htmlFor={props.id}
          {...labelProps}
          className={cn("ml-2 self-center", labelClassName)}
        >
          {labelProps.children}
          <span className="text-destructive">{props.required ? "*" : ""}</span>
        </Label>
      )}
      {descriptionProps && descriptionProps.children ? (
        <Label
          className="pl-2 text-xs font-light pb-1"
          htmlFor={props.id}
          {...descriptionProps}
        />
      ) : null}
      {!hideError && (
        <div className="min-h-[20px] px-4 py-0 pt-1">
          {meta.errorId ? (
            <ErrorList id={meta.errorId} errors={meta.errors} />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CheckBoxField;
