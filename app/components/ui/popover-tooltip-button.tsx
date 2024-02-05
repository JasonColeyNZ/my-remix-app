import { PopoverArrow } from "@radix-ui/react-popover";
import { cn } from "~/utils/shadcn.utils";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface PopoverDeleteProps {
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
  tooltipChildren: React.ReactNode;
  open?: boolean;
}

const PopoverTooltipButton = ({
  children,
  triggerChildren,
  tooltipChildren,
  open,
}: PopoverDeleteProps) => {
  // const triggerRef = useRef(null);
  return (
    <Tooltip delayDuration={1000}>
      <Popover
        open={open}
        // onOpenChange={(open) => {
        //   if (!open) {
        //     triggerRef.current?.focus();
        //   }
        // }}
      >
        <TooltipTrigger
          asChild
          // ref={triggerRef}
          onClick={(e) => e.preventDefault()}
          // onMouseDown={(e) => {
          //   e.preventDefault();
          // }}
        >
          <PopoverTrigger asChild>{triggerChildren}</PopoverTrigger>
        </TooltipTrigger>
        <PopoverContent
          className={cn("p-0")}
          // onOpenAutoFocus={(event) => {
          //   event.preventDefault();
          //   event.target && event.target.focus();
          // }}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {children}
          <PopoverArrow />
        </PopoverContent>

        <TooltipContent
        // onPointerDownOutside={(event) => {
        //   console.log("onPointerDownOutside: ", event);
        //   if (event.target === triggerRef.current) event.preventDefault();
        // }}
        >
          {tooltipChildren}
        </TooltipContent>
      </Popover>
    </Tooltip>
  );
};

export default PopoverTooltipButton;
