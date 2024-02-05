import { cn } from "~/utils/shadcn.utils.ts";

interface FormLeftLabelProps {
  label: string;
  className?: string;
}

const FormLeftLabel = ({ label, className }: FormLeftLabelProps) => {
  return (
    <div className="pr-1 select-none flex-[0_0_68px] flex self-start pt-0.5">
      {/* userSelect: "none",
          pr: "4px",
          flex: "0 0 68px",
          display: "flex",
          alignSelf: "flex-start",
          pt: "2px", */}
      <p
        className={cn(
          "text-right ml-auto text-xs text-[11px] font-normal text-[rgba(0,0,0,0.5)] pb-[1px]",
          className,
        )}

        // sx={[
        //   {
        //     textAlign: "right",
        //     ml: "auto",
        //     fontSize: "11px",
        //     fontWeight: 400,
        //     useSelect: "none",
        //     color: "rgba(0,0,0,0.5)",
        //     pb: "1px !important",
        //   },
        //   ...(Array.isArray(sx) ? sx : [sx]),
        // ]}
      >
        {label}
      </p>
    </div>
  );
};
export default FormLeftLabel;
