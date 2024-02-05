import { z } from "zod";
import { zx } from "zodix";

export enum FieldIntent {
  ADD_FIELD = "add-field",
  UPDATE_FIELD = "update-field",
  DELETE_FIELD = "delete-field",
}

const addControlSchema = z.object({
  intent: z.literal(FieldIntent.ADD_FIELD),
  area: z.string(),
});

export const deleteControlSchema = z.object({
  intent: z.literal(FieldIntent.DELETE_FIELD),
  id: z.string(),
  action: z.string().optional(),
});

export const controlSchema = z.object({
  id: z.string(),
  action: z.string().optional(),

  area: z.string(),
  //sortOrder: z.number(),
  colSpan: zx.IntAsString,
  field: z.object({
    label: z.string(),
    shortLabel: z.string().optional(),
    controlType: z.string(),
    type: z.string(),
    description: z.string().optional(),
    displayOptions: z
      .object({
        textAlign: z.string().optional(),
        displayColumns: z.string().optional(),
        startInputAdornment: z.string().optional(),
        openOn: z.string().optional(),
        disableFutureDates: zx.BoolAsString.optional(),
        disablePastDates: zx.BoolAsString.optional(),
      })
      .optional(),
    validation: z.object({
      required: zx.BoolAsString,
      minLength: zx.IntAsString.optional(),
      maxLength: zx.IntAsString.optional(),
      minValue: zx.IntAsString.optional(),
      maxValue: zx.IntAsString.optional(),
    }),
    options: z
      .array(
        z.object({
          text: z.string(),
          textBox: z.string().optional(),
          value: z.string(),
          index: zx.IntAsString,
        }),
      )
      .optional(),
  }),
});

export const updateFormAndFieldSchema = z.object({
  intent: z.literal(FieldIntent.UPDATE_FIELD),
  area: z.string(),
  formId: z.string(),
  formDefinition: z.string(),
  field: controlSchema,
});

export const fieldSchema = z.discriminatedUnion("intent", [
  addControlSchema,
  deleteControlSchema,
  updateFormAndFieldSchema,
]);

// export const addControlSchema = z.intersection(
//   controlSchema,
//   z.object({
//     area: z.string(),
//   }),
// );
