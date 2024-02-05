import { z } from "zod";

export enum templateIntent {
  ADD_TEMPLATE = "ADD_TEMPLATE",
  UPDATE = "UPDATE",
  RENAME = "RENAME",
}
export const addTemplateSchema = z.object({
  intent: z.nativeEnum(templateIntent),
  // entityId: z.string(),
  name: z.string().min(2, "Please include a name"),
  description: z.string().optional(),
  // type: z.string(),
  // cost: zx.IntAsString,
});
