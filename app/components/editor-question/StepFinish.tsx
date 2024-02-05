import { cn } from "~/utils/shadcn.utils";
import type { StepProps } from "./EditorQuestion";

const StepFinish = ({ visible }: StepProps) => {
  return <div className={cn(visible ? "flex" : "hidden")}>Finish</div>;
};

export default StepFinish;
