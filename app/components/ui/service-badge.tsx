import { cn } from "~/utils/shadcn.utils";
import { Badge } from "./badge";

const ServiceBadge = ({
  name,
  color,
  textColor,
  className,
}: {
  name: string;
  color: string;
  textColor: string;
  className?: string;
}) => {
  return (
    <Badge
      style={{ backgroundColor: color, color: textColor }}
      className={cn("p-px px-1 font-medium", className)}
    >
      <span
      // style={{
      //   background: "inherit",
      //   backgroundClip: "text",
      //   WebkitBackgroundClip: "text",
      //   filter: "invert(0.5) grayscale(0.7)",
      //   color: "black",

      //   mixBlendMode: "difference",
      //   WebkitFilter: "invert(0.5) grayscale(0.7)",
      // }}
      >
        {name}
      </span>
    </Badge>
  );
};

export default ServiceBadge;
