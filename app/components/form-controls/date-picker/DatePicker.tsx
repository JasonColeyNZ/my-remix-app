import { format } from "date-fns";
import { useId, useState } from "react";
import { MdOutlineCalendarMonth } from "react-icons/md/index.js";
import { Button } from "~/components/ui/button.tsx";
import { Calendar } from "~/components/ui/calendar.tsx";
import { Label } from "~/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import type { ListOfErrors } from "../ErrorList.tsx";
import ErrorList from "../ErrorList.tsx";

type DatePickerType = {
  disableFutureDate?: boolean;
  disablePastDate?: boolean;
  openTo?: "day" | "year" | "month";
  views?: ["year", "month", "day"];
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

const DatePicker = ({
  disableFutureDate = false,
  disablePastDate = false,
  openTo = "day",
  views,
  inputProps,
  labelProps,
  descriptionProps,
  errors,
}: DatePickerType) => {
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  const [date, setDate] = useState<Date>(
    inputProps.defaultValue
      ? new Date(inputProps.defaultValue.toString())
      : new Date(),
  );
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col w-full gap-1 p-px">
      {labelProps && labelProps.children && (
        <Label htmlFor={id} {...labelProps} className="pb-1">
          {labelProps.children}
          <span className="text-destructive">
            {inputProps.required ? "*" : ""}
          </span>
        </Label>
      )}
      {descriptionProps && descriptionProps.children ? (
        <Label
          className="pl-2 text-xs font-light pb-1 text-secondary-foreground"
          htmlFor={id}
          {...descriptionProps}
        />
      ) : null}

      <Popover open={open}>
        <input
          name={inputProps.name}
          value={date?.toISOString() ?? ""}
          hidden
          readOnly
        />
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={inputProps.disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
            onClick={() => setOpen(!open)}
          >
            {date ? format(date, "PP") : <span>Pick a date</span>}
            <MdOutlineCalendarMonth className="ml-auto h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className=" w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown"
            selected={date}
            onSelect={(date) => {
              if (date) setDate(date);
              setOpen(false);
            }}
            fromYear={new Date().getFullYear() - 80}
            toYear={new Date().getFullYear()}
            disabled={
              disableFutureDate
                ? (date) => date > new Date() || date < new Date("1900-01-01")
                : undefined
            }
          />
        </PopoverContent>
      </Popover>
      <div className="min-h-[20px] px-4 pb-1 pt-0">
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
};

export default DatePicker;
