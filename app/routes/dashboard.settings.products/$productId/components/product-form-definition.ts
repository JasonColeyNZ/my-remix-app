import type { FormDefinition } from "~/components/draggable-forms-editor/types.ts";
import {
  AreaType,
  FieldType,
} from "~/components/draggable-forms-editor/types.ts";

export const productFormDefinition = (
  productTypes: any,
  services: any,
  unitsOfMeasure: any,
): FormDefinition => {
  return {
    id: "service-form",
    name: "",
    area: AreaType.PRODUCTS,
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
              area: AreaType.PRODUCTS,
              label: "Name",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: {},
              validation: { required: true },
            },
            sortOrder: 0,
          },
          {
            id: "productTypeId",
            colSpan: 0,
            field: {
              id: "productTypeId",
              area: AreaType.PRODUCTS,
              label: "Product Type",
              fieldType: FieldType.SELECT,
              options: productTypes,
              displayOptions: {},
              validation: { required: true },
            },
            sortOrder: 1,
          },
          {
            id: "unitOfMeasure",
            colSpan: 0,
            sortOrder: 2,
            field: {
              id: "unitOfMeasure",
              area: AreaType.PRODUCTS,
              label: "Unit of Measure",
              fieldType: FieldType.SELECT,
              options: unitsOfMeasure,
              displayOptions: {},
              validation: { required: true },
            },
          },
        ],
        sortOrder: 0,
      },
      {
        id: "row2",
        controls: [
          {
            id: "description",
            colSpan: 0,
            field: {
              id: "description",
              area: AreaType.PRODUCTS,
              label: "Description",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
            sortOrder: 0,
          },
        ],
        sortOrder: 1,
      },
      {
        id: "row3",
        controls: [
          {
            id: "services",
            colSpan: 0,
            sortOrder: 0,
            field: {
              id: "services",
              area: AreaType.PRODUCTS,
              label: "Services Used",
              description: `Select services that use this product.
              This will be used to track inventory usage for this product.`,
              fieldType: FieldType.SERVICESELECT,
              options: services,
              validation: { required: false },
            },
          },
        ],
        sortOrder: 2,
      },
    ],
    usedFormFields: {},
  };
};
