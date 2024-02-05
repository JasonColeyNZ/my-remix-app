import { NavLink } from "@remix-run/react";
import type { CSSProperties } from "react";
import type { ConditionalWrapperProps } from "~/utils/types.ts";

import { Button } from "../ui/button.tsx";

interface Props {
  loading?: boolean;
  labelDefault: string;
  labelDefaultLoading?: string;
  url: string | null;
  classNames?: string;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "ghost"
    | "outline"
    | "link";
  aStyle?: CSSProperties;
  boxSx?: any;
  sx?: any;
  fullWidth?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  lowercase?: boolean;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  color?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disableNavigation?: boolean;
  name?: string;
  value?: string;
  type?: "submit" | "reset" | "button";
}

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: ConditionalWrapperProps) => (condition ? wrapper(children) : children);

const DefaultButton = ({
  labelDefault,
  labelDefaultLoading,
  loading,
  url,
  variant = "default",
  aStyle = {},
  classNames,
  boxSx,
  sx,
  size = "medium",
  fullWidth = true,
  onClick,
  disabled = false,
  color = "primary",
  startIcon,
  endIcon,
  disableNavigation,
  name,
  value,
  type = "button",
}: Props) => {
  return (
    <ConditionalWrapper
      condition={!disabled && !disableNavigation}
      wrapper={(children: React.ReactNode) =>
        url ? (
          <NavLink to={url} style={aStyle} prefetch="intent">
            {children}
          </NavLink>
        ) : (
          <>{children}</>
        )
      }
    >
      <div className="grid w-full items-center">
        <Button
          className={`${variant === "link" ? "h-2" : "h-9"} ${classNames}`}
          // style={ `color: ${color? color : "primary"}`}
          // disableRipple={true}
          // disableFocusRipple={true}
          tabIndex={-1}
          // startIcon={startIcon}
          // endIcon={endIcon}
          // fullWidth={fullWidth}
          //type="submit"
          variant={variant}
          // sx={sx}
          onClick={onClick}
          // size={size}
          //color={color}
          disabled={disabled}
          // loading={loading}
          name={name}
          value={value}
          type={type}

          // color={color ? color : "primary"}
          //endIcon={null}
          //loadingPosition="end"
          //loadingPosition="start"
          //loadingIndicator={labelDefaultLoading}
        >
          {loading ? `${labelDefaultLoading}` : labelDefault}
        </Button>
      </div>
    </ConditionalWrapper>
  );
};
export default DefaultButton;
