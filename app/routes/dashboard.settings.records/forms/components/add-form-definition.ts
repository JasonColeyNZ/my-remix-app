import {
  AreaType,
  FieldType,
  type FormDefinition,
} from "~/components/draggable-forms-editor/types";

export const addFormFormDefinition = (formTypes: any): FormDefinition => {
  return {
    id: "add-form",
    name: "",
    area: AreaType.ADDFORM,
    rows: [
      {
        id: "row1",
        controls: [
          {
            id: "name",
            label: "Form Name",
            colSpan: 70,
            field: {
              id: "name",
              autoFocus: true,
              area: AreaType.ADDFORM,
              label: "Form Name",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: {},
              validation: { required: true },
            },
            sortOrder: 0,
          },
        ],
        sortOrder: 0,
      },
      {
        id: "row2",
        sortOrder: 1,
        controls: [
          {
            id: "area",
            colSpan: 0,
            field: {
              id: "area",
              area: AreaType.ADDFORM,
              label: "Form Type",
              fieldType: FieldType.SELECT,
              options: formTypes,
              displayOptions: {},
              validation: { required: true },
            },
            sortOrder: 0,
          },
        ],
      },
      {
        id: "row3",
        sortOrder: 2,
        controls: [
          {
            id: "description",
            label: "Description",
            colSpan: 70,
            field: {
              id: "description",
              autoFocus: false,
              area: AreaType.ADDFORM,
              label: "Description",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
            sortOrder: 0,
          },
        ],
      },
    ],
    usedFormFields: {},
  };
};
