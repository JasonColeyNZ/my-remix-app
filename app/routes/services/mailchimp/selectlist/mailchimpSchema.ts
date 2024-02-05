import { z } from "zod";

export enum MailchimpIntent {
  SELECTLIST = "select-list",
  VALIDATE = "validate",
}

export const saveSelectedListSchema = z.object({
  intent: z.literal(MailchimpIntent.SELECTLIST),
  id: z.string().min(1),
  listId: z.string().min(1),
});

export const mailchimpSchema = z.discriminatedUnion("intent", [
  saveSelectedListSchema,
]);
