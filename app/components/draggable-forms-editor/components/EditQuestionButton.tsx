import { useContext } from "react";
import { Button } from "~/components/ui/button.tsx";
import { AppContext } from "~/store/appContext";
import { FormStateTypes } from "~/store/formReducer";
import { QuestionStateTypes } from "~/store/questionReducer";
import { cn } from "~/utils/shadcn.utils";

import { EditorTypeEnum } from "~/utils/types";
import { DraggableFormContext } from "../store/draggableFormContext";
import { AreaType } from "../types";

interface FormInputProps {
  id?: string;
  className?: string;
}

const EditQuestionButton = ({ id, className }: FormInputProps) => {
  const { dispatch: appDispatch } = useContext(AppContext);
  const { state } = useContext(DraggableFormContext);

  const handleOpenEditor = () => {
    if (!state.formState.selectedControl) return;
    //use the selected Control from the draggable state
    // console.log(state.formState.selectedControl?.field);
    appDispatch({
      type: QuestionStateTypes.fieldDefinition,
      payload: {
        fieldDefinition: {
          ...state.formState.selectedControl?.field,
          formId: state.formState.selectedForm?.id || "",
          area: AreaType.CLIENT_QUESTIONNAIRE,
        },
      },
    });

    appDispatch({
      type: FormStateTypes.showEditor,
      payload: {
        showEditor: EditorTypeEnum.QUESTION,
      },
    });
  };

  return (
    <>
      <div className={cn("flex flex-col w-full my-px", className)}>
        <div className="flex flex-row w-full items-baseline">
          <Button
            variant="secondary"
            className="ml-auto shadow-sm px-2 py-0 h-6 text-xs font-normal mr-[3px]"
            onClick={handleOpenEditor}
          >
            Edit Question...
          </Button>
        </div>
      </div>
    </>
  );
};
export default EditQuestionButton;
