import { useContext, useState } from "react";

import { DraggableFormContext } from "../../store/draggableFormContext.tsx";
import AddOptionButton from "./AddOptionButton.tsx";
import OptionItem from "./OptionItem.tsx";

const OptionsList = () => {
  const { state } = useContext(DraggableFormContext);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  //  const [selectedOption, setSelectedOption] = useState<FieldOptionType | null>(null);

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

  if (!state.formState.selectedControl) return null;
  return (
    <>
      <div className="mt-px">
        {
          state.formState.editMode && (
            // state.formState.selectedControl.controlSource === "custom" && (
            <div className="">
              <AddOptionButton />
            </div>
          )
          // )
        }
        {state.formState.selectedControl.field.options &&
          state.formState.selectedControl.field.options.map(
            (option, index: number) => (
              <OptionItem
                key={option.sortOrder}
                index={index}
                option={option}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
              />
            ),
          )}
      </div>
    </>
  );
};
export default OptionsList;
