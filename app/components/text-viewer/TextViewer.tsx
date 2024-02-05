import { useLocales } from "remix-utils/locales/react";
import { timeItText } from "~/utils/strings.tsx";

import {
  FieldType,
  type FieldDefinition,
  ControlType,
} from "../draggable-forms-editor/types.ts";

interface TextViewerProps {
  field: FieldDefinition;
  defaultValue?: string;
}

const TextViewer = ({ field, defaultValue }: TextViewerProps) => {
  //console.log("TextViewer: ", field, defaultValue)
  const locales = useLocales();

  const renderData = (field: FieldDefinition) => {
    let prefix = "";
    if (field.displayOptions?.startInputAdornment) {
      prefix = "$ ";
    }
    const value = defaultValue || "";
    //console.log("TextViewer: ", field, defaultValue, value);
    switch (field.fieldType) {
      case FieldType.TEXTINPUT:
        return prefix + value;
      case FieldType.SELECT: {
        const option = field.options
          ? field.options.filter((option) => option.value === value + "")
          : [];
        return option.length > 0 ? option[0].text : "";
      }
      case FieldType.DATETIME:
        if (field.controlType === ControlType.DATE) {
          return value
            ? new Date(value).toLocaleString(locales, { dateStyle: "medium" })
            : "";
        } else {
          return value ? new Date(value).toLocaleString(locales) : "";
        }
      case FieldType.RICHTEXT:
        return value ? (
          <div dangerouslySetInnerHTML={{ __html: value }}></div>
        ) : (
          ""
        );
      case FieldType.TIMEITSELECT:
        return value ? timeItText(value) : "";
      default:
        return value;
    }
  };

  // const getBackgroundColor = (fieldType: string) => {
  //   switch (fieldType) {
  //     case FieldType.COLORPICKER:
  //       return defaultValue;
  //     default:
  //       return "rgba(0, 0, 0, 0.09)";
  //   }
  // };

  return (
    <div
      className="inline-flex flex-col relative w-full p-0 m-0 border-0 align-top"
      // sx={{
      //   display: "inline-flex",
      //   flexDirection: "column",
      //   position: "relative",
      //   width: "100%",
      //   verticalAlign: "top",
      //   padding: 0,
      //   margin: 0,
      //   border: 0,
      // }}
    >
      <div
        className="block h-[1.4375em] opacity-0 p-0 max-w-[100%] text-xs left-0 top-0 transform-origin-top-left text-black bg-white"
        // sx={{
        //   display: "block",
        //   lineHeight: "1.4375em",
        //   fontWeight: 400,
        //   maxWidth: "calc(133% - 32px)",
        //   fontSize: "1rem",
        //   left: -3,
        //   top: 0,
        //   position: "absolute",
        //   transformOrigin: "top left",
        //   color: "rgba(0, 0, 0, 0.6)",
        //   transform: "translate(14px, -9px) scale(0.75)",
        //   zIndex: 1,
        //   pointerEvents: "auto",
        //   userSelect: "none",
        //   backgroundColor: "white",
        //   borderRadius: "4px",
        // }}
      >
        <div
          className="w-full bg-gray-100 rounded-md px-1  "
          // sx={{
          //   width: "100%",
          //   backgroundColor: "rgba(0, 0, 0, 0.09)",
          //   borderRadius: "4px",
          //   padding: "0px 4px",
          //   whiteSpace: "nowrap",
          //   overflow: "hidden",
          //   textOverflow: "ellipsis",
          // }}
        >
          {field.label}
        </div>
      </div>
      <div
        className="block w-full align-middle relative rounded-sm px-[3px] py-[13px] bw-[1px] bc-[rgba(0, 0, 0, 0.23)] bg-[rgba(0, 0, 0, 0.09)]"
        // sx={{
        //   display: "block",
        //   alignItems: "center",
        //   width: "100%",
        //   position: "relative",
        //   borderRadius: "4px",
        //   lineHeight: "1.4375em",
        //   // height: '1.4375em',
        //   padding: "3px 13px",
        //   borderWidth: "1px",
        //   borderColor: "rgba(0, 0, 0, 0.23)",
        //   backgroundColor: getBackgroundColor(field.type),
        // }}
      >
        <div
          className="h-[1.4375em] whitespace-nowrap"
          // sx={{
          //   height: "1.4375em",
          //   whiteSpace: "nowrap",
          // }}
        >
          {renderData(field)}
        </div>

        <div
          className="text-left absolute inset-0 "
          // sx={{
          //   textAlign: "left",
          //   position: "absolute",
          //   inset: "-5px 0px 0px",
          //   madding: "0px 8px",
          // }}
        >
          <div
            className="block h-[11px] opacity-0 p-0 max-w-[100%] text-xs left-0 top-0 transform-origin-top-left text-black bg-white"
            // sx={{
            //   float: "unset",
            //   display: "block",
            //   height: "11px",
            //   opacity: 0,
            //   padding: 0,
            //   maxWidth: "100%",
            //   fontSize: "0.75rem",
            //   left: 0,
            //   top: 0,
            //   transformOrigin: "top left",
            //   color: "rgba(0, 0, 0, 0.6)",
            //   background: "solid white",
            // }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default TextViewer;
