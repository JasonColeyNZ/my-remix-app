import { useContext } from "react";
import FormLabel from "~/components/typography/FormLabel.tsx";
import FormLeftLabel from "~/components/typography/FormLeftLabel.tsx";
import { Input } from "~/components/ui/input.tsx";
import { Textarea } from "~/components/ui/textarea.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import { DraggableFormStateTypes } from "../../store/draggableFormReducer.ts";
import { DraggableFormContext } from "../../store/draggableFormContext.tsx";

interface FormInputProps {
  id: string;
  label: string;
  text: string;
  multiline?: boolean;
  minRows?: number;
  labelClass?: string;
}

const FormInput = ({
  id,
  label,
  text,
  multiline = false,
  minRows = 1,
  labelClass,
}: FormInputProps) => {
  const { state, dispatch } = useContext(DraggableFormContext);

  const onChange = (value: string) => {
    //use the reducer to update the selectedControl
    //same as adding an option
    dispatch({
      type: DraggableFormStateTypes.updateSelectedControlProperty,
      payload: {
        updateSelectedControlProperty: {
          id,
          value,
        },
      },
    });
    //updateNestedProperty(state.formState.selectedControl, id, value);
    //console.log("FormInput.onChange: ", id, value);
  };
  return (
    <>
      <div className={"flex flex-col w-full mb-[1px]"}>
        <div className="flex flex-row w-full items-baseline">
          <FormLeftLabel label={label} className="labelClass" />
          {!multiline && state.formState.editMode && (
            <Input
              className={cn(
                "px-1 text-xs font-normal text-gray-900 mr-px",
                "rounded-none shadow-none border-none bg-primary-4 h-5",
              )}
              name={id}
              value={text !== "undefined" ? text : ""}
              onChange={(e) => {
                onChange && onChange(e.target.value);
              }}
            />
          )}
          {multiline && state.formState.editMode && (
            <Textarea
              className={cn(
                "px-1 py-1 text-xs font-normal text-gray-900 mr-px",
                "rounded-none shadow-none border-none bg-primary-4",
              )}
              rows={minRows}
              style={{ height: `${minRows * 1.25}rem` }}
              name={id}
              value={text !== "undefined" ? text : ""}
              onChange={(e) => {
                onChange && onChange(e.target.value);
              }}
              aria-rowcount={minRows}
            />
          )}
          {!state.formState.editMode && <FormLabel text={text} />}
        </div>
      </div>
    </>
  );
};
export default FormInput;
