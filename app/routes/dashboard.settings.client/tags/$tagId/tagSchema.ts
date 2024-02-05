import { z } from "zod";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";

export const createTagSchema = z.object({
  intent: z.literal(formViewerIntent.CREATE),
  tagType: z.string().optional(),
  name: z.string().min(2, "Please include a name"),
  color: z.string(),
  textColor: z.string(),
});

export const updateTagSchema = z.object({
  intent: z.literal(formViewerIntent.UPDATE),
  id: z.string(),
  name: z.string().min(2, "Please include a name"),
  color: z.string(),
  textColor: z.string(),
});

const validateTagSchema = z.object({
  intent: z.literal(formViewerIntent.VALIDATE),
  id: z.string(),
  name: z.string().min(2, "Please include a name"),
  color: z.string(),
  textColor: z.string(),
});

export const tagSchema = z.discriminatedUnion("intent", [
  createTagSchema,
  updateTagSchema,
  validateTagSchema,
]);
