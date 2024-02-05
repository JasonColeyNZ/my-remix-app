import {
  AreaType,
  FieldType,
  type FormDefinition,
} from "~/components/draggable-forms-editor/types";

export const editContentDefinition = (): FormDefinition => {
  return {
    id: "content-editor-form",
    name: "",
    area: AreaType.CONTENTEDITOR,
    rows: [
      {
        id: "row1",
        controls: [
          {
            id: "name",
            // label: "",
            colSpan: 0,
            field: {
              id: "text",
              autoFocus: true,
              area: AreaType.CONTENTEDITOR,
              label: "",
              fieldType: FieldType.RICHTEXT,
              options: [],
              displayOptions: {},
              validation: { required: true },
            },
            sortOrder: 0,
          },
        ],
        sortOrder: 0,
      },
    ],
    usedFormFields: {},
  };
};
