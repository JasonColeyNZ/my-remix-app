import { Button } from "../ui/button.tsx";

interface Props {
  label?: string;
  labelSubmitting?: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "ghost"
    | "outline"
    | "link";
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success";
  loading?: boolean;
  fullWidth?: boolean;
  sx?: any;
  onClick?: () => void;
}

export const SubmitButton = ({
  label,
  labelSubmitting,
  variant = "default",
  color = "primary",
  loading = false,
  fullWidth = true,
  sx,
  onClick,
}: Props) => {
  //const isSubmitting = useIsSubmitting();
  const labelDefaultSubmitting = labelSubmitting || "Submitting";
  const labelDefault = label || "Submit";
  return (
    <div className="grid w-full items-center gap-3">
      <Button
        // loading={loading}
        // fullWidth={fullWidth}
        color={color}
        type={onClick ? "button" : "submit"}
        variant={variant}
        // sx={sx}
        onClick={onClick}
      >
        {false ? labelDefaultSubmitting : labelDefault}
      </Button>
    </div>
  );
};
