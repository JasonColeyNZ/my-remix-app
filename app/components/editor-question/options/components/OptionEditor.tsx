import { useContext, useEffect, useMemo, useState } from "react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { AppContext } from "~/store/appContext";
import type { FieldOptionType } from "../../../draggable-forms-editor/types";
import { Button } from "../../../ui/button";
import { QuestionStateTypes } from "~/store/questionReducer";
import { MdOutlineDeleteOutline } from "react-icons/md/index.js";
import TooltipWrapper from "../../../ui/TooltipWrapper";

const OptionEditor = () => {
  const { state, dispatch } = useContext(AppContext);

  const blankOption: FieldOptionType = useMemo(() => {
    return {
      text: "",
      value: -1,
      textBox: "",
      sortOrder: -1,
    };
  }, []);
  const [option, setOption] = useState<FieldOptionType>(
    state.questionState.checkedOptionValue !== 0
      ? (state.questionState.fieldDefinition.options &&
          state.questionState.fieldDefinition.options.find(
            (option) =>
              option.sortOrder === state.questionState.editFieldOptionIndex,
          )) ||
          blankOption
      : blankOption,
  );

  useEffect(() => {
    setOption(
      state.questionState.editFieldOptionIndex !== -1
        ? (state.questionState.fieldDefinition.options &&
            state.questionState.fieldDefinition.options.find(
              (option) =>
                option.sortOrder === state.questionState.editFieldOptionIndex,
            )) ||
            blankOption
        : blankOption,
    );
  }, [
    state.questionState.fieldDefinition.options,
    state.questionState.editFieldOptionIndex,
    blankOption,
  ]);

  // if (state.questionState.editFieldOptionIndex === -1) {
  //   return null;
  // }

  const handleUpdateOption = () => {
    dispatch({
      type: QuestionStateTypes.updateOption,
      payload: {
        updateOption: option,
      },
    });
  };

  const handleDeleteOption = () => {
    dispatch({
      type: QuestionStateTypes.deleteOption,
      payload: {
        deleteOption: option,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 flex-1 bg-primary-8 shadow-card rounded-md p-2">
      <div className="flex">
        <div className="font-medium">Option Editor</div>
        <div className="flex ml-auto gap-2">
          <TooltipWrapper tooltip="Save changes to this option">
            <Button
              size="sm"
              onClick={handleUpdateOption}
              disabled={option.sortOrder === -1}
            >
              Update Option
            </Button>
          </TooltipWrapper>
          <TooltipWrapper tooltip="Delete this option">
            <Button
              size="sm"
              className="px-1 bg-destructive"
              disabled={option.sortOrder === -1}
              onClick={handleDeleteOption}
            >
              <MdOutlineDeleteOutline className="w-5 h-5" />
            </Button>
          </TooltipWrapper>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex flex-col flex-1 gap-1">
          <Label htmlFor="label" className="text-xs px-1 whitespace-nowrap">
            Label
          </Label>
          <Input
            id="label"
            disabled={option.sortOrder === -1}
            className="w-full bg-white"
            value={option?.text ?? ""}
            onChange={(e) => {
              setOption({ ...option, text: e.target.value });
            }}
          />
        </div>
        {/* <div className="flex flex-col w-16 gap-1">
          <Label htmlFor="value" className="text-xs px-1 whitespace-nowrap">
            Value
          </Label>
          <Input
            id="value"
            type="number"
            disabled={option.index === -1}
            className="bg-white"
            value={option.value !== -1 ? option?.value : ""}
            onChange={(e) => {
              setOption({
                ...option,
                value: parseInt(e.target.value),
              });
            }}
          />
        </div> */}
        <div className="flex flex-col flex-1 gap-1">
          <Label htmlFor="textBox" className="text-xs px-1 whitespace-nowrap">
            Textbox Label
          </Label>
          <Input
            id="textBox"
            disabled={option.sortOrder === -1}
            className="bg-white"
            value={option?.textBox ?? ""}
            onChange={(e) => {
              setOption({ ...option, textBox: e.target.value });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default OptionEditor;
