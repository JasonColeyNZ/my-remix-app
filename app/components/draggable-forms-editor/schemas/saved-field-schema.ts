import { z } from "zod";
import { AreaType, ControlType, FieldType } from "../types";
import { zx } from "zodix";

export const fieldOptionSchema = z.array(
  z.object({
    text: z.string(),
    value: z.union([z.number(), z.string()]),
    textBox: z.string().optional(),
    sortOrder: z.number(),
  }),
);

export const fieldValidationSchema = z.object({
  minValue: z.number().optional(),
  maxValue: z.number().optional(),
  disableFutureDate: z.boolean().optional(),
  disablePastDate: z.boolean().optional(),
  required: z.boolean().optional(),
});

export const fieldDisplayOptionsSchema = z.object({
  startInputAdornment: z.string().optional(),
  textAlign: z.string().optional(),
  readOnly: z.boolean().optional(),
  displayColumns: z.number().optional(),
  disablePastDates: z.boolean().optional(),
  disableFutureDates: z.boolean().optional(),
  openOn: z.enum(["day", "year", "month"]).optional(),
  multiple: zx.BoolAsString.optional(),
});

export const savedToControlSchema = z
  .object({
    id: z.string(),
    label: z.string(),
    shortLabel: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    fieldType: z.nativeEnum(FieldType),
    controlType: z.nativeEnum(ControlType).optional(),
    area: z.nativeEnum(AreaType),
    options: fieldOptionSchema.optional(),
    validation: fieldValidationSchema,
    displayOptions: fieldDisplayOptionsSchema.optional(),
    formId: z.string().nullable().optional(),
    demo: z.boolean().optional(),
  })
  .transform((data) => {
    return {
      ...data,
      colSpan: 0,
    };
  });
