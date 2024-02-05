import { z } from "zod";
import { AreaType, ControlType, FieldType } from "../types";
import {
  fieldDisplayOptionsSchema,
  fieldOptionSchema,
  fieldValidationSchema,
} from "./saved-field-schema";

export const controlToSavedSchema = z
  .object({
    id: z.string(),
    colSpan: z.number(),
    sortOrder: z.number(),
    icon: z.string().optional(),
    field: z.object({
      id: z.string(),
      label: z.string().optional(),
      shortLabel: z.string().optional(),
      description: z.string().optional(),
      text: z.string().optional(),
      fieldType: z.nativeEnum(FieldType),
      controlType: z.nativeEnum(ControlType).optional(),
      options: fieldOptionSchema.optional(),
      displayOptions: fieldDisplayOptionsSchema.optional(),
      validation: fieldValidationSchema.optional(),
    }),
  })
  .transform((data) => {
    return {
      id: data.id,
      sortOrder: data.sortOrder,
      label: data.field.label,
      shortLabel: data.field.shortLabel,
      description: data.field.description,
      fieldType: data.field.fieldType,
      controlType: data.field.controlType,
      text: data.field.text,
      colSpan: data.colSpan,
      options: data.field.options,
      displayOptions: data.field.displayOptions,
      validation: data.field.validation,
    };
  });

const rowToSavedSchema = z
  .object({
    id: z.string(),
    sortOrder: z.number(),
    controls: z.array(controlToSavedSchema.optional()),
  })
  .transform((data) => {
    return {
      sortOrder: data.sortOrder,
      controls: data.controls,
    };
  });

export const formToSavedSchema = z
  .object({
    id: z.string(),
    area: z.nativeEnum(AreaType),
    rows: z.array(rowToSavedSchema),
    usedFormFields: z.object({}),
  })
  .transform((data) => {
    return {
      rows: data.rows,
    };
  });
