import { useId } from "react";
import { Label } from "~/components/ui/label.tsx";

import type { ListOfErrors } from "../ErrorList.tsx";
import ErrorList from "../ErrorList.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import { Switch } from "~/components/ui/switch.tsx";

type SwitchFieldType = {
  errors?: ListOfErrors;
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLButtonElement>;
  autoValue?: boolean;
  hideError: boolean;
  labelClassName?: string;
};

const SwitchField = ({
  inputProps,
  labelProps,
  descriptionProps,
  errors,
  hideError = false,
  labelClassName,
  autoValue,
}: SwitchFieldType) => {
  // console.log("inputProps: ", inputProps);
  // console.log("autoFocus: ", inputProps.autoFocus);
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  // const [internalValue, setInternalValue] = useState<boolean>(
  //   inputProps.defaultChecked ?? false,
  // );

  // useEffect(() => {
  //   if (autoValue === undefined) return;
  //   console.log("autoValue: ", autoValue);
  //   // setInternalValue(autoValue);
  //   // inputProps.checked = autoValue as boolean;
  // }, [autoValue, inputProps]);
  const { type, ...rest } = inputProps;

  return (
    <div className="flex w-full p-2">
      <Switch
        id={id}
        aria-invalid={errorId ? true : undefined}
        aria-describedby={errorId}
        className="ml-1 self-center"
        {...rest}
        // type="button"
      />

      {labelProps && labelProps.children && (
        <Label
          htmlFor={id}
          {...labelProps}
          className={cn("ml-2 self-center", labelClassName)}
        >
          {labelProps.children}
          <span className="text-destructive">
            {inputProps.required ? "*" : ""}
          </span>
        </Label>
      )}
      {descriptionProps && descriptionProps.children ? (
        <Label
          className="pl-2 text-xs font-light pb-1"
          htmlFor={id}
          {...descriptionProps}
        />
      ) : null}
      {!hideError && (
        <div className="min-h-[20px] px-4 py-0 pt-1">
          {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
        </div>
      )}
    </div>
  );
};

export default SwitchField;
