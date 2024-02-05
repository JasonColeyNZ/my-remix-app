import { useContext, useEffect } from "react";
import { cn } from "~/utils/shadcn.utils";
import type { StepProps } from "./EditorQuestion";
import { AppContext } from "~/store/appContext";
import ControlPreview from "./components/ControlPreview";

const StepValidation = ({ visible, setNextEnabled }: StepProps) => {
  const { state } = useContext(AppContext);
  useEffect(() => {
    if (visible) {
      setNextEnabled && setNextEnabled(true);
    }
  }, [setNextEnabled, visible]);

  return (
    <div className={cn(visible ? "flex flex-col" : "hidden")}>
      <div className="flex flex-col">
        Validation Step
        <ControlPreview />
      </div>
    </div>
  );
};

export default StepValidation;
