import { Input } from "~/components/ui/input.tsx";
import { Label } from "~/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import Timeit from "../../timeit/Timeit.tsx";
import ErrorList from "../ErrorList.tsx";
import { useField, useInputControl } from "@conform-to/react";
import { useState } from "react";

interface TimeitSelectProps {
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  fieldName: string;
  labelClassName?: string;
}

const TimeitSelect = ({
  descriptionProps,
  labelProps,
  fieldName,
  labelClassName,
}: TimeitSelectProps) => {
  // const fallbackId = useId();
  // const id = inputProps.id ?? fallbackId;
  // const errorId = errors?.length ? `${id}-error` : undefined;

  // useEffect(() => {
  //   setInternalValue(inputProps.defaultValue || "0:0");
  // }, [inputProps.defaultValue]);

  const [meta] = useField<string>(fieldName);
  const control = useInputControl(meta);

  const [internalValue, setInternalValue] = useState<string>(
    meta.initialValue || "0:0",
  );

  const handleOnChange = (value: string) => {
    if (value === internalValue) return;
    //console.log("value: ", value);
    //console.log("internalValue: ", internalValue);
    control.change(value);
    setInternalValue(value);
    // setValue(name, value, { shouldDirty: true });
  };

  return (
    <>
      <div className="flex flex-col w-full gap-1">
        <Label
          htmlFor={meta.id}
          {...labelProps}
          className={cn(
            "text-sm font-base text-foreground leading-4",
            labelClassName,
          )}
        >
          {labelProps.children}
          <span className="text-destructive">{meta.required ? "*" : ""}</span>
        </Label>
        <input
          hidden
          name={meta.name}
          value={internalValue}
          onChange={() => {}}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Input
              // name={inputProps.name}
              // id={meta.id}
              value={internalValue}
              //  disabled={meta.disabled}
              onChange={(e) => {
                //   // setInternalValue(e.target.value);
                //   // setColor(e.target.value);
              }}
              // {...getInputProps(meta, { type: "text" })}
              className={cn(
                //these are from base ShadCn input
                "flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 ",
                "text-sm shadow-sm transition-colors file:border-0 file:bg-transparent ",
                "file:text-sm file:font-medium placeholder:text-muted-foreground ",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ",
                "disabled:cursor-not-allowed disabled:opacity-50",
                //these are from our input
                " focus:outline-none  ",
                "focus:ring-primary-5 focus:border-primary-5 block w-full sm:text-sm",
                // " border-gray-300 ",
              )}
            />
          </PopoverTrigger>
          <PopoverContent className="w-[148px] h-[180px] p-0 px-2">
            <Timeit
              defaultValue={meta?.initialValue?.toString()}
              onChange={handleOnChange}
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
export default TimeitSelect;
