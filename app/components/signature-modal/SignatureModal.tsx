// import { useRef } from "react";

// import { default as canvasDraw } from "react-canvas-draw";
// import Button from "../button/Button.tsx";
import Modal from "../modal/Modal.tsx";
import { SignatureComponent } from "@syncfusion/ej2-react-inputs";
import { Button } from "../ui/button.tsx";

// import { SubmitButton } from "../submitButton/SubmitButton.tsx";

interface SignatureModalProps {
  saveData?: any;
  setSaveData?: (value: any) => void;
  title?: string;
  show?: boolean;
  setShowModal?: (show: boolean) => void;
}

const SignatureModal = ({
  title = "Sign Document",
  saveData,
  setSaveData,
  show,
  setShowModal,
}: SignatureModalProps) => {
  // const ref = useRef<null>(null);

  return (
    <Modal
      open={show}
      width={0}
      height={0}
      showTitle={true}
      title={title}
      onClose={() => {
        setShowModal && setShowModal(false);
      }}
    >
      <>
        <div>Sign here</div>
        <SignatureComponent></SignatureComponent>

        <Button
        // labelDefault={"Clear"}
        // url={null}
        // color={"primary"}
        // variant="contained"
        // onClick={() => ref && ref.current && ref.current.clear()}
        // boxSx={{ mr: "auto" }}
        >
          Clear
        </Button>
      </>
      {/* 
      <DialogActions>
        <Button
          labelDefault={"Clear"}
          url={null}
          color={"primary"}
          // variant="contained"
          // onClick={() => ref && ref.current && ref.current.clear()}
          boxSx={{ mr: "auto" }}
        />
        <Button
          labelDefault={"Cancel"}
          url={null}
          onClick={() => {
            setShowModal && setShowModal(false);
          }}
          boxSx={{ mr: 1 }}
        />

        <SubmitButton
          //loading={isSubmitting}
          label={"Add Signature"}
          labelSubmitting={"Adding Signature..."}
          color="success"
          // variant="contained"
          fullWidth={false}
          onClick={() => {
            const base64 =
              ref.current &&
              (ref.current as any).canvasContainer.childNodes[1].toDataURL();

            setSaveData && setSaveData(base64);

            setShowModal && setShowModal(false);
          }}
        />
      </DialogActions> */}
    </Modal>
  );
};
export default SignatureModal;
