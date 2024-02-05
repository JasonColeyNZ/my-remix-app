import { useContext, useEffect, useState } from "react";
// import { toPascalCase } from "~/utils/strings.tsx";

import {
  AreaType,
  type FieldDefinition,
  type FieldOptionType,
} from "../types.ts";
import { cn } from "~/utils/shadcn.utils.ts";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group.tsx";
import { Label } from "../../ui/label.tsx";
import { Textarea } from "../../ui/textarea.tsx";
import { DraggableFormContext } from "../store/draggableFormContext.tsx";
import EditQuestionButton from "../components/EditQuestionButton.tsx";
import { useField } from "@conform-to/react";

interface RadioListProps {
  field: FieldDefinition;
  disabled?: boolean;
  fieldName: string;
  // prop: FieldProps<string>;
}

interface initialStateType {
  name: string | undefined;
  checked: boolean;
  value: number | string | undefined;
  textBoxName: string | undefined;
  textBoxValue: string | null | undefined;
}

const RadioList = ({ field, disabled, fieldName }: RadioListProps) => {
  //Checkbox State
  const [state, setState] = useState<initialStateType[]>([]);
  const [meta] = useField<string>(fieldName);
  const { state: draggableState } = useContext(DraggableFormContext);
  //const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  ///console.log("RadioList disabled: ", disabled);
  // const inputRef = useRef<HTMLInputElement>(null);
  // const { state } = useContext(AppContext);

  useEffect(() => {
    //   const sortedOptionArray: OptionType[] = field.options ? field.options : [];
    //   sortedOptionArray.sort((a, b) => {
    //     if (a.value && b.value) {
    //       return a.value - b.value;
    //     }
    //     return 0;
    //   });
    //   const checkValuesBinary = defaultValue
    //     ? Number(defaultValue?.split("|")[0]).toString(2)
    //     : "";

    const sortedState =
      field.options?.map((option, index) => {
        return {
          name: option.text || option.textBox,
          checked:
            // (prop.defaultValue &&
            //   option.value &&
            // checkValuesBinary[checkValuesBinary.length - index - 1] === "1") ||
            false,
          value: option.value,
          textBoxName: option.textBox,
          textBoxValue:
            option.textBox &&
            meta.initialValue &&
            meta.initialValue.split("|")[1],
        };
      }) || [];

    //   //rebuild state to match unsorted options
    const initialState = field.options
      ? field.options.map((option: FieldOptionType) => {
          const index = sortedState.findIndex(
            (sortedOption) =>
              sortedOption.name === option.text ||
              (sortedOption.textBoxName &&
                sortedOption.textBoxName === option.textBox),
          );
          return sortedState[index];
        })
      : [];

    //   //console.log("InitialState: ", initialState);

    setState(initialState);
  }, [meta.initialValue, field.options]);

  // const getStateValue = useMemo(() => {
  //   let result = "";
  //   for (let i = 0; i < state.length; i++) {
  //     if (state[i].checked) {
  //       result = state[i].value?.toString() || "";
  //       if (state[i].textBoxName) {
  //         result += `|${state[i].textBoxValue}`;
  //       }
  //       break;
  //     }
  //   }
  //   return result;
  // }, [state]);

  const handleRadioChange = (value: string) => {
    //update initial state
    const newArray = [...state];
    //Find option index.
    const index = newArray.findIndex(
      (option) => option.value?.toString() === value,
    );
    //the value will always be true as its an option button
    //uncheck all
    newArray.forEach((option) => {
      option.checked = false;
    });
    //check the one that was clicked
    newArray[index].checked = true;

    //lets check the state of the textbox
    // if (newArray[index].textBoxName) {
    //   inputRef.current && inputRef.current.removeAttribute("disabled");
    //   inputRef.current && inputRef.current.focus();
    // } else {
    //   inputRef.current && inputRef.current.setAttribute("disabled", "");
    // }
    //console.log("newArray", newArray);
    setState(newArray);
    //console.log("newArray", newArray);
    // setValue(field.id, getStateValue, { shouldDirty: true });
  };

  // const processTextBoxTarget = (target: EventTarget & HTMLInputElement) => {
  //   const newArray = [...state];
  //   //Find option index.
  //   const index = newArray.findIndex(
  //     (option) => option.textBoxName === target.id,
  //   );
  //   newArray[index].textBoxValue = target.value;

  //   setState(newArray);
  //   //console.log("newArray", newArray);
  // };

  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter" || event.key === "Tab") {
  //     processTextBoxTarget(event.currentTarget);
  //   }
  // };

  // const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
  //   processTextBoxTarget(event.currentTarget);
  // };
  // useEffect(() => {
  //   //console.log("FieldTextOptions inputValue: ", inputValue);
  //   setSaveForm(true);
  // }, [setSaveForm, inputValue]);

  // useEffect(() => {
  //   if (state.length === 0) return; //state is not ready
  //   setValue && setValue(field.id, getStateValue);
  // }, [field.id, getStateValue, setValue, state]);

  // return null;
  return (
    <div className="w-full">
      <div
        className={cn(
          "flex px-2",
          field.displayOptions?.textAlign === "left" ? "flex-row" : "flex-col",
        )}
      >
        <div className="flex-1 py-1 text-sm font-normal">
          <div>{field.label}</div>
          {field.description && (
            <div className="pl-2 pr-4 text-xs font-normal text-gray-600">
              {field.description}
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex flex-1 flex-wrap",
            field.displayOptions?.textAlign === "left"
              ? "flex-row"
              : "flex-col",
          )}
        >
          <RadioGroup
            className={cn(
              "gap-0 flex flex-1 flex-wrap",
              field.displayOptions?.textAlign === "top"
                ? "flex-row"
                : "flex-col",
            )}
            value={state.find((option) => option.checked)?.value?.toString()}
            onValueChange={handleRadioChange}
          >
            {state &&
              state.map((option, index) => {
                return (
                  option && (
                    <div
                      className={cn(
                        "flex w-full flex-col p-2",
                        field.displayOptions?.textAlign === "top" &&
                          `flex-${Math.trunc(
                            100 / (field.displayOptions?.displayColumns || 1),
                          )}`,
                      )}
                      key={index}
                    >
                      {/* {option.name !== "" && ( */}
                      <div className="w-full flex flex-row">
                        <>
                          <div className="flex w-6 items-center select-none">
                            <RadioGroupItem
                              value={option.value?.toString() ?? ""}
                              id={option.name}
                            />
                          </div>
                          <Label
                            htmlFor={option.name}
                            className="py-1 select-none"
                          >
                            {option.name}
                            {option.textBoxName && (
                              <span className="ml-2 text-xs font-normal text-gray-600">
                                {option.textBoxName}
                              </span>
                            )}
                          </Label>
                        </>
                      </div>
                      {/* )} */}
                      <div>
                        {option.textBoxName && (
                          <div className="flex flex-row ml-6 py-0 overflow-y-auto select-none items-baseline">
                            {/* <Label
                              htmlFor={option.textBoxName}
                              className="px-1 whitespace-nowrap select-none cursor-pointer"
                            >
                              {option.textBoxName}
                            </Label> */}
                            <Textarea
                              className="mr-1"
                              id={option.textBoxName}
                              disabled={!option.checked || disabled}
                              // variant={preview ? "outlined" : "filled"}
                              // defaultValue={option.textBoxValue}
                              // label={toPascalCase(option.textBoxName)}
                              // sx={{ ml: 2 }}
                              // inputRef={inputRef}
                              //{...register(option.textBoxName)}
                              // onChange={(e) => {
                              //   //console.log("e", e);
                              //   setValue(option.textBoxName, e.target.value, {
                              //     shouldDirty: true,
                              //   });
                              // }}
                              // inputProps={{
                              //   onKeyDown: handleKeyDown,
                              //   onBlur: handleBlur,
                              // }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                );
              })}
          </RadioGroup>
        </div>
      </div>
      {draggableState.formState.selectedControl?.id === field.id &&
        draggableState.formState.selectedForm?.area ===
          AreaType.CLIENT_QUESTIONNAIRE && (
          <EditQuestionButton className="my-0 absolute top-1 right-0 " />
        )}
    </div>
  );
};
export default RadioList;
