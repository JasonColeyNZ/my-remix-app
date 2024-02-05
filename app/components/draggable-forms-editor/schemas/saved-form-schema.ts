import { z } from "zod";
import {
  fieldDisplayOptionsSchema,
  fieldOptionSchema,
  fieldValidationSchema,
} from "./saved-field-schema";
import { ControlType, FieldType } from "../types";

export const savedControlSchema = z.object({
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
});

const savedRowSchema = z.object({
  sortOrder: z.number(),
  controls: z.array(savedControlSchema.optional()),
});

export const savedFormSchema = z.object({
  rows: z.array(savedRowSchema),
});

export type FieldDefinition = {
  // id: string;
  // area: AreaType;
  // label: string;
  // shortLabel?: string;
  // description?: string;
  // text?: string;
  // fieldType: FieldType;
  // controlType?: ControlType;
  autoFocus?: boolean;
  // options: FieldOptionType[];
  // displayOptions: DisplayOptions;
  // validation: FieldValidation;
};

export type SavedFormDefinition = z.infer<typeof savedFormSchema>;

export type SavedRowDefinition = z.infer<typeof savedFormSchema>;
