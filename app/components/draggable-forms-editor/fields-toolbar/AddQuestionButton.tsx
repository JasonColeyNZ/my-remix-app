import { useContext } from "react";
import { Button } from "~/components/ui/button";
import { BlankFieldDefinition } from "~/const";
import { AreaType, DisplayTextAlignment, FieldType } from "../types";
import { AppContext } from "~/store/appContext";
import { QuestionStateTypes } from "~/store/questionReducer";
import { FormStateTypes } from "~/store/formReducer";
import { EditorTypeEnum } from "~/utils/types";
import { DraggableFormContext } from "../store/draggableFormContext";

const AddQuestionButton = () => {
  const { dispatch } = useContext(AppContext);
  const { state } = useContext(DraggableFormContext);

  const handleOpen = () => {
    //make a blank field
    const field = BlankFieldDefinition;
    field.fieldType = FieldType.SELECT;

    //we need the formId and Area
    field.formId = state.formState.selectedForm?.id || "";
    field.area = AreaType.CLIENT_QUESTIONNAIRE;

    field.controlType = undefined;
    field.displayOptions
      ? (field.displayOptions.textAlign = DisplayTextAlignment.LEFT)
      : (field.displayOptions = { textAlign: DisplayTextAlignment.LEFT });
    field.displayOptions.displayColumns = 1;

    dispatch({
      type: QuestionStateTypes.fieldDefinition,
      payload: {
        fieldDefinition: field,
      },
    });

    dispatch({
      type: FormStateTypes.showEditor,
      payload: {
        showEditor: EditorTypeEnum.QUESTION,
      },
    });
  };

  return (
    <div className="flex">
      <Button
        className="self-end text-xs h-6 px-2 ml-auto mr-1 mb-1"
        variant="secondary"
        onClick={handleOpen}
      >
        Add Question
      </Button>
    </div>
  );
};

export default AddQuestionButton;
