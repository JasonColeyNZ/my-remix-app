import { useField } from "@conform-to/react";
import { useContext, useEffect, useState } from "react";
import { cn } from "~/utils/shadcn.utils.ts";

// import EditorTextField from "../draggable-forms-editor/controls/EditorTextField.tsx";
// import { getIcon } from "../draggable-forms-editor/toolbar/controls.tsx";
import {
  AreaType,
  type FieldDefinition,
  type FieldOptionType,
} from "../types.ts";
import { Label } from "../../ui/label.tsx";
import { DraggableFormContext } from "../store/draggableFormContext.tsx";
import { Checkbox } from "../../ui/checkbox.tsx";
import EditQuestionButton from "../components/EditQuestionButton.tsx";

interface initialStateType {
  name: string | undefined;
  checked: boolean;
  value: number | string | undefined;
  textBoxName: string | undefined;
  textBoxValue: string | null | undefined;
}

interface FieldTextOptionsProps {
  field: FieldDefinition;
  disabled?: boolean;
  fieldName: string;
  // prop: FieldProps<string>;
}
const CheckList = ({
  field,
  disabled,
  fieldName, // prop,
}: //
FieldTextOptionsProps) => {
  // const [hiddenValue, setHiddenValue] = useState<string>("");
  // const [arrayValue, setArrayValue] = useState<string[] | undefined>(
  //   inputProps.defaultValue && typeof inputProps.defaultValue === "string"
  //     ? inputProps.defaultValue.split("|")
  //     : [],
  // );
  const [state, setState] = useState<initialStateType[]>([]);
  const [meta] = useField<string>(fieldName);
  const { state: draggableState } = useContext(DraggableFormContext);

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

  // const { state } = useContext(AppContext);
  // const fallbackId = useId();
  // const id = field.id ?? fallbackId;
  // const errorId = errors?.length ? `${id}-error` : undefined;
  // useEffect(() => {
  //   setHiddenValue(JSON.stringify(arrayValue));
  //   setValue &&
  //     setValue(fieldData.id, JSON.stringify(arrayValue), { shouldDirty: true });
  //   //console.log("control", control);
  // }, [arrayValue, control, fieldData.id, setValue]);

  // if (
  //   state.formState.formEditor &&
  //   !state.formState.recordEditors.includes(field.area)
  // ) {
  //   return (
  //     <EditorTextField
  //       labelProps={{
  //         children: field.label,
  //       }}
  //       inputProps={{
  //         ...conform.input(prop),
  //       }}
  //       dropDown={true}
  //       fieldType={field.type}
  //     />
  //   );
  // }

  return (
    <div className="w-full" id="checklist-outer">
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
          <div
            className={cn(
              "gap-0 flex flex-1 flex-wrap",
              field.displayOptions?.textAlign === "top"
                ? "flex-row"
                : "flex-col",
            )}
          >
            {state &&
              state.map((option, index) => {
                return (
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
                    <div className="w-full flex flex-row">
                      <div className="flex w-6 items-center select-none">
                        <Checkbox
                          value={option.value?.toString() ?? ""}
                          id={option.name}
                          // id={id}
                          // aria-invalid={errorId ? true : undefined}
                          // aria-describedby={errorId}
                          // className="ml-1 self-center"
                          // // className={cn(
                          // //   "shadow-sm focus:ring-primary-5 focus:border-primary-5",
                          // //   "block sm:text-sm border-gray-300 rounded-md",
                          // //   inputProps.className,
                          // // )}
                          // name={inputProps.name}
                          // autoFocus={inputProps.autoFocus}
                          // // autoComplete={inputProps.autoComplete}
                          // // type={inputProps.type}
                          // // value={internalValue?.toString()}
                          // required={inputProps.required}
                          // disabled={inputProps.disabled}
                          // placeholder={inputProps.placeholder}
                          // onChange={(e) => {
                          //   // setInternalValue(e.target.value);
                          //   // inputProps.onChange?.(e);
                          // }}
                        />
                      </div>
                      <Label htmlFor={option.name} className="py-1 select-none">
                        {option.name}
                        {/* {option.textBoxName && (
                        <span className="ml-2 text-xs font-normal text-gray-600">
                          {option.textBoxName}
                        </span>
                      )} */}
                      </Label>
                      {/* <Checkbox
                        //name={fieldData.id}
                        value={option.text}
                        checked={arrayValue.includes(option.text)}
                        onChange={(event, checked) => {
                          // console.log("checked", checked);
                          // console.log(
                          //   "event.target.value",
                          //   event.target.value
                          // );
                          //console.log("field.value", field.value);
                          if (checked) {
                            const val = [...arrayValue, event.target.value];
                            //setHiddenValue(JSON.stringify(val));
                            //setValue(fieldData.id, JSON.stringify(val));
                            setArrayValue(val);
                          } else {
                            const val = arrayValue.filter(
                              (value: string) => value !== event.target.value,
                            );
                            //setHiddenValue(JSON.stringify(val));
                            //setValue(fieldData.id, JSON.stringify(val));
                            setArrayValue(val);
                          }
                        }}
                        size="small"
                        disabled={disabled}
                      /> */}
                    </div>
                    {/* <div className="table-cell">
                    <div>{option.text}</div>
                  </div> */}
                  </div>
                );
              })}
          </div>
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
export default CheckList;
