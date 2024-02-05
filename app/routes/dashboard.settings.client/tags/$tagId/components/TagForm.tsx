import {
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";

import type { action, loader } from "../route.tsx";
import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { createTagSchema, updateTagSchema } from "../tagSchema.ts";
import { cn } from "~/utils/shadcn.utils.ts";
import { useEffect, useRef, useState } from "react";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import FormHeader from "~/components/form-header/FormHeader.tsx";
import { Button } from "~/components/ui/button.tsx";
import MailchimpTags from "./MailchimpTags.tsx";
import { IntegrationType } from "~/utils/types.ts";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";
import ColorPicker from "~/components/form-controls/color-picker/ColorPicker.tsx";

const TagForm = () => {
  // console.log("TagForm: Render");
  const { tag, integration } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  // console.log("tag: ", tag);
  const actionData = useActionData<typeof action>();
  const formRef = useRef<HTMLFormElement | null>(null);
  const intentRef = useRef<HTMLButtonElement>(null);
  const [saving, setSaving] = useState(false);
  const formFetcher = useFetcher();

  const onSaveClick = async () => {
    // console.log("onSaveClick event");
    if (intentRef.current === null) return;
    intentRef.current.click();
    // //if ok get formData and send back to caller via onSave
    if (form.ref.current === null) return;
    const formData = new FormData(form.ref.current);
    const parsed = parse(formData, {
      schema: tag.id === "new" ? createTagSchema : updateTagSchema,
    });
    if (Object.keys(parsed.error).length > 0) {
      console.log("onSaveClick: error", parsed.error);
      setSaving(false);
      return;
    }

    formFetcher.submit(formData, {
      method: "POST",
    });
  };

  useEffect(() => {
    // console.log("FormViewer: formFetcher.data", formFetcher.data);
    if (formFetcher.data && (formFetcher.data as any).status !== "error") {
      // console.log("FormViewer: formFetcher.data.status === error");
      setSaving(false);
      if (tag.id === "new") {
        navigate(`../${(formFetcher.data as any).data.id}`);
      }
    }
    formFetcher.data = undefined;
  }, [formFetcher, formFetcher.data, navigate, setSaving, tag.id]);

  const onAddClick = () => {
    navigate("../new");
    // console.log("onAddClick: ");
  };

  const [form, fields] = useForm({
    id: "tag-form",
    ref: formRef,
    defaultValue: tag,
    constraint: getFieldsetConstraint(
      tag.id === "new" ? createTagSchema : updateTagSchema,
    ),
    lastSubmission:
      actionData?.submission &&
      (actionData?.submission.payload.intent === formViewerIntent.UPDATE ||
        actionData?.submission.payload.intent === formViewerIntent.CREATE)
        ? actionData?.submission
        : undefined,

    onSubmit: (event, { formData }) => {
      // console.log("onSubmit: formData");
      if (formData.get(conform.INTENT) === formViewerIntent.VALIDATE) {
        // console.log("onSubmit: preventDefault");
        event.preventDefault();
        return;
      }
    },
    onValidate({ formData }) {
      return parse(formData, {
        schema: tag.id === "new" ? createTagSchema : updateTagSchema,
      });
    },
  });

  return (
    <SettingsRightCard>
      <>
        <FormHeader
          showButtons={true}
          title={"Client Tags"}
          subTitle={"Manage your client tags here"}
          formId={form.props.id}
          onAddClick={onAddClick}
          onSaveClick={onSaveClick}
          objectName={"Tag"}
          saving={saving}
          setSaving={setSaving}
          id={tag.id}
        />
        <div
          id="form-outer"
          className={cn("flex flex-col w-full h-full px-4 overflow-clip")}
        >
          <formFetcher.Form tabIndex={-1} method="POST" {...form.props}>
            <AuthenticityTokenInput />
            <div className={cn("flex gap-x-2 p-0 pt-4 wide:grid-cols-2 ")}>
              <button
                ref={intentRef}
                hidden
                name={conform.INTENT}
                value={formViewerIntent.VALIDATE}
              />
              <input type="hidden" {...conform.input(fields["id"])} />
              <input
                type="hidden"
                name="intent"
                value={
                  conform.input(fields["id"]).defaultValue === "new"
                    ? formViewerIntent.CREATE
                    : formViewerIntent.UPDATE
                }
                onChange={() => {}}
              />
              <div className="flex flex-col w-4/6">
                <TextInput
                  labelProps={{ children: "Tag Name" }}
                  inputProps={{
                    ...conform.input(fields.name),
                    autoFocus: true,
                  }}
                  errors={fields.name.errors}
                />
              </div>
              <div className="flex flex-col w-1/6">
                <ColorPicker
                  labelProps={{ children: "Color" }}
                  inputProps={{
                    ...conform.input(fields.color),
                    autoFocus: true,
                  }}
                  errors={fields.color.errors}
                />
              </div>
              <div className="flex flex-col w-1/6">
                <ColorPicker
                  labelProps={{ children: "Text Color" }}
                  inputProps={{
                    ...conform.input(fields.textColor),
                    autoFocus: true,
                  }}
                  errors={fields.textColor.errors}
                />
              </div>
            </div>
            <div className="mt-6">
              {integration?.integrationType === IntegrationType.MAILCHIMP && (
                <MailchimpTags />
              )}
            </div>
          </formFetcher.Form>
        </div>
        <div className="relative flex w-full bottom-2">
          <div className="ml-auto flex flex-col mr-2 gap-1">
            <div className="text-xs mt-0 text-destructive">
              {`${tag._count?.clients} client${
                tag._count &&
                (tag._count?.clients === 0 || tag._count?.clients > 1)
                  ? "s"
                  : ""
              } use${tag._count?.clients === 1 ? "s" : ""} this tag`}
            </div>

            <Button
              className="ml-auto uppercase font-light py-5 w-fit"
              variant="destructive"
            >
              Delete Tag
            </Button>
          </div>
        </div>
      </>
    </SettingsRightCard>
  );
};
export default TagForm;
