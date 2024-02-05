import { cn } from "~/utils/shadcn.utils";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import type { FormMetadata } from "@conform-to/react";
import { useField } from "@conform-to/react";

interface FormHeaderProps {
  title: string | null;
  subTitle: string | ReactNode;
  showButtons: boolean;
  onAddClick?: () => void;
  onSaveClick?: () => void;
  onBackClick?: () => void;
  objectName: string;
  backButtonLabel?: string;
  saving?: boolean;
  setSaving?: (saving: boolean) => void;
  id: string;
}

const FormHeader = ({
  title,
  subTitle,
  showButtons,
  objectName,
  backButtonLabel,
  onAddClick,
  onSaveClick,
  onBackClick,
  saving,
  setSaving,
  id,
}: FormHeaderProps) => {
  const [, form] = useField("id");

  return (
    <div className={cn("flex flex-col mb-1  ")}>
      <div className="flex flex-row p-4 pb-2 items-center">
        {title && (
          <h1 className="text-lg font-medium select-none">
            {title}
            <span className="text-xs font-normal pl-3">{subTitle}</span>
          </h1>
        )}
        {!title && subTitle && (
          <div className="text-xs font-normal">{subTitle}</div>
        )}
        {showButtons && (
          <div className="flex flex-row ml-auto gap-3">
            {onAddClick && (
              <AddButton
                objectName={objectName}
                formId={form.id}
                onClick={onAddClick}
                id={id}
              />
            )}
            <SaveButton
              form={form}
              onSaveClick={onSaveClick}
              type={"button"}
              saving={saving}
              // setSaving={setSaving}
            />
            {onBackClick && (
              <BackButton
                objectName={objectName}
                formId={form.id}
                onClick={onBackClick}
                label={backButtonLabel}
                saving={saving}
              />
            )}
          </div>
        )}
      </div>
      <Separator />
    </div>
  );
};

export const SaveButton = ({
  // formId,
  form,
  onSaveClick,
  type,
  saving, // setSaving,
}: {
  form: FormMetadata<any, string[]>;
  onSaveClick?: () => void;
  type: "button" | "submit";
  saving?: boolean;
  // setSaving?: (saving: boolean) => void;
}) => {
  return (
    <Button
      className="mx-1 h-7 font-light uppercase py-4"
      form={form.id}
      type="submit" //{type}
      disabled={!form.dirty}
      onClick={() => {
        form.validate();
        // if (form.valid) {
        //   // form.submit();
        // }
        //  setSaving && setSaving(true);
        //  if (onSaveClick) onSaveClick();
      }}
    >
      {saving && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
      Save Changes
    </Button>
  );
};

export const AddButton = ({
  formId,
  objectName,
  onClick,
  id,
}: {
  formId: string | undefined;
  objectName: string;
  onClick?: () => void;
  id: string;
}) => {
  return (
    <Button
      variant="success"
      className="ml-auto uppercase h-7 font-light py-4"
      form={formId}
      disabled={id === "new"}
      color={"primary"}
      onClick={onClick}
      type="button"
    >
      Add {objectName}
    </Button>
  );
};

export const BackButton = ({
  formId,
  objectName,
  onClick,
  label,
  saving,
}: {
  formId: string | undefined;
  objectName: string;
  onClick?: () => void;
  label?: string;
  saving?: boolean;
}) => {
  return (
    <Button
      className="mx-1 h-7 py-4 uppercase font-light"
      form={formId}
      type="button"
      disabled={saving}
      variant="outline"
      onClick={onClick}
      // type="submit"
    >
      {label ? label : `Back to ${objectName}s`}
    </Button>
  );
};

export default FormHeader;
