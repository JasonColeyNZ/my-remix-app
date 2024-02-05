import { useContext } from "react";
import { IoMdClose } from "react-icons/io/index.js";
import { Button } from "~/components/ui/button.tsx";

// import theme from "~/mui/theme.ts";
import { DraggableFormContext } from "../../store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "../../store/draggableFormReducer.ts";
import type { FieldOptionType } from "../../types.ts";
import FormInput from "../controls/FormInput.tsx";
import FormSectionHeader from "~/components/typography/FormSectionHeader.tsx";

interface OptionEditorProperties {
  index: number;
  option: FieldOptionType;
}
const OptionEditor = ({ index, option }: OptionEditorProperties) => {
  const { dispatch } = useContext(DraggableFormContext);
  return (
    <div className="flex flex-col w-full rounded-sm p-1 pt-0.5">
      <div className="flex flex-row w-full h-7 items-center mb-1 bg-primary-10 pl-1">
        <FormSectionHeader
          title={"Option Editor"}
          textClass="text-white"
          hrHidden={true}
          children={
            <Button
              variant="ghost"
              className="ml-auto h-5 px-1 py-1 mr-px text-white rounded-none hover:bg-primary-2"
              onClick={() => {
                dispatch({
                  type: DraggableFormStateTypes.editFieldOptionIndex,
                  payload: { editFieldOptionIndex: null },
                });
              }}
              title="Close Editor"
            >
              <IoMdClose />
            </Button>
          }
        />
      </div>
      <FormInput
        id={`field.options.[${index}].text`}
        label="Label"
        // multiline={true}
        text={option.text}
        labelClass="text-white"
      />
      <FormInput
        id={`field.options.[${index}].value`}
        label="Value"
        // multiline={true}
        text={option.value + ""}
        labelClass="text-white"
      />
      <FormInput
        id={`field.options.[${index}].textBox`}
        label="Text label"
        // multiline={true}
        text={option.textBox ?? ""}
        labelClass="text-white"
      />
    </div>
  );
};

export default OptionEditor;
