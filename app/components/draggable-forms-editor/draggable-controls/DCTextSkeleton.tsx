import { useContext, useEffect, useState } from "react";
import {
  MdOutlineCalendarMonth,
  MdOutlineExpandMore,
} from "react-icons/md/index.js";
import { Skeleton } from "~/components/ui/skeleton";
import { AppContext } from "~/store/appContext";
import { cn } from "~/utils/shadcn.utils";

import { DraggableFormContext } from "../store/draggableFormContext";
import type { FieldDefinition } from "../types";
import { AreaType, DisplayTextAlignment, FieldType } from "../types";
import EditRichTextButton from "../components/EditRichTextButton";
import EditQuestionButton from "../components/EditQuestionButton";

type TextFieldType = {
  descriptionProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  // inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  dropDown?: boolean;
  date?: boolean;
  multiline?: boolean;
  text?: string;
  readonly?: boolean;
  clipLabel?: boolean;
  field: FieldDefinition;
};
const EditorTextField = ({
  // inputProps,
  labelProps,
  descriptionProps,
  dropDown = false,
  date = false,
  multiline = false,
  text = "",
  readonly,
  clipLabel,
  field,
}: TextFieldType) => {
  // console.log("labelProps.children: ", labelProps.children);
  // console.log("text: ", text);

  const { state } = useContext(DraggableFormContext);
  const [selected, setSelected] = useState<boolean>(false);
  const { state: appState } = useContext(AppContext);

  useEffect(() => {
    // console.log(
    //   "EditorTextField: ",
    //   field.id,
    //   state.formState.selectedControl?.id,
    // );
    setSelected(state.formState.selectedControl?.id === field.id);
  }, [field.id, state]);

  const isQuestionField = () => {
    return (
      state.formState.selectedControl?.id === field.id &&
      state.formState.selectedForm?.area === AreaType.CLIENT_QUESTIONNAIRE &&
      (field.fieldType === FieldType.TEXTINPUT ||
        field.fieldType === FieldType.TEXTAREA ||
        field.fieldType === FieldType.SELECT)
    );
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full cursor-pointer",
        multiline && "overflow-y-auto",
        field &&
          field.displayOptions?.textAlign === DisplayTextAlignment.LEFT &&
          "flex-row",
      )}
    >
      {labelProps.children !== "" && labelProps.children !== undefined && (
        <div className="flex flex-1 text-xs overflow-clip font-normal cursor-pointer ">
          <div className="overflow-hidden whitespace-nowrap text-ellipsis">
            {labelProps.children}
          </div>
          <div className="flex-1 text-destructive cursor-pointer">
            {field.validation?.required ? "*" : ""}
          </div>
        </div>
      )}
      {descriptionProps && descriptionProps.children !== "" && (
        <div className="pl-2 text-xs font-light" />
      )}

      <div
        className={cn(
          "flex w-full bg-transparent",
          "py-0 text-sm transition-colors overflow-hidden",
          "placeholder:text-muted-foreground",
          "sm:text-sm ",
          field.displayOptions?.textAlign === DisplayTextAlignment.LEFT
            ? "flex-1"
            : "w-full",
          multiline ? "" : "",
          // "bg-white",
          dropDown || date ? "pr-1" : multiline ? "pr-0" : "pr-3",
          // !preview &&
          appState.formState.formEditor && text === "" && !multiline && "h-7",
          appState.formState.formEditor &&
            !appState.formState.preview &&
            "mt-1 mb-2 pl-3 border border-input cursor-pointer shadow-sm border-gray-300 rounded-md",
        )}
      >
        <div
          className={cn(
            "flex flex-1 items-center space-x-4 py-1",
            multiline && text !== "" && !appState.formState.preview
              ? "overflow-y-scroll"
              : "",
          )}
        >
          <div className="flex flex-col space-y-2 flex-1 p-2">
            {multiline && text !== "" && (
              <div
                className={cn(
                  "flex flex-col space-y-2 flex-1 h-full",
                  appState.formState.formEditor &&
                    !appState.formState.preview &&
                    "max-h-52",
                )}
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              ></div>
            )}
            {multiline && text === "" && (
              <>
                <Skeleton className={cn("h-4 w-1/2")} />
                <Skeleton className={cn("h-4 w-full")} />
                <Skeleton className={cn("h-4 w-3/4")} />
              </>
            )}
            {!multiline && text && (
              <div
                className="flex flex-col space-y-2 flex-1 [&_p]:leading-normal"
                dangerouslySetInnerHTML={{
                  __html: text,
                }}
              ></div>
            )}
            {!multiline && !text && (
              <Skeleton
                className={cn("h-4 w-full", selected && "bg-primary-8")}
              />
            )}
          </div>
          {dropDown && (
            <div className="ml-auto items-center flex">
              {date && (
                <MdOutlineCalendarMonth className="ml-1 h-5 w-5 text-gray-400" />
              )}
              {!date && (
                <MdOutlineExpandMore className="ml-1 h-5 w-5 text-gray-400" />
              )}
            </div>
          )}
        </div>
        {selected &&
          (field.fieldType === FieldType.HEADER ||
            field.fieldType === FieldType.PARAGRAPH ||
            field.fieldType === FieldType.RICHTEXT) && (
            <EditRichTextButton className="my-0 absolute top-1 right-0 " />
          )}
      </div>
      {isQuestionField() && (
        <EditQuestionButton className="my-0 absolute top-1 right-0 " />
      )}
      {/* <div className="min-h-[6px] px-4 py-0">{null}</div> */}
    </div>
  );
};

export default EditorTextField;
