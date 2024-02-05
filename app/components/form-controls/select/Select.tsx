// import type { FieldConfig } from "@conform-to/react";
// import { useInputEvent } from "@conform-to/react";
// import { useState } from "react";
import { Label } from "~/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

// import type { ListOfErrors } from "../ErrorList.tsx";
import ErrorList from "../ErrorList.tsx";
import { getInputProps, useField } from "@conform-to/react";

type SelectType = {
  // errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  // inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  // label: string;
  // props: FieldProps<string | string[]>;
  options: any[];
  labelName?: string;
  valueName?: string;
  fieldName: string;
};
// interface FieldProps<Schema> extends FieldConfig<Schema> {
//   error?: string;
// }

const SelectField = ({
  // inputProps,
  labelProps,
  descriptionProps,
  // errors,
  options,
  labelName = "text",
  valueName = "value",
  fieldName,
}: SelectType) => {
  const [meta] = useField<string>(fieldName);

  // const [internalValue, setInternalValue] = useState<string | undefined>(
  //   meta.initialValue,
  // );

  // const control = useInputControl(meta);

  // const [value, setValue] = useState(props.defaultValue ?? "");

  // const fallbackId = useId();
  // const id = inputProps.id ?? fallbackId;
  // const errorId = errors?.length ? `${id}-error` : undefined;

  // const [internalValue, setInternalValue] = useState<
  //   string | string[] | undefined
  // >(props.defaultValue);
  // const shadowInputRef = useRef<HTMLInputElement>(null);
  // const control = useInputEvent({
  //   ref: shadowInputRef,
  //   onReset: () => setInternalValue(props.defaultValue ?? ""),
  // });

  // const getValueName = (value: string) => {
  //   const option = options.filter((o) => o.id === value)[0];
  //   return option?.name ?? "";
  // };

  // const handleChange = (event: SelectChangeEvent) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setInternalValue(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value,
  //   );
  // };

  // useEffect(() => {
  //   setInternalValue(props.defaultValue ?? "");
  // }, [props]);

  return (
    <div className="grid w-full items-center gap-1">
      <Label htmlFor={meta.id} {...labelProps}>
        {labelProps.children}
        <span className="text-destructive">{meta.required ? "*" : ""}</span>
      </Label>
      {descriptionProps && descriptionProps.children ? (
        <Label
          className="pl-2 text-xs font-light"
          htmlFor={meta.id}
          {...descriptionProps}
        />
      ) : null}
      <Select
      // {...inputProps}
      // value={selectedForm?.id}
      // onValueChange={(value) => {
      //   // console.log("value: ", value);
      //   navigate(value);
      // }}
      >
        <div className="relative">
          <div
            className={cn(
              "relative cursor-default overflow-hidden bg-white text-left " +
                " w-full sm:text-sm rounded-md ml-[-1px] p-[1px]",
            )}
          >
            <SelectTrigger
              id={meta.id}
              className={cn(
                //these are from base ShadCn input
                "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 " +
                  "text-sm shadow-sm transition-colors file:border-0 file:bg-transparent " +
                  "file:text-sm file:font-medium placeholder:text-muted-foreground " +
                  "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring " +
                  "disabled:cursor-not-allowed disabled:opacity-50" +
                  //these are from our input
                  " focus:outline-none  " +
                  "focus:ring-primary-5 focus:border-primary-5 block w-full sm:text-sm" +
                  " border-gray-300 ",
              )}
            >
              <SelectValue
                {...getInputProps(meta, { type: "text" })}
                // placeholder="Select a form"
              >
                {meta.initialValue}{" "}
              </SelectValue>
            </SelectTrigger>
          </div>
        </div>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option[valueName]} value={option[valueName]}>
              {option[labelName]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* <FormControl fullWidth> */}
      {/* <InputLabel shrink htmlFor="select-multiple-native">
          {label}
        </InputLabel>
        <input
          name={props.name}
          value={JSON.stringify(internalValue) ?? ""}
          hidden
          readOnly
        /> */}

      {/* <MuiSelect
          label={label}
          multiple={props.multiple}
          onFocus={control.focus}
          onBlur={control.blur}
          onChange={handleChange}
          value={internalValue}
          renderValue={(selected) => (
            <div className="flex flex-wrap gap-1">
              {Array.isArray(internalValue)
                ? internalValue.map((value) => (
                    <Chip key={value} label={getValueName(value)} />
                  ))
                : getValueName(internalValue ?? "")}
            </div>
          )}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </MuiSelect> */}
      {/* </FormControl> */}
      <div className="min-h-[20px] px-4 py-0">
        {meta.errorId ? (
          <ErrorList id={meta.errorId} errors={meta.errors} />
        ) : null}
      </div>
    </div>
  );
};

export default SelectField;
