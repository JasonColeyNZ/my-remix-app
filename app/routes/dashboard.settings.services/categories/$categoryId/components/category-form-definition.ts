import {
  AreaType,
  FieldType,
  type FormDefinition,
} from "~/components/draggable-forms-editor/types";

export const categoryFormDefinition = (): FormDefinition => {
  return {
    id: "category-form",
    name: "",
    area: AreaType.CATEGORY,
    rows: [
      {
        id: "row1",
        controls: [
          {
            id: "name",
            colSpan: 60,
            field: {
              id: "name",
              autoFocus: true,
              area: AreaType.CATEGORY,
              label: "Category Name",
              fieldType: FieldType.TEXTINPUT,
              validation: { required: true },
            },
            sortOrder: 0,
          },
          {
            id: "color",
            colSpan: 20,
            sortOrder: 1,
            field: {
              id: "color",
              area: AreaType.CATEGORY,
              label: "Color",
              fieldType: FieldType.COLORPICKER,
              validation: { required: false },
            },
          },
          {
            id: "textColor",
            colSpan: 20,
            sortOrder: 2,
            field: {
              id: "textColor",
              area: AreaType.CATEGORY,
              label: "Text Color",
              fieldType: FieldType.COLORPICKER,
              validation: { required: false },
            },
          },
        ],
        sortOrder: 0,
      },
    ],
    usedFormFields: {},
  };
};
