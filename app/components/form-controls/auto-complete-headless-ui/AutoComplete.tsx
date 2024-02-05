import { useEffect, useState } from "react";
import { cn } from "~/utils/shadcn.utils.ts";

import ErrorList from "../ErrorList.tsx";
import { Label } from "~/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select.tsx";
import { useField, useInputControl } from "@conform-to/react";

// interface inputProps
//   extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "defaultValue"> {
//   // error?: string;
//   defaultValue?: string;
// }

type AutoCompleteType = {
  options: any[];
  labelName?: string;
  valueName?: string;
  // errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  fieldName: string;
  // inputProps: inputProps;
  hideError: boolean;
  onChange?: (value: string | string[] | null) => void;
  labelClassName?: string;
};

const AutoComplete = ({
  options,
  // inputProps,
  labelProps,
  descriptionProps,
  fieldName,
  // errors,
  labelName = "text",
  valueName = "value",
  hideError = false,
  labelClassName,
  onChange,
}: AutoCompleteType) => {
  // console.log("inputProps: ", inputProps);
  // const fallbackId = useId();
  // const id = inputProps.id ?? fallbackId;

  const [meta] = useField<string>(fieldName);

  const [internalValue, setInternalValue] = useState<string | undefined>(
    meta.initialValue,
  );

  const control = useInputControl(meta);
  // const errorId = meta.errors?.length ? `${id}-error` : undefined;

  const updateFormData = (selected: any) => {
    control.change(selected);
    // form.update({
    //   name: inputProps.name ?? "",
    //   value: selected,
    // });
  };

  useEffect(() => {
    //console.log(getOption(inputProps.defaultValue ?? null));
    setInternalValue(meta.initialValue + "");
  }, [meta.initialValue]);

  return (
    <div className="flex flex-col gap-1 w-full">
      <input
        name={meta.name}
        value={internalValue}
        onChange={() => {}}
        hidden
        readOnly
      />
      <Select
        value={internalValue}
        // disabled={meta.disabled}
        // by={valueName}
        onValueChange={(option: any) => {
          // console.log("option", option);
          setInternalValue(option);
          if (onChange) {
            onChange(option ? option[valueName] : null);
          }
          updateFormData(option);
        }}
        // name={inputProps.name}
      >
        <Label
          className={cn(
            "text-sm font-base text-foreground leading-4",
            labelClassName,
          )}
          htmlFor={meta.id}
          {...labelProps}
        >
          {labelProps.children}
          <span className="text-destructive">{meta.required ? "*" : ""}</span>
        </Label>
        <div className="relative">
          <div
            className={cn(
              "relative cursor-default  bg-white text-left " +
                " w-full sm:text-sm rounded-md",
            )}
          >
            <SelectTrigger
              id={meta.id}
              className={cn(
                //these are from base ShadCn input
                "flex h-8 rounded-md border border-input bg-transparent px-3 py-1 ",
                "text-sm shadow-sm transition-colors ",
                "placeholder:text-muted-foreground ",
                "disabled:cursor-not-allowed disabled:opacity-50",
                //these are from our input
                " focus:outline-none  ",
                " focus-visible:ring-1 focus-visible:ring-ring  focus:ring-primary-5 focus:border-primary-5 sm:text-sm",
              )}
            >
              <SelectValue />
            </SelectTrigger>
            {/* id={id}
              className={cn(
                //these are from base ShadCn input
                "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 " +
                  "text-sm shadow-sm transition-colors " +
                  "placeholder:text-muted-foreground " +
                  "disabled:cursor-not-allowed disabled:opacity-50" +
                  //these are from our input
                  " focus:outline-none  " +
                  " focus-visible:ring-1 focus-visible:ring-ring  focus:ring-primary-5 focus:border-primary-5 block w-full sm:text-sm" +
                  " border-gray-300 ",
              )}
              // onChange={(event) => setQuery(event.target.value)}
              aria-invalid={errorId ? true : undefined}
              aria-describedby={errorId}
              // name={inputProps.name}
              required={inputProps.required}
              displayValue={(option: any) => {
                return option ? option[labelName] : "";
              }}
            /> */}
          </div>
          <SelectContent>
            {options &&
              options.map((option, index) => (
                <SelectItem key={option[valueName]} value={option[valueName]}>
                  {option[labelName]}
                </SelectItem>
              ))}
          </SelectContent>
        </div>
      </Select>
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

export default AutoComplete;
