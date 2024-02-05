import { useContext, useRef, useState } from "react";
// import type { z } from "zod";
import { cn } from "~/utils/shadcn.utils.ts";

import type { FieldDefinition } from "../draggable-forms-editor/types.ts";
// import { Label } from "../ui/label.tsx";
// import { Textarea } from "../ui/textarea.tsx";
import type { ImageFieldsetSchemaType } from "./uploadImageValidation.ts";
import ErrorList from "../form-controls/ErrorList.tsx";
import { AppContext } from "~/store/appContext.tsx";
import { Skeleton } from "../ui/skeleton.tsx";
import { Button } from "../ui/button.tsx";
import { getInputProps, useField } from "@conform-to/react";

interface UploadButtonProps {
  disabled?: boolean;
  defaultValue: any;
  field: FieldDefinition;
  fieldName: string;
  // config: FieldName<z.infer<typeof ImageFieldsetSchema>>;
}

export default function UploadButtonViewer({
  field,
  fieldName, // config,
}: UploadButtonProps) {
  return <ImageChooser fieldName={fieldName} field={field} />;
}

function ImageChooser({
  field,
  fieldName,
}: {
  field: FieldDefinition;
  fieldName: string;
  // config: FieldName<z.infer<typeof ImageFieldsetSchema>>;
}) {
  // return null;
  // const ref = useRef<HTMLFieldSetElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [meta] = useField<ImageFieldsetSchemaType>(fieldName);
  const fields = meta.getFieldset(); // useFieldset(ref, config);
  // console.log("fields", fields.publicUrl.defaultValue);
  const existingImage = Boolean(fields.publicUrl.initialValue);
  const [previewImage, setPreviewImage] = useState<string | null>(
    existingImage ? fields.publicUrl.initialValue || null : null,
  );
  const { state } = useContext(AppContext);
  const editor =
    (state.formState.formEditor ||
      state.formState.preview ||
      field.displayOptions?.readOnly) &&
    !state.formState.recordEditors.includes(field.area);

  return (
    <>
      <div className="flex gap-4">
        <div>
          {editor && <Skeleton className={cn("h-32 w-32 m-2")} />}
          {!editor && (
            <>
              <div className="flex gap-3">
                <div className="w-32">
                  <div className="relative h-32 w-32">
                    <label
                      htmlFor={fields.file.id}
                      className={cn("group absolute h-32 w-32 rounded-lg", {
                        "bg-accent opacity-40 focus-within:opacity-100 hover:opacity-100":
                          !previewImage,
                        "cursor-pointer focus-within:ring-4": !existingImage,
                      })}
                    >
                      {previewImage ? (
                        <div className="relative">
                          <img
                            src={previewImage}
                            alt={""}
                            className="h-32 w-32 rounded-lg object-cover"
                          />
                          {existingImage &&
                          fields.publicUrl.initialValue ===
                            previewImage ? null : (
                            <div className="pointer-events-none absolute -right-0.5 -top-0.5 rotate-12 rounded-sm bg-secondary px-2 py-1 text-xs text-secondary-foreground shadow-md">
                              new
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex h-32 w-32 items-center justify-center rounded-lg border border-muted-foreground text-4xl text-muted-foreground">
                          ➕
                        </div>
                      )}
                      <input
                        {...getInputProps(fields.publicUrl, { type: "hidden" })}
                      />
                      <input
                        {...getInputProps(fields.storedFileName, {
                          type: "hidden",
                        })}
                      />

                      {existingImage ? (
                        <input
                          {...getInputProps(fields.id, {
                            type: "hidden",
                          })}
                        />
                      ) : null}
                      <input
                        aria-label="Image"
                        ref={inputRef}
                        className="absolute left-0 top-0 z-0 h-32 w-32 cursor-pointer opacity-0"
                        onChange={(event) => {
                          const file = event.target.files?.[0];

                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setPreviewImage(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          } else {
                            setPreviewImage(null);
                          }
                        }}
                        accept="image/*"
                        {...getInputProps(fields.file, {
                          type: "file",
                        })}
                      />
                    </label>
                  </div>
                  <div className="min-h-[32px] px-4 pb-3 pt-1">
                    <ErrorList
                      id={fields.file.errorId}
                      errors={fields.file.errors}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center">
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                className="w-auto uppercase font-light py-4"
                onClick={() => {
                  inputRef.current?.click();
                }}
              >
                Upload New Photo
              </Button>
              {/* <Button
                type="reset"
                variant="outline"
                className="destructive w-auto uppercase font-light py-4"
              >
                Reset
              </Button> */}
            </div>
            <div className="font-light text-xs text-foreground">
              Allowed PNG or JPEG. Max size of 800K.
            </div>
            <div className="min-h-[32px] px-4 pb-3 pt-1">
              <ErrorList id={meta.errorId} errors={meta.errors} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
