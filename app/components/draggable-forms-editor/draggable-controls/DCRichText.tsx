import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "~/store/appContext.tsx";
import { FormStateTypes } from "~/store/formReducer.ts";
import { cn } from "~/utils/shadcn.utils.ts";

import EditorTextField from "./DCTextSkeleton.tsx";
import type { FieldDefinition } from "../types.ts";
import type { ToolbarSettingsModel } from "~/components/syncfusion/richedit/index.ts";
import {
  HtmlEditor,
  Link,
  // List,
  PasteCleanup,
  QuickToolbar,
  Image,
  RichTextEditorComponent,
  Toolbar,
} from "~/components/syncfusion/richedit/index.ts";
import { Inject } from "~/components/syncfusion/index.ts";
import { useField, useInputControl } from "@conform-to/react";

// import AutocompleteDraggable from "./AutocompleteDraggable.tsx";

interface DraggableFieldProps {
  type?: string;
  field: FieldDefinition;
  disabled?: boolean;
  // prop: FieldName<string>;
  showTemplates?: boolean;
  fieldName: string;
}

// const LetterContainer = styled.div`
//   display: flex;
//   width: 100%;
//   & > div > div:last-child {
//     padding-bottom: 0.2px !important;
//   }
//   & > div > div > form {
//     display: flex;
//     width: 100%;
//     flex: 1 1 0;
//   }
//   & > div > div > div {
//     display: flex;
//     width: 100%;
//     height: 100% !important;
//     border-radius: 0 !important;
//     border: 0 !important;
//   }
// `;

const returnFirstNonEmptyString = (a: string, b: string) => {
  if (a === "") return b;
  return a;
};

const DCRichText = ({
  field,
  fieldName,
  disabled,
  showTemplates = true,
}: DraggableFieldProps) => {
  //const defaultValue = control._defaultValues[field.id];
  // console.log("prop: ", prop);
  const editorRef = useRef<RichTextEditorComponent>(null);
  const { state, dispatch } = useContext(AppContext);
  const [meta] = useField<string>(fieldName);

  const control = useInputControl(meta);
  // const [editorValue, setEditorValue] = useState(prop.defaultValue || "");
  // const { textTemplates } = useLoaderData<{
  //   textTemplates: TextTemplateItemsType;
  // }>();
  // const textTemplateFetcher = useFetcher<typeof loader>();
  // const { data, state } = textTemplateFetcher;
  const [internalValue, setInternalValue] = useState<any>(
    returnFirstNonEmptyString(
      meta.initialValue ? meta.initialValue.toString() : "",
      field.text ? field.text.toString() : "",
    ) ?? null,
  );

  useEffect(() => {
    setInternalValue(
      returnFirstNonEmptyString(
        meta.initialValue ? meta.initialValue.toString() : "",
        field.text ? field.text.toString() : "",
      ) ?? null,
    );
  }, [field.text, meta.initialValue]);

  useEffect(() => {
    if (state.formState.refreshRichtextEditor) {
      // console.log("Refresh Rich Text Editor");
      editorRef.current?.refreshUI();
      dispatch({
        type: FormStateTypes.refreshRichtextEditor,
        payload: {
          refreshRichtextEditor: false,
        },
      });
    }
  }, [dispatch, state.formState.refreshRichtextEditor]);

  if (
    (state.formState.formEditor ||
      state.formState.preview ||
      field.displayOptions?.readOnly) &&
    !state.formState.recordEditors.includes(field.area)
  ) {
    return (
      <EditorTextField
        labelProps={{
          children: field.label,
        }}
        multiline={true}
        text={field.text}
        readonly={field.displayOptions?.readOnly}
        field={field}
      />
    );
  }

  // console.log("Show Editor");
  // const iframeSetting: object = { enable: true };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   if (state === "idle") {
  //     if (!data || data.textTemplate === undefined) return;
  //     setEditorValue(data.textTemplate.text);
  //   }
  // }, [data, state, setEditorValue]);

  // if (!preview)
  //   return (
  //     <>
  //       <AutocompleteDraggable
  //         field={field}
  //         preview={preview}
  //         disabled={disabled}
  //         prop={undefined}
  //       />
  //     </>
  //   );
  // else

  const toolbarSettings: ToolbarSettingsModel = {
    items: [
      "Bold",
      "Italic",
      "Underline",
      "StrikeThrough",
      "|",
      "FontName",
      "FontSize",
      "Formats",
      "FontColor",
      "BackgroundColor",
      "Alignments",
      "|",
      // "BulletFormatList",
      // "NumberFormatList",
      "OrderedList",
      "UnorderedList",
      "Outdent",
      "Indent",
      "|",
      "Undo",
      "Redo",
      "FullScreen",
    ],
  };
  const pasteCleanupSettings: object = {
    allowedStyleProps: ["color", "margin", "font-size"],
    deniedAttrs: ["class", "title", "id"],
    deniedTags: ["a", "br"],
    keepFormat: false,
    plainText: false,
    prompt: true,
  };

  return (
    <div
      className={cn(
        "flex w-full",
        // tox tox-tinymce
        // "[&_>div]:flex [&_>div]:flex-1 [&_>div]:flex-col [&_>div]:!border-0",
        // "[&_form]:flex [&_form]:w-full [&_form]:flex-1",
        // "[&_.e-rte-content]:flex-1",
      )}
      id="records-letter-outer"
    >
      <textarea
        name="text"
        style={{ display: "none" }}
        value={internalValue}
        onChange={() => {}}
      />
      <RichTextEditorComponent
        ref={editorRef}
        value={internalValue}
        toolbarSettings={toolbarSettings}
        pasteCleanupSettings={pasteCleanupSettings}
        // height="30rem"
        change={() => {
          // console.log(editorRef.current?.getHtml());
          if (!editorRef.current) return;
          setInternalValue(editorRef.current?.getHtml());
          control.change(editorRef.current?.getHtml());
        }}
      >
        <Inject
          services={[
            Toolbar,
            Image,
            Link,

            HtmlEditor,
            QuickToolbar,
            PasteCleanup,
          ]}
        />
      </RichTextEditorComponent>
      {/* <ClientOnly>
        {() => (
          <Editor
            tinymceScriptSrc={"/tinymce/tinymce.min.js"}
            onInit={(evt, editor) => (editorRef.current = editor)}
            onDirty={() => {
              const editor = editorRef.current;
              if (!editor) return;
              //console.log("Editor Dirty: ", editor);
              editor.save();
              editor.setDirty(false);
              setInternalValue(editorRef.current?.getContent());
              // setValue("text", editorRef.current?.getContent() || "", {
              //   shouldDirty: true,
              // });
              // if (!setSaveEnabled) return;
              // setSaveEnabled(true);
            }}
            textareaName="_text"
            initialValue={editorValue}
            init={{
              max_height: 500,

              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "autoresize",
                "typography",
                //"link",
                "charmap",
                "fullscreen",
                "table",
                "help",
                "wordcount",
              ],
              //theme: "advanced",
              statusbar: false,
              // resize: false,
              theme_advanced_buttons3_add: "fullscreen",
              fullscreen_new_window: true,
              fullscreen_settings: {
                theme_advanced_path_location: "top",
              },
              setup: (editor) => {
                //console.log("Editor Setup: ", editor);

                if (showTemplates) {
                  editor.ui.registry.addMenuButton("textTemplate", {
                    text: "Text Template",
                    fetch: (callback) => {
                      if (!textTemplates || textTemplates.length === 0) return;
                      const items: Ui.Menu.NestedMenuItemContents[] =
                        textTemplates.map((template) => {
                          return {
                            type: "menuitem",
                            text: template.name,
                            value: template.id,
                            onAction(api) {
                              textTemplateFetcher.load(
                                `/dashboard/settings/records/templates/` +
                                  template.id,
                              );
                            },
                          };
                        });
                      callback(items);
                    },
                  });
                }
              },
              //min-height:
              toolbar:
                "fontsize | fontfamily | typography |" +
                "textTemplate | undo redo | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "table | fullscreen",
              toolbar_mode: "wrap",
              hidden_input: false,
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; }",
            }}
          />
        )}
      </ClientOnly> */}
    </div>
  );
};
export default DCRichText;
