import { Link } from "@remix-run/react";
import type { ConditionalWrapperProps } from "~/utils/types.ts";

import { Button } from "../ui/button.tsx";

interface Props {
  url: string | null;
  boxClass?: string;
  buttonClass?: string;
  onClick?: (e: any) => void;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  color?: "inherit" | "primary" | "secondary" | "error" | "info" | "success";
  icon: React.ReactNode;
  title: string;
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children);

const DefaultButton = ({
  url,
  boxClass,
  buttonClass,
  size = "medium",
  onClick,
  disabled = false,
  color = "primary",
  icon,
  title,
}: Props) => {
  return (
    <ConditionalWrapper
      condition={!disabled}
      wrapper={(children: React.ReactNode) =>
        url ? (
          <Link to={url} prefetch="intent">
            {children}
          </Link>
        ) : (
          <>{children}</>
        )
      }
    >
      <div className={boxClass}>
        <Button
          type="submit"
          title={title}
          className={buttonClass}
          onClick={(e) => {
            e.stopPropagation();
            onClick && onClick(e);
          }}
          variant="ghost"
          color={color}
          disabled={disabled}
        >
          {icon}
        </Button>
      </div>
    </ConditionalWrapper>
  );
};
export default DefaultButton;
