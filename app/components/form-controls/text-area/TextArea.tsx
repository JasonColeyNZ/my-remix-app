// import { useEffect, useId, useState } from "react";
import { Label } from "~/components/ui/label.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
// import type { ListOfErrors } from "../ErrorList";
import ErrorList from "../ErrorList";
import { Textarea } from "../../ui/textarea";
import {
  DisplayTextAlignment,
  type FieldDefinition,
} from "../../draggable-forms-editor/types";
import { getInputProps, useField } from "@conform-to/react";

type TextAreaType = {
  // multiline?: boolean;
  // rows?: number;
  // value?: string;
  // setValue?: (value: string) => void;
  // placeholder?: string;
  // type?: string;
  // errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  // inputProps: React.InputHTMLAttributes<HTMLTextAreaElement>;
  autoValue?: string;
  className?: string;
  hideError?: boolean;
  fieldName: string;
  field: FieldDefinition | null;
};

const TextArea = ({
  // inputProps,
  labelProps,
  descriptionProps,
  // errors,
  autoValue,
  className,
  fieldName,
  hideError = false,
  field,
}: TextAreaType) => {
  // console.log("inputProps: ", inputProps);

  const [meta] = useField<string>(fieldName);
  const props = getInputProps(meta, { type: "text" });

  // console.log("inputProps: ", inputProps);
  // console.log("autoFocus: ", inputProps.autoFocus);
  // const [internalValue, setInternalValue] = useState<
  //   string | readonly string[] | number | null
  // >(inputProps && inputProps.defaultValue ? inputProps.defaultValue : "");

  // const fallbackId = useId();
  // const id = inputProps && inputProps.id ? inputProps.id : fallbackId;
  // const errorId = errors?.length ? `${id}-error` : undefined;

  // useEffect(() => {
  //   if (!inputProps) return;
  //   setInternalValue(inputProps.defaultValue ?? "");
  // }, [inputProps]);

  // useEffect(() => {
  //   if (autoValue === undefined) return;
  //   setInternalValue(autoValue ?? "");
  // }, [autoValue]);

  return (
    <div
      className={cn(
        "flex flex-col w-full gap-1",
        field &&
          field.displayOptions?.textAlign === DisplayTextAlignment.LEFT &&
          "flex-row",
      )}
    >
      <div
        className={cn(
          "flex flex-col",
          field &&
            field.displayOptions?.textAlign === DisplayTextAlignment.LEFT &&
            "flex-1",
        )}
      >
        {labelProps && labelProps.children && (
          <Label htmlFor={meta.id} {...labelProps} className="pb-1">
            {labelProps.children}
            <span className="text-destructive">
              {props.required ? "*" : ""}
            </span>
          </Label>
        )}
        {descriptionProps && descriptionProps.children ? (
          <Label
            className="pl-2 text-xs font-light pb-1"
            htmlFor={meta.id}
            {...descriptionProps}
          />
        ) : null}
      </div>
      <div className="flex flex-col flex-1">
        <Textarea
          // id={meta.id}
          aria-invalid={meta.errorId ? true : undefined}
          aria-describedby={meta.errorId}
          className={cn(
            "shadow-sm focus:ring-primary-5 focus:border-primary-5",
            "block w-full sm:text-sm border-gray-300 rounded-md",
            className,
          )}
          {...props}
          // name={inputProps && inputProps.name}
          // autoFocus={inputProps && inputProps.autoFocus}
          // autoComplete={inputProps && inputProps.autoComplete}
          // type={inputProps && inputProps.type}
          // value={internalValue?.toString()}
          // required={inputProps && inputProps.required}
          // disabled={inputProps && inputProps.disabled}
          // placeholder={inputProps && inputProps.placeholder}
          // onChange={(e) => {
          // setInternalValue(e.target.value);
          // inputProps && inputProps.onChange?.(e);
          // }}
        />
        {!hideError && (
          <div className="min-h-[20px] px-4 py-0 pt-1">
            {meta.errorId ? (
              <ErrorList id={meta.errorId} errors={meta.errors} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
