import React, { useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import {
  MdOutlineCheck,
  // MdOutlineClear,
  MdOutlineExpandMore,
} from "react-icons/md/index.js";
import { cn } from "~/utils/shadcn.utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ComboBoxProps {
  options: any[];
  labelName?: string;
  valueName?: string;
  tooltip?: string;
  initialValue?: string;
  onSelect?: (value: string) => void;
  //Alows outside clearing of combo
  clearSelected?: boolean;
  setClearSelected?: React.Dispatch<React.SetStateAction<boolean>>;
  forceOpen?: boolean;
}

const ComboBox = ({
  options,
  labelName = "text",
  valueName = "value",
  initialValue,
  onSelect,
  tooltip,
  clearSelected,
  setClearSelected,
  forceOpen = false,
}: ComboBoxProps) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(initialValue || "");

  useEffect(() => {
    if (forceOpen && value === "") {
      setOpen(true);
    }
  }, [forceOpen, value]);

  // console.log("initialValue", initialValue);
  useEffect(() => {
    if (clearSelected) {
      setClearSelected && setClearSelected(false);
      setValue("");
    }
  }, [clearSelected, setClearSelected]);

  const getValue = () => {
    const found = options.find((option) => {
      // console.log("option[valueName]", option[valueName]);
      return option[valueName].toString().toLowerCase() === value.toLowerCase();
    });
    // console.log(found);
    return found ? found[labelName] : "";
  };

  return (
    <Tooltip delayDuration={1000}>
      <Popover open={open} onOpenChange={setOpen}>
        <TooltipTrigger asChild>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value ? getValue() : "Select option..."}
              <MdOutlineExpandMore className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </TooltipTrigger>
        <PopoverContent
          className="w-[200px] p-0 z-[1500] overflow-auto"
          // className="p-0 z-[1500]"
          align="end"
          side="bottom"
          style={{
            width: "var(--radix-popover-trigger-width)",
            minWidth: "var(--radix-popover-trigger-width)",
            maxHeight: "var(--radix-popover-content-available-height)",
          }}
          // onPointerDownOutside={(event) => {
          //   console.log("onPointerDownOutside: ", event);
          // }}
        >
          <Command>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option[valueName]}
                  //To string as if its a number cmdk seems to use the label as the value
                  value={option[valueName].toString()}
                  onSelect={(currentValue) => {
                    console.log("currentValue", currentValue); //au
                    setValue(currentValue === value ? "" : currentValue);
                    onSelect && onSelect(currentValue);
                    setOpen(false);
                  }}
                >
                  <MdOutlineCheck
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option[valueName] ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option[labelName]}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Popover>
    </Tooltip>
  );
};

export default ComboBox;
