import { z } from "zod";

export enum IntegrationIntent {
  CONNECT = "connect",
  // REFRESHMAILCHIMP = "refreshmailchimp",
  DISCONNECT = "disconnect",
  CHECK = "check",
}

export const connectSchema = z.object({
  intent: z.literal(IntegrationIntent.CONNECT),
  integration: z.string().min(1),
});

export const disconnectSchema = z.object({
  intent: z.literal(IntegrationIntent.DISCONNECT),
  integration: z.string().min(1),
});

export const checkSchema = z.object({
  intent: z.literal(IntegrationIntent.CHECK),
  integration: z.string().min(1),
});

// export const refreshMailchimpSchema = z.object({
//   intent: z.literal(IntegrationIntent.REFRESHMAILCHIMP),
// });

export const integrationSchema = z.discriminatedUnion("intent", [
  connectSchema,
  // refreshMailchimpSchema,
  disconnectSchema,
  checkSchema,
]);
