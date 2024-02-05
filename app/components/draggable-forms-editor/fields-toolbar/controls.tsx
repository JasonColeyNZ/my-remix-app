import {
  MdBloodtype,
  MdCalendarToday,
  MdImage,
  MdOutlineList,
  // MdOutlineNumbers,
  MdOutlineSubject,
  MdOutlineTextFields,
  MdOutlineTextSnippet,
  MdOutlineTitle,
  MdOutlineWysiwyg,
} from "react-icons/md/index.js";
import { PiSignature } from "react-icons/pi/index.js";

import {
  AreaType,
  // ControlType,
  FieldType,
  type FormFieldDefinition,
} from "../types.ts";

export const getIcon = (type: FieldType) => {
  switch (type) {
    case FieldType.SIGNATURE:
      return <PiSignature />;
    // case "number":
    //   return <NumberIcon />;
    case FieldType.TEXTINPUT:
      return <MdOutlineTextFields />;
    case FieldType.RICHTEXT:
      return <MdOutlineWysiwyg />;
    // case "checkbox":
    //   return <CheckboxIcon />;
    // case "checklist":
    //   return <ChecklistIcon />;
    // case "radio":
    //   return <RadioIcon />;
    case FieldType.SELECT:
      return <MdOutlineList />;
    case FieldType.TEXTTEMPLATE:
    case FieldType.TEXTAREA:
      return <MdOutlineTextSnippet />;
    case FieldType.DATETIME:
      return <MdCalendarToday />;
    // case FieldType.NUMBER:
    //   return <MdOutlineNumbers />;
    // case "image":
    //   return <ImageIcon />;
    // case "button":
    //   return <ButtonIcon />;
    case FieldType.PARAGRAPH:
      return <MdOutlineSubject />;
    case FieldType.HEADER:
      return <MdOutlineTitle />;
    case FieldType.IMAGEUPLOAD:
      return <MdImage />;
    case FieldType.BLOODPRESSURE:
      return <MdBloodtype />;
    default:
      return <MdOutlineTitle />;
  }
};

export const staticToolboxControls: FormFieldDefinition[] = [
  {
    id: "header",
    field: {
      id: "header",
      area: AreaType.FORM,
      fieldType: FieldType.HEADER,
      label: "Header",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.HEADER,
  },
  {
    id: "paragraph",
    field: {
      id: "paragraph",
      area: AreaType.FORM,
      fieldType: FieldType.PARAGRAPH,
      label: "Paragraph",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.PARAGRAPH,
  },
];
export const toolboxControls: FormFieldDefinition[] = [
  {
    id: "header",
    field: {
      id: "header",
      area: AreaType.FORM,
      fieldType: FieldType.HEADER,
      label: "Header",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.HEADER,
  },
  {
    id: "paragraph",
    field: {
      id: "paragraph",
      area: AreaType.FORM,

      fieldType: FieldType.PARAGRAPH,
      label: "Paragraph",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.PARAGRAPH,
  },
  {
    id: "texttemplate",
    field: {
      id: "texttemplate",
      area: AreaType.FORM,

      fieldType: FieldType.TEXTTEMPLATE,
      label: "Text Template",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.TEXTTEMPLATE,
  },
  {
    id: "imageUpload",
    field: {
      id: "imageUpload",
      area: AreaType.FORM,

      fieldType: FieldType.IMAGEUPLOAD,
      label: "Image Upload",
      // controlType: ControlType. "imageUpload",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.IMAGEUPLOAD,
  },
  {
    id: "signature",
    field: {
      id: "signature",
      area: AreaType.FORM,

      fieldType: FieldType.SIGNATURE,
      label: "Signature",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.SIGNATURE,
  },
  {
    id: "textinput",
    field: {
      id: "textinput",
      area: AreaType.FORM,

      fieldType: FieldType.TEXTINPUT,
      label: "Text Input",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.TEXTINPUT,
  },
  {
    id: "datetime",
    field: {
      id: "datetime",
      area: AreaType.FORM,

      fieldType: FieldType.DATETIME,
      label: "Date/Time",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.DATETIME,
  },
  // {
  //   id: "number",
  //   field: {
  //     id: "number",
  //          area: AreaType.FORM,

  //     type: "number",
  //     label: "Number Input",
  //     displayOptions: {},
  //     validation: {
  //       required: false,
  //     },
  //     options: [],
  //   },
  //   fieldType: "number",
  //   sortOrder: 0,
  //   colSpan: 0,
  //   icon: FieldType.NUMBER,
  // },
  {
    id: "select",
    field: {
      id: "select",
      area: AreaType.FORM,

      fieldType: FieldType.SELECT,
      label: "Select",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.SELECT,
  },
  {
    id: "richtext",
    field: {
      id: "richtext",
      area: AreaType.FORM,

      fieldType: FieldType.RICHTEXT,
      label: "Rich Text",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.RICHTEXT,
  },
  {
    id: "textarea",
    field: {
      id: "textarea",
      area: AreaType.FORM,

      fieldType: FieldType.TEXTAREA,
      label: "Text Area",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.TEXTAREA,
  },
  {
    id: "bloodpressure",
    field: {
      id: "bloodpressure",
      area: AreaType.FORM,

      fieldType: FieldType.BLOODPRESSURE,
      label: "Blood Pressure",
      displayOptions: {},
      validation: {
        required: false,
      },
      options: [],
    },
    sortOrder: 0,
    colSpan: 0,
    icon: FieldType.BLOODPRESSURE,
  },
];
