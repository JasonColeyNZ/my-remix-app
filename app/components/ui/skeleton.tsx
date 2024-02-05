import { cn } from "~/utils/shadcn.utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-primary-4", className)}
      {...props}
    />
  );
}

export { Skeleton };
