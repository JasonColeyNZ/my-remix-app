import type { FormDefinition } from "~/components/draggable-forms-editor/types.ts";
import {
  AreaType,
  FieldType,
} from "~/components/draggable-forms-editor/types.ts";

export const companyInfoFormDefinition = (): FormDefinition => {
  return {
    id: "info-form",
    name: "",
    area: AreaType.COMPANYINFO,
    rows: [
      {
        id: "row1",
        controls: [
          {
            id: "name",
            colSpan: 0,
            field: {
              id: "name",
              autoFocus: true,
              area: AreaType.COMPANYINFO,
              label: "Company Name",
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
        controls: [
          {
            id: "workNumber",
            colSpan: 0,
            field: {
              id: "workNumber",
              area: AreaType.COMPANYINFO,
              label: "Work Number",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
            sortOrder: 0,
          },
          {
            id: "mobileNumber",
            colSpan: 0,
            field: {
              id: "mobileNumber",
              area: AreaType.COMPANYINFO,
              label: "Mobile Number",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
            sortOrder: 1,
          },
        ],
        sortOrder: 1,
      },
      {
        id: "row3",
        controls: [
          {
            id: "address",
            colSpan: 0,
            field: {
              id: "address",
              area: AreaType.COMPANYINFO,
              label: "Address",
              fieldType: FieldType.ADDRESS,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
            sortOrder: 0,
          },
        ],
        sortOrder: 2,
      },
    ],
    usedFormFields: {},
  };
};
