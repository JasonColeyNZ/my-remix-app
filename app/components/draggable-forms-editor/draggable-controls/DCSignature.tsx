import { useContext, useEffect, useState } from "react";
import { AppContext } from "~/store/appContext.tsx";

import EditorTextField from "./DCTextSkeleton.tsx";
import type { FieldDefinition } from "../types.ts";
import SignatureModal from "../../signature-modal/SignatureModal.tsx";
import Button from "~/components/button/Button.tsx";

interface DraggableFieldProps {
  type?: string;
  field: FieldDefinition;
  disabled?: boolean;
  // prop: FieldName<string>;
  fieldName: string;
}
const Signature = ({
  type,
  field,
  disabled,
  fieldName,
}: DraggableFieldProps) => {
  const [showModal, setShowModal] = useState(false);
  const [saveData, setSaveData] = useState<string>();
  const { state } = useContext(AppContext);
  useEffect(() => {
    // console.log("saveData", saveData);
  }, [saveData]);

  if (state.formState.formEditor) {
    return (
      <EditorTextField
        labelProps={{
          children: field.shortLabel ? field.shortLabel : field.label,
        }}
        // inputProps={{
        //   ...conform.input(prop),
        // }}
        field={field}
      />
    );
  }

  return (
    <div className="flex flex-col w-full pb-1">
      <div className="h-[102px] border-2 border-gray-300">
        {saveData && (
          <img style={{ height: "100px" }} src={saveData} alt="signature" />
        )}
      </div>
      <Button
        size="small"
        sx={{ marginLeft: "auto" }}
        disabled={disabled || !state.formState.preview}
        labelDefault={"Sign"}
        fullWidth={false}
        url={null}
        onClick={() => setShowModal(true)}
      />
      <SignatureModal
        show={showModal}
        setShowModal={setShowModal}
        saveData={saveData}
        setSaveData={setSaveData}
      />
    </div>
  );
};
export default Signature;
