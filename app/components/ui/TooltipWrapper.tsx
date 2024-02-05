import type { ReactElement } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TooltipWrapper = ({
  tooltip,
  children,
  asChild = true,
}: {
  tooltip: string;
  children: ReactElement;
  asChild?: boolean;
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipWrapper;
