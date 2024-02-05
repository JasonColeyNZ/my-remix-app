import { z } from "zod";
import { zx } from "zodix";
import { savedFieldSchema } from "~/components/draggable-forms-editor/schemas/field-schema";
import { savedFormSchema } from "~/components/draggable-forms-editor/schemas/saved-form-schema";

export enum formEditorIntent {
  UPDATE = "UPDATE",
  ADDFIELD = "ADDFIELD",
  UPDATEFIELD = "UPDATEFIELD",
}

const defaultFormDefinitionSchema = z.object({
  id: z.string().min(1, "Please select a Form"),
  formDefinition: z
    .string()
    .min(2, "Form Definition must be included")
    .transform((value) => {
      const form = savedFormSchema.safeParse(JSON.parse(value));
      if (!form.success) {
        throw new Error("Invalid form");
      }
      return form.data;
    }),
});

const addFieldSchema = defaultFormDefinitionSchema.extend({
  intent: z.literal(formEditorIntent.ADDFIELD),
  addToForm: zx.BoolAsString,
  area: z.string().min(1, "Please select an Area"),
  field: z
    .string()
    .min(2, "Field Definition must be included")
    .transform((value) => {
      const field = savedFieldSchema.safeParse(JSON.parse(value));
      if (!field.success) {
        throw new Error("Invalid field");
      }
      return field.data;
    }),
});

const updateFieldSchema = defaultFormDefinitionSchema.extend({
  intent: z.literal(formEditorIntent.UPDATEFIELD),
  area: z.string().min(1, "Please select an Area"),
  field: z
    .string()
    .min(2, "Field Definition must be included")
    .transform((value) => {
      const field = savedFieldSchema.safeParse(JSON.parse(value));
      if (!field.success) {
        throw new Error("Invalid field");
      }
      return field.data;

      // try {
      //   return    JSON.parse(value) as FieldDefinition;
      // } catch (e) {
      //   throw new Error("Form Definition must be valid JSON");
      // }
    }),
});

const updateFormDefinitionSchema = defaultFormDefinitionSchema.extend({
  intent: z.literal(formEditorIntent.UPDATE),
});

export const formDefinitionSchema = z.discriminatedUnion("intent", [
  addFieldSchema,
  updateFormDefinitionSchema,
  updateFieldSchema,
]);
