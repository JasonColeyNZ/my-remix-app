import { cn } from "~/utils/shadcn.utils";

const DraggableControl = ({ icon, label }: { icon: any; label: string }) => {
  return (
    <>
      <div
        className={cn(
          "flex flex-auto m-1 p-2 pl-1 ",
          "text-xs font-medium select-none text-gray-400",
          "border-2",
        )}
        //  sx={{
        //   lineHeight: "1.4375em",
        //   letterSpacing: "0.00938em",
        //   whiteSpace: "nowrap",
        //   backgroundColor: "rgba(0, 0, 0, 0.12)",
        //   borderTopLeftRadius: "4px",
        //   borderTopRightRadius: "4px",
        //   borderBottom: "1px solid rgba(0, 0, 0, 0.42)",
        //   width: "100%",
        //   alignItems: "center",
        //}}
        //*/}
      >
        <div
          className=""
          // sx={{
          //   transform: "scale(0.65)",
          //   color: theme.palette.primary.main + " !important",
          // }}
        >
          {icon}
        </div>
        <div className="whitespace-normal">{label}</div>
      </div>
    </>
  );
};

export default DraggableControl;
