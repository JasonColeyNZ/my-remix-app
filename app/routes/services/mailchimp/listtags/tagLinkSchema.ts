import { z } from "zod";

export enum MailchimpTagLinkIntent {
  TAGLINK = "tag-link",
  TAGCREATE = "tag-create",
  VALIDATE = "validate",
}

export const tagLinkSchema = z.object({
  intent: z.literal(MailchimpTagLinkIntent.TAGLINK),
  tagId: z.string().min(1),
  providerTagId: z.string().min(1),
});

// export type TagLink = z.infer<typeof tagLinkSchema>;

export const tagCreateSchema = z.object({
  intent: z.literal(MailchimpTagLinkIntent.TAGCREATE),
  tagId: z.string().min(1),
  tagName: z.string().min(1),
});

// export type TagCreate = z.infer<typeof tagCreateSchema>;

export const validateSchema = z.object({
  intent: z.literal(MailchimpTagLinkIntent.VALIDATE),
});

// export type Validate = z.infer<typeof validateSchema>;

export const tagLinkIntentSchema = z.union([
  tagLinkSchema,
  tagCreateSchema,
  validateSchema,
]);
