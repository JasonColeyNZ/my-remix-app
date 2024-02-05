import { z } from "zod";
import { FieldType, type AreaType, ControlType } from "../types";
import {
  fieldDisplayOptionsSchema,
  fieldOptionSchema,
  fieldValidationSchema,
} from "./saved-field-schema";

export const savedToControlSchema = z
  .object({
    id: z.string(),
    label: z.string().optional(),
    shortLabel: z.string().optional(),
    description: z.string().optional(),
    fieldType: z.nativeEnum(FieldType),
    controlType: z.nativeEnum(ControlType).optional(),
    text: z.string().optional(),
    colSpan: z.number(),
    options: fieldOptionSchema.optional(),
    displayOptions: fieldDisplayOptionsSchema.optional(),
    validation: fieldValidationSchema.optional(),
  })
  .transform((data) => {
    return {
      id: data.id,
      colSpan: data.colSpan,

      field: {
        id: data.id,
        label: data.label,
        shortLabel: data.shortLabel,
        description: data.description,
        text: data.text,
        fieldType: data.fieldType,
        controlType: data.controlType,
        options: data.options,
        displayOptions: data.displayOptions,
        validation: data.validation,
      },
    };
  });

const savedToRowSchema = (shouldFocusInput: (fieldType: FieldType) => {}) => {
  return z
    .object({
      sortOrder: z.number(),
      controls: z.array(savedToControlSchema.optional()),
    })
    .transform((data) => {
      return {
        id: data.sortOrder.toString(), //used for draggable
        sortOrder: data.sortOrder,
        controls: data.controls.map((control, index) => {
          if (!control) return {};

          return {
            id: control.id,
            colSpan: control.colSpan,
            icon: control.field.fieldType.toLowerCase(), //used for draggable
            sortOrder: index, //used for draggable
            field: {
              ...control.field,
              autoFocus: shouldFocusInput(control.field.fieldType),
            },
          };
        }),
      };
    });
};

export const savedToForm = (id: string, area: AreaType) => {
  let focusInputFound = false;

  const shouldFocusInput = (fieldType: FieldType) => {
    if (focusInputFound) return false;
    if (fieldType === FieldType.PARAGRAPH || fieldType === FieldType.HEADER)
      return false;
    focusInputFound = true;
    return true;
  };

  return z
    .object({
      rows: z.array(savedToRowSchema(shouldFocusInput)),
    })
    .transform((data) => {
      return {
        id: id,
        area: area,
        rows: data.rows,
        usedFormFields: {},
      };
    });
};
// function shouldFocusInput(type: any): any {
//   throw new Error("Function not implemented.");
// }
