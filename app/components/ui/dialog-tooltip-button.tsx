import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "~/store/appContext";
import { FormStateTypes } from "~/store/formReducer";
import { cn } from "~/utils/shadcn.utils";

// import { cn } from "~/utils/shadcn.utils";
// import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

interface PopoverDeleteProps {
  triggerChildren: React.ReactNode;
  children: React.ReactNode;
  tooltipChildren: React.ReactNode;
  open?: boolean;
  className?: string;
}

const DialogTooltipButton = ({
  children,
  triggerChildren,
  tooltipChildren,
  open,
  className,
}: PopoverDeleteProps) => {
  const [status, setStatus] = useState({ showDialog: false });
  const { dispatch } = useContext(AppContext);

  function handleClick() {
    setStatus({ showDialog: true });
  }

  function dialogClose() {
    setStatus({ showDialog: false });
  }

  useEffect(() => {
    if (open) {
      handleClick();
    } else {
      dialogClose();
    }
  }, [open]);
  // const triggerRef = useRef(null);
  return (
    <>
      <DialogComponent
        // width="250px"
        isModal={true}
        // cssClass={className}
        className={cn("!w-auto", className)}
        // height={"40em"}
        // target="#dialog-target"
        visible={status.showDialog}
        close={dialogClose}
        open={() => {
          dispatch({
            type: FormStateTypes.refreshRichtextEditor,
            payload: {
              refreshRichtextEditor: true,
            },
          });
          // console.log("open");
        }}
      >
        {children}
      </DialogComponent>

      <Tooltip delayDuration={1000}>
        {/* <Dialog
          open={open}
          // onOpenChange={(open) => {
          //   if (!open) {
          //     triggerRef.current?.focus();
          //   }
          // }}
        > */}
        <TooltipTrigger
          asChild
          // ref={triggerRef}
          onClick={(e) => e.preventDefault()}
          // onMouseDown={(e) => {
          //   e.preventDefault();
          // }}
        >
          {triggerChildren}
          {/* <DialogTrigger asChild>{triggerChildren}</DialogTrigger> */}
        </TooltipTrigger>
        {/* <DialogContent
            className={cn("p-0 ")}
            // tabIndex={0}
            // onOpenAutoFocus={(event) => {
            //   event.preventDefault();
            //   event.target && event.target.focus();
            // }}
            // onClick={(e) => {
            //   e.stopPropagation();
            // }}
          > */}

        {/* </DialogContent> */}

        <TooltipContent
        // onPointerDownOutside={(event) => {
        //   console.log("onPointerDownOutside: ", event);
        //   if (event.target === triggerRef.current) event.preventDefault();
        // }}
        >
          {tooltipChildren}
        </TooltipContent>
        {/* </Dialog> */}
      </Tooltip>
    </>
  );
};

export default DialogTooltipButton;
