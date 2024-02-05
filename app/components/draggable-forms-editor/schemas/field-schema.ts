import { z } from "zod";
import { AreaType, ControlType, FieldType } from "../types";
import {
  fieldDisplayOptionsSchema,
  fieldOptionSchema,
  fieldValidationSchema,
} from "./saved-field-schema";

export const savedFieldSchema = z.object({
  id: z.string(),
  formId: z.string(),
  area: z.nativeEnum(AreaType),
  label: z.string(),
  shortLabel: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  text: z.string().nullable().optional(),

  fieldType: z.nativeEnum(FieldType),
  controlType: z.nativeEnum(ControlType),

  options: fieldOptionSchema.optional(),
  validation: fieldValidationSchema,
  displayOptions: fieldDisplayOptionsSchema.optional(),

  demo: z.boolean().optional(),
});

export type SavedFieldDefinition = z.infer<typeof savedFieldSchema>;
