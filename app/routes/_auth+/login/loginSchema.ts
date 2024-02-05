import { z } from "zod";

import { EmailSchema, PasswordSchema } from "~/utils/user-validation.ts";

export enum LoginFormIntent {
  EMAIL = "email",
  PROVIDER = "provider",
}

export const emailLoginSchema = z.object({
  intent: z.literal(LoginFormIntent.EMAIL),
  email: EmailSchema,
  password: PasswordSchema,
  remember: z
    .string()
    .optional()
    .default("off")
    .transform((val) => val === "on"),
});

// const providerLoginSchema = z.object({
//   intent: z.literal(LoginFormIntent.PROVIDER),
//   provider: z.literal("github"),
// });

// export const loginSchema = z.discriminatedUnion("intent", [
//   emailLoginSchema,

//   providerLoginSchema,
// ]);
