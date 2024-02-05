// import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog.tsx";

interface Props {
  children: any;
  showTitle?: boolean;
  title?: string;
  width: number;
  height: number;
  fullScreen?: boolean;
  sx?: any;
  open?: boolean;
  onClose?: () => void;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, ...other } = props;
  // console.log("BootstrapDialogTitle", children);
  return (
    // <Dialog
    //   defaultOpen={true}
    //   onOpenChange={(open) => {
    //     onClose ? onClose() : null;
    //     // if (!open) navigate("/");
    //   }}
    // >
    //   <DialogPortal>
    //     <DialogOverlay className="DialogOverlay" />
    //     <DialogContent style={{ maxWidth: "400px", maxHeight: "450px" }}>
    <DialogHeader>
      <DialogTitle>{children}</DialogTitle>
    </DialogHeader>
    //       {children}
    //     </DialogContent>
    //   </DialogPortal>
    // </Dialog>

    // <DialogTitle
    //   sx={{ m: 0, p: 2 }}
    //   bgcolor={"appbar.main"}
    //   color={"primary.textContrast"}
    //   {...other}
    // >
    //   {children}
    //   {onClose ? (
    //     <IconButton
    //       aria-label="close"
    //       onClick={onClose}
    //       sx={{
    //         position: "absolute",
    //         right: 8,
    //         top: 8,
    //         color: (theme) => theme.palette.grey[500],
    //       }}
    //     >
    //       <CloseIcon.default />
    //     </IconButton>
    //   ) : null}
    // </DialogTitle>
  );
}

// const Transition = forwardRef(function Transition(
//   props: TransitionProps & {
//     children: React.ReactElement;
//   },
//   ref: React.Ref<unknown>,
// ) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });
function Modal({
  children,
  showTitle = false,
  title = "",
  width,
  height,
  fullScreen = false,
  sx,
  open = true,
  onClose,
}: Props) {
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) {
          onClose ? onClose() : null;
        }
      }}
      //onClose={onClose}
      // fullScreen={fullScreen}
      // TransitionComponent={Transition}
      // maxWidth={false}
      // sx={[
      //   fullScreen && { height: "calc(100vh - 32)", width: "calc(100vw - 32)" },
      //   sx,
      // ]}
    >
      <DialogContent
        hideClose={!onClose}
        style={{
          width: width > 0 ? width : "auto",
          height: height > 0 ? height : "auto",
        }}
      >
        {showTitle && (
          <BootstrapDialogTitle id="customized-dialog-title">
            {title}
          </BootstrapDialogTitle>
        )}
        <div
        // sx={[
        //   {
        //     p: 1,
        //     pt: 0,
        //     display: "flex",
        //     flexDirection: "column",
        //     height: "100%",
        //   },
        //   !fullScreen && height !== 0 && { height: height },
        //   !fullScreen && width !== 0 && { width: width },
        // ]}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
