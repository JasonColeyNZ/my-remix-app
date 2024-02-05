import type { FormDefinition } from "~/components/draggable-forms-editor/types";
import { AreaType, FieldType } from "~/components/draggable-forms-editor/types";

export const serviceFormDefinition = (
  categories: any,
  concurrent: any,
  locations: any,
  users: any,
  forms: any,
  consents: any,
  products: any,
  questionnaires: any,
  services: any,
): FormDefinition => {
  return {
    id: "service-form",
    name: "",
    area: AreaType.SERVICES,
    rows: [
      {
        id: "row1",
        controls: [
          {
            id: "name",
            colSpan: 40,
            field: {
              id: "name",
              area: AreaType.SERVICES,
              autoFocus: true,
              label: "Service",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: {},
              validation: { required: true },
            },
            sortOrder: 0,
          },
          {
            id: "categoryId",
            colSpan: 40,
            field: {
              id: "categoryId",
              area: AreaType.SERVICES,
              label: "Category",
              fieldType: FieldType.SELECT,
              options: categories,
              displayOptions: {},
              validation: { required: false },
            },
            sortOrder: 1,
          },
          {
            id: "color",
            colSpan: 10,
            sortOrder: 1,
            field: {
              id: "color",
              area: AreaType.SERVICES,
              label: "Color",
              fieldType: FieldType.COLORPICKER,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
          },
          {
            id: "textColor",
            colSpan: 10,
            sortOrder: 2,
            field: {
              id: "textColor",
              area: AreaType.SERVICES,
              label: "Text Color",
              fieldType: FieldType.COLORPICKER,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
          },
        ],
        sortOrder: 0,
      },
      {
        id: "row2",
        controls: [
          {
            id: "price",
            colSpan: 15,
            sortOrder: 0,
            field: {
              id: "price",
              area: AreaType.SERVICES,
              label: "Price",
              fieldType: FieldType.TEXTINPUT,
              options: [],
              displayOptions: { startInputAdornment: "$" },
              validation: { required: false },
            },
          },
          {
            id: "duration",
            colSpan: 12,
            sortOrder: 3,
            field: {
              id: "duration",
              area: AreaType.SERVICES,
              label: "Duration",
              fieldType: FieldType.TIMEITSELECT,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
          },
          {
            id: "timeMargin",
            colSpan: 12,
            sortOrder: 4,
            field: {
              id: "timeMargin",
              area: AreaType.SERVICES,
              label: "Time Margin",
              fieldType: FieldType.TIMEITSELECT,
              options: [],
              displayOptions: {},
              validation: { required: false },
            },
          },
          {
            id: "maximumConcurrentBookings",
            colSpan: 15,
            sortOrder: 5,
            field: {
              id: "maximumConcurrentBookings",
              area: AreaType.SERVICES,
              label: "Max. bookings",
              fieldType: FieldType.SELECT,
              options: concurrent,
              displayOptions: {},
              validation: { required: false },
            },
          },
          {
            id: "locations",
            colSpan: 40,
            sortOrder: 6,
            field: {
              id: "locations",
              area: AreaType.SERVICES,
              label: "Locations",
              fieldType: FieldType.SELECT,
              options: locations,
              displayOptions: { multiple: true },
              validation: { required: false },
            },
          },
        ],
        sortOrder: 1,
      },
      {
        id: "row3",
        controls: [
          {
            id: "users",
            colSpan: 0,
            sortOrder: 1,
            field: {
              id: "users",
              area: AreaType.SERVICES,
              label: "Team Members",
              fieldType: FieldType.SELECT,
              options: users,
              displayOptions: { multiple: true },
              validation: { required: false },
            },
          },
          {
            id: "consents",
            colSpan: 0,
            sortOrder: 2,
            field: {
              id: "consents",
              area: AreaType.SERVICES,
              label: "Letters of Consent",
              fieldType: FieldType.SELECT,
              options: consents,
              displayOptions: {
                multiple: true,
              },
              validation: { required: false },
            },
          },
        ],
        sortOrder: 2,
      },
      {
        id: "row4",
        controls: [
          {
            id: "addon",
            colSpan: 0,
            sortOrder: 0,
            field: {
              id: "addon",
              area: AreaType.SERVICES,
              label: "Addon Options",
              description: `Specify price and duration and linked services when used as an addon.`,
              fieldType: FieldType.SERVICEADDON,
              options: services,
              validation: { required: false },
            },
          },
        ],
        sortOrder: 3,
      },
      {
        id: "row5",
        controls: [
          {
            id: "products",
            colSpan: 0,
            sortOrder: 0,
            field: {
              id: "products",
              area: AreaType.SERVICES,
              label: "Products Used",
              description: `Select products used for this service.
              This will be used to track inventory usage for this service.`,
              fieldType: FieldType.PRODUCTSELECT,
              options: products,
              validation: { required: false },
            },
          },
        ],
        sortOrder: 4,
      },
    ],
    usedFormFields: {},
  };
};
