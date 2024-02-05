import { useEffect, useState } from "react";
import { Label } from "~/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import ErrorList from "../ErrorList.tsx";
import PickerDialog from "./PickerDialog.tsx";
import { Button } from "~/components/ui/button.tsx";
import { useField, useInputControl } from "@conform-to/react";

type ColorPickerProps = {
  id?: string;
  // label: string;
  placeholder?: string;
  floatingLabelText?: string;
  hintText?: string;
  //  onChange: (value: string) => void;
  //  value: string;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  className?: string;
  labelClassName?: string;
  fieldName: string;
};

const ColorPicker = ({
  // id,
  placeholder,
  labelProps,
  descriptionProps,
  hintText,
  className,
  labelClassName,
  fieldName,
}: ColorPickerProps) => {
  // console.log("ColorPicker: ", fieldName);
  const [meta] = useField<string>(fieldName);
  const control = useInputControl(meta);

  // const [color, setColor] = useState<string>(meta.initialValue ?? "");

  // console.log("color: ", color);
  // console.log("errors: ", errors);
  // const [showPicker, setShowPicker] = useState(false);
  // const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState<string>(
    meta.initialValue ?? "",
  );

  // useEffect(() => {
  //   setInternalValue(color);
  // }, [color]);

  useEffect(() => {
    console.log("meta.initialValue: ", meta.initialValue);
    // setColor(meta.initialValue ?? "");
    setInternalValue(meta.initialValue ?? "");
  }, [meta.initialValue]);

  return (
    <>
      <div className={cn("flex flex-col w-full gap-1", className)}>
        <Label
          htmlFor={meta.id}
          {...labelProps}
          className={cn("leading-4", labelClassName)}
        >
          {labelProps.children}
          <span className="text-destructive">{meta.required ? "*" : ""}</span>
        </Label>
        <input name={fieldName} type="hidden" value={internalValue} />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              // ref={inputRef}
              // onClick={(e) => {
              //   console.log(e);
              //   inputRef && inputRef.current && inputRef.current.focus();
              // }}
              className={cn(
                //these are from base ShadCn input
                "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 ",
                "text-sm shadow-sm transition-colors file:border-0 file:bg-transparent ",
                "file:text-sm file:font-medium placeholder:text-muted-foreground ",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ",
                "disabled:cursor-not-allowed disabled:opacity-50",
                //these are from our input
                " focus:outline-none focus:ring-primary-5 focus:border-primary-5 focus:bg-[unset]",
                "block w-full sm:text-sm",
              )}
              // className={`{bg-[${internalValue}]}`}
              style={{
                backgroundColor:
                  internalValue && internalValue !== ""
                    ? internalValue
                    : undefined,
                // background: "inherit",
                // backgroundClip: "text",
                // WebkitBackgroundClip: "text",
                // filter: "invert(0.5) grayscale(0.7)",
                color: "black",
                // mixBlendMode: "difference",
                // WebkitFilter: "invert(0.5) grayscale(0.7)",
              }}
              id={meta.id}
              aria-invalid={meta.errorId ? true : undefined}
              aria-describedby={meta.errorId}
              // {...inputProps}
              // type="text"

              // label={floatingLabelText || label}
              // value={internalValue}
              // onChange={(e) => {}}
              // InputProps={{
              //   style: { color: color === undefined ? internalValue : color },
              // }}
              //{...TextFieldProps}
              //{...custom}
            >
              {/* <span
                style={{
                  background: "inherit",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  filter: "invert(0.4) grayscale(0.1)",
                  color: "white",
                  mixBlendMode: "difference",
                  // WebkitFilter: "invert(0.2) grayscale(0.1)",
                }}
              >
                {internalValue}
              </span> */}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[225px] h-[243px] p-0">
            <PickerDialog
              value={
                // color === ""
                internalValue ? internalValue.toString() : ""
                // : color.toString()
              }
              onChange={(c) => {
                // if (internalValue === c) return;
                setInternalValue(c);
                // setColor(c);
                control.change(c);
              }}
            />
          </PopoverContent>
        </Popover>
        <div className="min-h-[20px] px-4 py-0">
          {meta.errorId ? (
            <ErrorList id={meta.errorId} errors={meta.errors} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ColorPicker;
