import React, { useContext } from "react";
import { FieldType } from "~/components/draggable-forms-editor/types";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { AppContext } from "~/store/appContext";

const TextItem = () => {
  const { state } = useContext(AppContext);
  return (
    <div>
      {state.questionState.fieldDefinition.fieldType ===
        FieldType.TEXTINPUT && (
        <div className="flex flex-col">
          <Input />
        </div>
      )}
      {state.questionState.fieldDefinition.fieldType === FieldType.TEXTAREA && (
        <div className="flex flex-col">
          <Textarea />
        </div>
      )}
    </div>
  );
};

export default TextItem;
