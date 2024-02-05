import { useContext } from "react";
import { Button } from "~/components/ui/button.tsx";
import { AppContext } from "~/store/appContext";
import { FormStateTypes } from "~/store/formReducer";
import { cn } from "~/utils/shadcn.utils";

import { AreaType } from "../types";
import { EditorTypeEnum } from "~/utils/types";

interface FormInputProps {
  id?: string;
  className?: string;
}

const EditRichTextButton = ({ id, className }: FormInputProps) => {
  const { dispatch: appDispatch } = useContext(AppContext);

  const handleOpenEditor = () => {
    appDispatch({
      type: FormStateTypes.addRecordEditor,
      payload: {
        recordEditor: AreaType.CONTENTEDITOR,
      },
    });

    appDispatch({
      type: FormStateTypes.showEditor,
      payload: {
        showEditor: EditorTypeEnum.RICHTEXT,
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
            Edit Content...
          </Button>
        </div>
      </div>
    </>
  );
};
export default EditRichTextButton;
