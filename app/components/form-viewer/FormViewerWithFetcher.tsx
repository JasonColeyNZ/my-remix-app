import {
  FormProvider,
  getFormProps,
  getInputProps,
  useForm,
} from "@conform-to/react";
import { useFetcher } from "@remix-run/react";
import type { ReactElement } from "react";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import type { AnyZodObject, Schema, ZodTypeAny } from "zod";
import { AppContext } from "~/store/appContext.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import type { FormDefinition } from "../draggable-forms-editor/types.ts";
import FormRows from "./FormRows.tsx";
import { formViewerIntent } from "./formViewerSchema.ts";
import FormHeader, {
  BackButton,
  SaveButton,
} from "../form-header/FormHeader.tsx";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

interface FormViewerProps {
  dataSchema: Schema extends ZodTypeAny ? AnyZodObject : null;
  formDefinition: FormDefinition;

  defaultValues: any;
  customDataForm?: boolean;
  title?: string;
  subtitle?: string;
  objectName?: string;
  buttonsTop?: boolean;
  onAddClick?: () => void;
  backButtonLabel?: string;
  onBackClick?: () => void;
  fullHeight?: boolean;
  clientId?: string;
  topSummary?: ReactElement;
  onSuccess?: (data: any) => void;
  // action?: any;
  actionUrl: string;
  minWidth?: string;
  minHeight?: string;
  skipPost?: boolean;
}

const FormViewerWithFetcher = ({
  dataSchema,
  defaultValues,
  formDefinition,
  customDataForm = false,
  title = "",
  subtitle = "",
  buttonsTop = false,
  objectName = "",
  onAddClick,
  backButtonLabel = "",
  onBackClick,
  // onSave,
  fullHeight = false,
  clientId = "",
  topSummary,
  onSuccess,
  // action,
  actionUrl,
  minWidth,
  minHeight,
  skipPost = false,
}: FormViewerProps) => {
  // console.log("formDefinition", formDefinition);
  const formFetcher = useFetcher();
  // console.log("defaultValues", defaultValues);

  const intentRef = useRef<HTMLButtonElement>(null);
  const [saving, setSaving] = useState(false);
  const { state } = useContext(AppContext);
  const [internalDefaultValues, setInternalDefaultValues] =
    useState<any>(defaultValues);
  // console.log("FormViewerWithFetcher: defaultValues", defaultValues);
  const [form, fields] = useForm({
    id: "form-viewer-with-fetcher",
    constraint: getZodConstraint(dataSchema),
    defaultValue: defaultValues,
    lastResult: formFetcher.data,
    shouldValidate: "onBlur",
    // onSubmit: (event, { formData }) => {
    //   if (formData.get(conform.INTENT) === formViewerIntent.VALIDATE) {
    //     event.preventDefault();
    //     return;
    //   }
    // },
    onValidate({ formData }) {
      // console.log("onValidate: formData", formData);
      const parsed = parseWithZod(formData, { schema: dataSchema });
      if (parsed.status === "error")
        console.log("onValidate: formData.error", parsed.error);
      return parsed;
    },
  });

  //This will reset the form when the defaultValue changes
  //added 30/1/24 to fix issue with ProductList not updating on Service form
  useEffect(() => {
    if (internalDefaultValues.toString() === defaultValues.toString()) return;
    console.log("useEffect: defaultValues", defaultValues);
    setInternalDefaultValues(defaultValues);
    form.reset();
  }, [defaultValues, form, internalDefaultValues]);

  // const [formIdValue, setFormIdValue] = useState<string>(
  //   fields["formId"].initialValue as string,
  // );
  const onSaveClick = useCallback(async () => {
    // console.log("onSaveClick event");
    // console.log("onSaveClick: intentRef.current", intentRef.current);
    if (intentRef.current === null) return;
    intentRef.current.click();
    // //if ok get formData and send back to caller via onSave
    // // if (form.ref.current === null) return;
    // // const formData = new FormData(form.ref.current);
    // const parsed = parseWithZod(form.value, { schema: dataSchema });
    // if (parsed.status === "error") {
    //   setSaving(false);
    //   return;
    // }

    // // console.log("onSaveClick: formData", formData);
    // if (!skipPost) {
    //   formFetcher.submit(formData, {
    //     method: "POST",
    //     action: actionUrl,
    //   });
    // } else {
    //   onSuccess && onSuccess(formData);
    //   setSaving(false);
    // }
    // onSave && onSave(formData);
  }, [actionUrl, dataSchema, formFetcher, onSuccess, skipPost]);

  // useEffect(() => {
  //   //this will loop on formFetcher.data unless we set for formFetcher.data to null
  //   // console.log("formFetcher.state", formFetcher.state);
  //   if (formFetcher.state !== "idle") return;
  //   if (!formFetcher.data) return;
  //   if ((formFetcher.data as any).status === 200) {
  //     // console.log("useEffect, onSuccess");

  //     const submission = { ...(formFetcher.data as any).submission };
  //     formFetcher.data = null;
  //     onSuccess && onSuccess(submission);
  //     setSaving(false);
  //   }
  // }, [formFetcher, formFetcher.data, onSuccess]);

  // useEffect(() => {
  //   // console.log("FormViewer: formFetcher.data", formFetcher.data);
  //   if (formFetcher.data && (formFetcher.data as any).status !== "error") {
  //     // console.log("FormViewer: formFetcher.data.status === error");
  //     setSaving(false);
  //   }
  // }, [formFetcher.data, setSaving]);

  // useEffect(() => {
  //   // setIdValue(fields["id"].defaultValue);
  //   setFormIdValue(fields["formId"].initialValue);
  // }, [fields]);

  //This will reset the form when the defaultValue changes
  //added 30/1/24 to fix issue with ProductList not updating on Service form
  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <div className="w-full flex flex-col overflow-hidden">
      <FormProvider context={form.context}>
        <formFetcher.Form
          {...getFormProps(form)}
          method="POST"
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            flexDirection: "column",
            overflowY: "clip",
            paddingTop: title ? "0px" : "1rem",
            // minWidth: miniumumWidth ? `min-w-[${miniumumWidth}px]` : "unset",
            // minHeight: miniumumHeight ? `min-h-[${miniumumHeight}px]` : "unset",

            // overflow: "hidden",
          }}
        >
          {title && (
            <FormHeader
              showButtons={!state.formState.preview && buttonsTop}
              title={title}
              subTitle={subtitle}
              // formId={form.id}
              backButtonLabel={backButtonLabel}
              onAddClick={onAddClick}
              onSaveClick={onSaveClick}
              onBackClick={onBackClick}
              objectName={objectName}
              saving={saving}
              setSaving={setSaving}
              id={defaultValues?.id}
            />
          )}
          <div
            id="form-outer"
            // flex-1 here is important because of clipping of autocompletes
            className={cn(
              "flex flex-col w-full pl-4 pr-0 overflow-clip",
              minWidth && `min-w-${minWidth}`,
              minHeight && `min-h-${minHeight}`,
              // fullHeight && "flex-1",
            )}
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
                // customDataForm
                // ? formIdValue
                getInputProps(fields["id"], { type: "text" }).defaultValue ===
                "new"
                  ? formViewerIntent.CREATE
                  : formViewerIntent.UPDATE
              }
              onChange={() => {}}
              // hidden
              // readOnly
            />
            {clientId && (
              <input type="hidden" name="clientId" value={clientId} />
            )}
            <input {...getInputProps(fields["id"], { type: "hidden" })} />
            <input {...getInputProps(fields["formId"], { type: "hidden" })} />
            <FormRows
              formDefinition={formDefinition}
              fullHeight={fullHeight}
              topSummary={topSummary}
              // fields={fields}
              // form={form}
            />
            {/* test for vertical scroll */}
            {/* <div className="border-2 border-dashed border-gray-300 rounded-md m-[10px] mx-2 p-[25px]"></div> */}
            {!state.formState.preview && !buttonsTop && (
              <div className={"flex w-full"}>
                <div className="ml-auto p-3 pb-2 mb-2">
                  <SaveButton
                    // formId={form.props.id}
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
              </div>
            )}
          </div>
        </formFetcher.Form>
      </FormProvider>
    </div>
  );
};

export default FormViewerWithFetcher;
