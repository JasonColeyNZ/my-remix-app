import { useContext } from "react";
import FormSectionHeader from "~/components/typography/FormSectionHeader.tsx";

import { DraggableFormContext } from "../../store/draggableFormContext.tsx";
import FormSelect from "../controls/FormSelect.tsx";
import {
  columnOptions,
  textAlignOptions,
} from "../controls/select-constants.ts";
import OptionsList from "./OptionsList.tsx";
import { FieldType } from "../../types.ts";

const Options = () => {
  const { state } = useContext(DraggableFormContext);
  // const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // const [selectedOption, setSelectedOption] = useState<FieldOptionType | null>(null);

  // useEffect(() => {
  //   if (!selectedField) return;
  //   const selectedOption = selectedField.options.filter((option: any) => {
  //     return option.value === selectedIndex;
  //   });
  //   setSelectedOption(selectedOption[0]);
  // }, [selectedIndex, selectedField, setSelectedOption])

  // const onUpdateFormField = () => {
  //   if (selectedControl && selectedControl.field) {
  //     const updatedControl = {
  //       ...selectedControl,
  //       ...formField,
  //       field: { ...selectedControl.field, ...formField?.field },
  //     };
  //     updateSelectedControl && updateSelectedControl(updatedControl);
  //   }
  //   //onClose();
  // };

  // const setOptions = (options: FieldOptionType[]) => {
  //   if (!selectedField) return;
  //   const newField = {
  //     ...selectedField,
  //     options: options,
  //   };
  //   setSelectedField(newField);
  // };

  // const updateOptions = (option: FieldOptionType) => {
  //   if (!selectedField) return;
  //   const newOptions = selectedField.options.map((o: FieldOptionType) => {
  //     if (o.value === option.value) {
  //       return option;
  //     }
  //     return o;
  //   });
  //   const newField = {
  //     ...selectedField,
  //     options: newOptions,
  //   };
  //   setSelectedField(newField);

  //   //setOptionsValue(JSON.stringify(newOptions));
  // };

  if (
    !state.formState.selectedControl ||
    !state.formState.selectedControl.field ||
    state.formState.selectedControl.field.fieldType !== FieldType.SELECT
  )
    return null;
  return (
    <>
      <FormSectionHeader title={"Options"} paddingTop="10px">
        <div className="self-end text-[10px] font-light !pb-1 !pl-5">
          {state.formState.editMode ? "- select option to edit" : ""}
        </div>
      </FormSectionHeader>
      <OptionsList />
      {state.formState.selectedControl.field.fieldType === FieldType.SELECT && (
        <div className="mt-1">
          <FormSelect
            label="Text Align"
            id="field.displayOptions.textAlign"
            value={
              state.formState.selectedControl.field.displayOptions?.textAlign +
              ""
            }
            options={textAlignOptions}
          />
          <FormSelect
            label="Columns"
            id="field.displayOptions.displayColumns"
            disabled={
              state.formState.selectedControl.field.displayOptions
                ?.textAlign !== "top"
            }
            value={
              state.formState.selectedControl.field.displayOptions
                ?.displayColumns + ""
            }
            options={columnOptions}
          />
        </div>
      )}
    </>
  );
};
export default Options;
