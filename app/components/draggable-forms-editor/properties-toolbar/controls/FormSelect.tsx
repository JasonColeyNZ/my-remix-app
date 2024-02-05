import { useContext, useMemo } from "react";
import FormLabel from "~/components/typography/FormLabel.tsx";
import FormLeftLabel from "~/components/typography/FormLeftLabel.tsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import type { OptionType } from "~/utils/types.ts";

import { DraggableFormContext } from "../../store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "../../store/draggableFormReducer.ts";

interface FormSelectProps {
  id: string;
  label: string;
  value: string | number | boolean;
  options: OptionType[];
  disabled?: boolean;
}

const FormSelect = ({
  id,
  label,
  value,
  options,
  disabled = false,
}: FormSelectProps) => {
  // console.log("options", options);
  const { state, dispatch } = useContext(DraggableFormContext);

  const realLabel =
    options?.find((option: OptionType) => option.value === value)?.text ||
    value;
  const onChange = (value: string) => {
    dispatch({
      type: DraggableFormStateTypes.updateSelectedControlProperty,
      payload: {
        updateSelectedControlProperty: {
          id,
          value,
        },
      },
    });
  };

  const defaultControlValue = useMemo(() => {
    // console.log("text", text);
    const optionsFound = options.filter((option) => option.value === value);
    if (optionsFound.length > 0) {
      return optionsFound[0].value;
    }
    return undefined;
    // return (
    //   options.filter((option) => option.value + "" === text + "")[0].value ||
    //   undefined
    // );
  }, [options, value]);

  return (
    <>
      <div className="flex flex-col w-100 mb-[1px]">
        <div className="flex flex-row w-full flex-[1_1_20px] items-center">
          <FormLeftLabel label={label} />
          {state.formState.editMode && (
            <Select
              value={defaultControlValue?.toString()}
              onValueChange={(value) => {
                // console.log("value", value);
                //  const value = option?.value;
                onChange && onChange(value);
              }}
            >
              <SelectTrigger
                className={cn(
                  "px-1 text-xs font-normal text-gray-900 mr-px",
                  "rounded-none shadow-none border-none bg-primary-4 h-5",
                )}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option, index) => (
                    <SelectItem
                      className="text-xs"
                      key={index}
                      value={option.value.toString()}
                    >
                      {option.text}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            // <Autocomplete
            //   id={id}
            //   options={options || []}
            //   isOptionEqualToValue={(option, value) =>
            //     option.value + "" === value.value + ""
            //   }
            //   renderInput={(params) => (
            //     <TextField
            //       {...params}
            //       variant={"outlined"}
            //       label={""}
            //       required={false}
            //       InputLabelProps={{
            //         shrink: true,
            //       }}
            //     />
            //   )}
            //   getOptionLabel={(option) => {
            //     if (!option) {
            //       return "";
            //     }
            //     return option.text;
            //   }}
            //   autoHighlight={true}
            //   autoComplete={true}
            //   multiple={false}
            //   blurOnSelect={true}
            //   disabled={disabled}
            //   disableCloseOnSelect={false}
            //   disableClearable={true}
            //   //filterSelectedOptions={true}
            //   value={defaultControlValue}
            //   onChange={(event, option) => {
            //     //console.log("option", option);
            //     const value = option?.value;
            //     onChange && onChange(value);
            //   }}
            //   // defaultValue={text}
            //   sx={{
            //     lineHeight: "20px",
            //     "& .MuiAutocomplete-input": {
            //       pt: "0px !important",
            //       pb: "0px !important",
            //       height: "18px !important",
            //       px: "0 !important",
            //     },
            //     "& .MuiAutocomplete-inputRoot": {
            //       pt: "0px !important",
            //       pb: "0px !important",
            //       fontSize: "12px",
            //       fontWeight: 500,
            //       borderRadius: "2px",
            //       pr: "24px !important",
            //       backgroundColor: "#f2f2f2",
            //       my: "1px !important",
            //     },
            //     "& .MuiAutocomplete-endAdornment": {
            //       right: "2px",
            //       pt: "0px !important",
            //       pb: "0px !important",
            //       fontSize: "12px",
            //       fontWeight: 500,
            //       borderRadius: "2px",
            //     },
            //     "& fieldset": {
            //       border: "none !important",
            //     },
            //   }}
            //   renderOption={(props: any, option: OptionType) => {
            //     return (
            //       <div
            //         className="font-size-[13px] font-medium text-[rgba(0,0,0,0.7)]"
            //         {...props}
            //         // sx={{
            //         //   // fontSize: "13px",
            //         //   lineHeight: "20px",
            //         //   "& .MuiAutocomplete-option": {
            //         //     pt: "0px !important",
            //         //     pb: "0px !important",
            //         //     height: "20px !important",
            //         //   },
            //         //   "& .MuiAutocomplete-option[data-focus='true']": {
            //         //     pt: "0px !important",
            //         //     pb: "0px !important",
            //         //     height: "20px !important",
            //         //     backgroundColor: "rgba(0,0,0,0.1)",
            //         //   },
            //         // }}
            //       >
            //         {option.text}
            //       </div>
            //     );
            //   }}
            // />
          )}
          {!state.formState.editMode && (
            <FormLabel text={realLabel ? realLabel.toString() : ""} />
          )}
        </div>
      </div>
    </>
  );
};
export default FormSelect;
