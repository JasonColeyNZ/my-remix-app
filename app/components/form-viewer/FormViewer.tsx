import { type FetcherWithComponents } from "@remix-run/react";
import type { ReactElement } from "react";
import { useEffect, useRef } from "react";
import type { AnyZodObject, Schema, ZodTypeAny } from "zod";
import { floatingToolbarClassName } from "~/ui/floating-toolbar.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import type { FormDefinition } from "../draggable-forms-editor/types.ts";
import { Separator } from "../ui/separator.tsx";
import FormRows from "./FormRows.tsx";
import { formViewerIntent } from "./formViewerSchema.ts";
import {
  AddButton,
  BackButton,
  SaveButton,
} from "../form-header/FormHeader.tsx";
import { getFormProps, getInputProps, useField } from "@conform-to/react";

interface FormViewerProps {
  dataSchema: Schema extends ZodTypeAny ? AnyZodObject : null;
  formDefinition: FormDefinition;
  fetcher: FetcherWithComponents<any>;
  customDataForm?: boolean;
  title?: string;
  subtitle?: string;
  objectName?: string;
  floatingToolbar?: boolean;
  buttonsTop?: boolean;
  onAddClick?: () => void;
  backButtonLabel?: string;
  onBackClick?: () => void;
  onSave?: (data: FormData) => void;
  fullHeight?: boolean;
  objectId?: string;
  objectIdName?: string;

  topSummary?: ReactElement;
  saving?: boolean;
  setSaving?: (saving: boolean) => void;
}

const FormViewer = ({
  dataSchema,
  formDefinition,
  fetcher,
  customDataForm = false,
  title = "",
  subtitle = "",
  floatingToolbar = true,
  buttonsTop = false,
  objectName = "",
  onAddClick,
  backButtonLabel = "",
  onBackClick,
  onSave,
  fullHeight = false,
  objectId = "",
  objectIdName = "",
  topSummary,
  saving = false,
  setSaving = () => {},
}: FormViewerProps) => {
  // const myFetcher = useFetcher();
  // const formFetcher = fetcher;
  const intentRef = useRef<HTMLButtonElement>(null);
  const [metaFormId, form] = useField<string>("formId");
  const [metaId] = useField<string>("id");

  // const [idValue, setIdValue] = useState<string>(fields["id"].defaultValue);
  // const [formIdValue, setFormIdValue] = useState<string>(
  //   fields["formId"].defaultValue,
  // );

  const onSaveClick = async () => {
    // console.log("onSaveClick event");
    // console.log("onSaveClick: intentRef.current", intentRef.current);
    if (intentRef.current === null) return;
    intentRef.current.click();
    // if (form.ref.current === null || !onSave) return;
    // const formData = new FormData(form.ref.current);
    // const parsed = parseWithZod(formData, { schema: dataSchema });
    // if (Object.keys(parsed.error).length > 0) {
    //   setSaving(false);
    //   return;
    // }
    // onSave && onSave(formData);
  };

  useEffect(() => {
    if (fetcher.data && fetcher.data.status !== "error") {
      // console.log("FormViewer: formFetcher.data.status === error");
      setSaving(false);
    }
  }, [fetcher.data, setSaving]);

  // useEffect(() => {
  //   // setIdValue(fields["id"].defaultValue);
  //   setFormIdValue(fields["formId"].defaultValue);
  // }, [fields]);

  return (
    <>
      {title && buttonsTop && (
        <div className="flex flex-col mb-1">
          <div className="flex flex-row p-4 pb-2 items-center">
            <div className="text-lg font-medium">
              {title}
              <span className="text-xs font-normal pl-3">{subtitle}</span>
            </div>
            {buttonsTop && (
              <div className="flex flex-row ml-auto gap-3">
                {onAddClick && (
                  <AddButton
                    objectName={objectName}
                    formId={form.id}
                    onClick={onAddClick}
                    id={objectId}
                  />
                )}
                <SaveButton
                  form={form}
                  onSaveClick={onSaveClick}
                  type={onSave ? "button" : "submit"}
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
      )}
      <div
        id="form-outer"
        className={cn("flex p-4 overflow-hidden", fullHeight && "flex-1")}
      >
        <fetcher.Form
          tabIndex={-1}
          {...getFormProps(form)}
          method="POST"
          style={{
            display: "flex",
            flex: "1 1 0",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          {/* <button
            ref={intentRef}
            hidden
            name={conform.INTENT}
            value={formViewerIntent.VALIDATE}
          /> */}
          <input
            type="hidden"
            // {...conform.input(fields["intent"])}
            name="intent"
            value={
              metaId.initialValue === "new"
                ? formViewerIntent.CREATE
                : formViewerIntent.UPDATE
            }
            onChange={() => {}}
            // hidden
            // readOnly
          />
          {objectId && (
            <input type="hidden" name={objectIdName} value={objectId} />
          )}
          <input {...getInputProps(metaId, { type: "hidden" })} />
          <input {...getInputProps(metaFormId, { type: "hidden" })} />
          <FormRows
            formDefinition={formDefinition}
            fullHeight={fullHeight}
            topSummary={topSummary}
            // fields={fields}
            // form={form}
          />
        </fetcher.Form>

        {!buttonsTop && (
          <div
            className={
              floatingToolbar ? floatingToolbarClassName : "flex w-full ml-auto"
            }
          >
            <SaveButton form={form} type="submit" />
          </div>
        )}
      </div>
    </>
  );
};

// const SaveButton = ({
//   formId,
//   onSaveClick,
//   type,
//   saving,
//   setSaving,
// }: {
//   formId: string | undefined;
//   onSaveClick?: () => void;
//   type: "button" | "submit";
//   saving?: boolean;
//   setSaving?: (saving: boolean) => void;
// }) => {
//   return (
//     <Button
//       className="h-7 uppercase font-light px-5"
//       form={formId}
//       type="button" //{type}
//       disabled={saving}
//       onClick={() => {
//         // console.log("SaveButton: onClick");
//         setSaving && setSaving(true);
//         if (onSaveClick) onSaveClick();
//       }}
//     >
//       {saving && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
//       Save Changes
//     </Button>
//   );
// };

// const AddButton = ({
//   formId,
//   objectName,
//   onClick,
// }: {
//   formId: string | undefined;
//   objectName: string;
//   onClick?: () => void;
// }) => {
//   return (
//     <Button
//       className="ml-auto uppercase h-7 font-light px-5 bg-green-500 hover:bg-green-600 "
//       form={formId}
//       onClick={onClick}
//       type="button"
//     >
//       Add {objectName}
//     </Button>
//   );
// };

// const BackButton = ({
//   formId,
//   objectName,
//   onClick,
//   label,
//   saving,
// }: {
//   formId: string | undefined;
//   objectName: string;
//   onClick?: () => void;
//   label?: string;
//   saving?: boolean;
// }) => {
//   return (
//     <Button
//       className="ml-auto h-7 font-normal"
//       form={formId}
//       type="button"
//       disabled={saving}
//       variant="outline"
//       onClick={onClick}
//       // type="submit"
//     >
//       {label ? label : `Back to ${objectName}s`}
//     </Button>
//   );
// };

export default FormViewer;
