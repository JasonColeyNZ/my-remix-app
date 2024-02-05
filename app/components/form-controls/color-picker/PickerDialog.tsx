import { HexColorInput, HexColorPicker } from "react-colorful";
import { Button } from "~/components/ui/button";
import { MdOutlineClear } from "react-icons/md/index.js";

interface PickerDialogProps {
  value: string;
  onClick?: () => void;
  onChange: (color: any) => void;
}

const PickerDialog = ({ value, onChange, onClick }: PickerDialogProps) => {
  return (
    <>
      <HexColorPicker
        className="w-9 !important h-9 !important"
        color={value ? value : undefined}
        // onClick={(e) => {
        //   console.log(e);
        //   // onClick();
        // }}
        onChange={onChange}
      />
      <div className="flex p-1">
        <HexColorInput color={value ? value : undefined} onChange={onChange} />
        <Button onClick={() => onChange("")}>
          <MdOutlineClear />
        </Button>
      </div>
    </>
  );
};
export default PickerDialog;
