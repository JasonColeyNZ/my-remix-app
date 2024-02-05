import { z } from "zod";
import { EmailSchema } from "~/utils/user-validation.ts";

export const resetSchema = z.object({
  intent: z.literal("reset-password"),
  email: EmailSchema,
});
