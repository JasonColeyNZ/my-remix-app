import { useCallback, useEffect, useId, useState } from "react";
import {
  MdOutlineCheck,
  MdOutlineClear,
  MdOutlineExpandMore,
} from "react-icons/md/index.js";
import { Badge } from "~/components/ui/badge.tsx";
import { Button } from "~/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command.tsx";
import { Label } from "~/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import type { ListOfErrors } from "../ErrorList.tsx";
import ErrorList from "../ErrorList.tsx";
import { useField } from "@conform-to/react";

type ComboBoxType = {
  options: any[];
  labelName?: string;
  valueName?: string;
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

function isArrayOfStrings(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
}
const ComboBox = ({
  options,
  inputProps,
  labelProps,
  descriptionProps,
  errors,
  labelName = "text",
  valueName = "value",
}: ComboBoxType) => {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;

  const [, form] = useField(inputProps.name ?? "");

  const [open, setOpen] = useState(false);
  const getOption = useCallback(
    (value: string | number | readonly string[] | null) => {
      return (
        options.find(
          (option) =>
            (option[valueName] + "").toLowerCase() ===
            (value + "").toLowerCase(),
        ) ?? null
      );
    },
    [options, valueName],
  );

  const [internalValue, setInternalValue] = useState<string[]>(
    isArrayOfStrings(inputProps.defaultValue)
      ? inputProps.defaultValue
      : typeof inputProps.defaultValue === "string"
      ? inputProps.defaultValue.split(",")
      : [],
  );

  const internalToExternal = (value: string | string[] | null) => {
    if (value === null) return "";
    if (value === "" || value === undefined) return "";
    if (Array.isArray(value)) {
      return value.join(",");
    }
    return value;
  };

  const handleUnselect = (e: any, item: string) => {
    // console.log("handleUnselect", e);
    e.stopPropagation();
    setInternalValue(internalValue.filter((i) => i !== item));
    updateFormData(internalValue.filter((i) => i !== item));
  };

  useEffect(() => {
    setInternalValue(
      isArrayOfStrings(inputProps.defaultValue)
        ? inputProps.defaultValue
        : typeof inputProps.defaultValue === "string"
        ? inputProps.defaultValue.split(",")
        : [],
    );
  }, [inputProps.defaultValue]);

  const updateFormData = (selected: any) => {
    form.update({
      name: inputProps.name ?? "",
      value: selected,
    });
  };

  return (
    <div className="grid w-full items-center gap-1">
      <input
        name={inputProps.name}
        value={internalToExternal(internalValue ? internalValue : null)}
        onChange={() => {}}
        hidden
        readOnly
      />
      <Label
        htmlFor={id}
        {...labelProps}
        className={cn("text-sm font-base text-foreground leading-none pb-1")}
      >
        {labelProps.children}
        <span className="text-destructive">
          {inputProps.required ? "*" : ""}
        </span>
      </Label>
      {descriptionProps && descriptionProps.children ? (
        <Label
          className="pl-2 text-xs font-light"
          htmlFor={id}
          {...descriptionProps}
        />
      ) : null}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            type="button"
            aria-expanded={open}
            className={cn(
              "flex flex-row w-full rounded-md border border-input bg-transparent px-3 py-1",
              "shadow-sm transition-colors file:border-0 file:bg-transparent",
              "file:text-sm file:font-medium placeholder:text-muted-foreground",
              "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              //these are from our input
              "focus:outline-none h-fit   ",
              "focus:ring-primary-5 focus:border-primary-5 sm:text-sm",
              "justify-between",
              // Array.isArray(internalValue) && internalValue.length > 1
              //   ? "h-full"
              //   : "h-9",
            )}
            onClick={() => setOpen(!open)}
          >
            <div className="flex gap-1 flex-wrap">
              {Array.isArray(internalValue) &&
                internalValue.map((item) => (
                  <Badge
                    variant="secondary"
                    key={item}
                    className="mr-1"
                    // onClick={(e) => handleUnselect(e, item)}
                  >
                    {getOption(item) ? getOption(item)[labelName] : ""}
                    <div
                      className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      tabIndex={-1}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleUnselect(e, item);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={(e) => handleUnselect(e, item)}
                    >
                      <MdOutlineClear className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                    </div>
                  </Badge>
                ))}
            </div>
            <MdOutlineExpandMore className="min-h-[1.25rem] min-w-[1.25rem] h-5 w-5 max-w-5 max-h-5 my-[1px] text-gray-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0 z-[1500] overflow-auto"
          align="end"
          side="bottom"
          style={{
            width: "var(--radix-popover-trigger-width)",
            minWidth: "var(--radix-popover-trigger-width)",
            maxHeight: "var(--radix-popover-content-available-height)",
          }}
        >
          <Command>
            <CommandInput
              placeholder={`Search ${labelProps.children}`}
              className="h-9"
            />
            <CommandEmpty>{`No ${labelProps.children} found.`}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option[valueName]}
                  value={option[valueName].toString()}
                  onSelect={(value) => {
                    // console.log("value", value);

                    const selected =
                      Array.isArray(internalValue) &&
                      internalValue.includes(value)
                        ? internalValue.filter((item) => item !== value)
                        : [...internalValue, value];
                    // console.log("selected", selected);
                    setInternalValue(selected);
                    updateFormData(selected);
                    setOpen(true);
                  }}
                >
                  <MdOutlineCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      Array.isArray(internalValue) &&
                        internalValue.includes(option[valueName])
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option[labelName]}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <div className="min-h-[20px] px-4 py-0">
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
};

export default ComboBox;
