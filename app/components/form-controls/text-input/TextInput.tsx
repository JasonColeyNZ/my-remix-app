import { Input } from "~/components/ui/input.tsx";
import { Label } from "~/components/ui/label.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

// import type { ListOfErrors } from "../ErrorList.tsx";
import ErrorList from "../ErrorList.tsx";
import {
  DisplayTextAlignment,
  type FieldDefinition,
} from "~/components/draggable-forms-editor/types.ts";
import { getInputProps, useField } from "@conform-to/react";

interface TextInputProps {
  // errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  // inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  autoValue?: string;
  hideError?: boolean;
  field?: FieldDefinition;
  fieldName: string;
}

const TextInput = ({
  // inputProps,
  labelProps,
  descriptionProps,
  // errors,
  autoValue,
  hideError = false,
  field,
  fieldName,
}: TextInputProps) => {
  // console.log("field: ", field);
  // console.log("fieldName: ", fieldName);
  // console.log("inputProps: ", inputProps);
  // console.log("autoFocus: ", inputProps.autoFocus);
  // const [internalValue, setInternalValue] = useState<
  //   string | readonly string[] | number | null
  // >(inputProps && inputProps.defaultValue ? inputProps.defaultValue : "");
  // const fallbackId = useId();
  const [meta] = useField<string>(fieldName);
  const props = getInputProps(meta, { type: "text" });
  // const id = inputProps && inputProps.id ? inputProps.id : fallbackId;

  const errorId = meta.errors?.length ? `${props.id}-error` : undefined;

  // useEffect(() => {
  //   if (!inputProps) return;
  //   //console.log("inputProps.defaultValue: ", inputProps.defaultValue);
  //   setInternalValue(inputProps.defaultValue ?? "");
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [inputProps && inputProps?.defaultValue]);

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
          <Label htmlFor={props.id} {...labelProps} className="leading-4">
            {labelProps.children}
            <span className="text-destructive">
              {props.required ? "*" : ""}
            </span>
          </Label>
        )}
        {descriptionProps && descriptionProps.children ? (
          <Label
            className="pl-2 text-xs font-light pb-1  text-secondary-foreground"
            htmlFor={props.id}
            {...descriptionProps}
          />
        ) : null}
      </div>
      <div className="flex flex-col flex-1">
        <Input
          {...props}
          // id={id}
          // aria-invalid={errorId ? true : undefined}
          // aria-describedby={errorId}
          // className={cn(
          //   "shadow-sm ",
          //   "block w-full sm:text-sm border-gray-300 rounded-md h-8",
          //   inputProps && inputProps.className,
          // )}
          // name={inputProps && inputProps.name}
          // autoFocus={inputProps && inputProps.autoFocus}
          // autoComplete={(inputProps && inputProps.autoComplete) || "off"}
          // type={inputProps && inputProps.type}
          // value={internalValue?.toString()}
          // required={inputProps && inputProps.required}
          // disabled={inputProps && inputProps.disabled}
          // placeholder={inputProps && inputProps.placeholder}
          // onChange={(e) => {
          //   // console.log("e.target.value: ", e.target.value);
          //   setInternalValue(e.target.value);
          //   inputProps.onChange?.(e);
          // }}
        />
        {!hideError && (
          <div className="min-h-[20px] px-4 py-0 pt-1">
            {errorId ? <ErrorList id={errorId} errors={meta.errors} /> : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextInput;
