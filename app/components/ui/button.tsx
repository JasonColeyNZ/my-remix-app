import { cn } from "#/app/utils/shadcn.utils.ts";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-[5px] text-sm font-light uppercase transition-colors focus-visible:outline-none  disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary border border-primary text-primary-foreground shadow hover:border-primary-9 hover:bg-primary-9 focus:bg-primary-9 focus:border-primary-9",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive-hover",
        success:
          "border bg-success border-success text-destructive-foreground shadow-sm hover:bg-success-hover hover:border-success-hover focus:bg-success-hover focus:border-success-hover",
        outline:
          "border border-input bg-transparent text-secondary-foreground shadow-sm border-gray-300 focus:border-primary-10 hover:border-gray-400 hover:text-foreground",
        secondary:
          "group text-primary-10 bg-primary-4 hover:text-primary-2 hover:bg-primary hover:shadow-md border border-primary-5 hover:border-primary",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        toggle:
          "bg-gray-100 hover:bg-gray-200 focus:bg-gray-200 focus:ring focus:ring-primary-4",
      },
      size: {
        default: "h-8 px-4 py-1",
        sm: "h-7 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
