import { z } from "zod";
import { zx } from "zodix";

export enum clientIntent {
  UPDATETAGS = "UPDATETAGS",
}

export const updateClientTagSchema = z.object({
  intent: z.literal(clientIntent.UPDATETAGS),
  id: z.string().optional(),
  // clientTagId: z.string(),
  tagId: z.string(),
  checked: zx.BoolAsString,
});

export const clientSchema = z.discriminatedUnion("intent", [
  updateClientTagSchema,
]);
