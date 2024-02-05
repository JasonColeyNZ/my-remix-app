import { z } from "zod";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema";
import { EmailSchema, PasswordSchema } from "~/utils/user-validation.ts";

export const createAccountSchema = z.object({
  intent: z.literal(formViewerIntent.CREATE),
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
  firstName: z.string().min(2, "Please enter a value"),
  lastName: z.string().min(2, "Please enter a value"),
  // company: z.string().min(2, "Please enter a value"),
  // location: z.string().min(2, "Please enter a value"),
  // installDemo: z
  //   .string()
  //   .optional()
  //   .default("off")
  //   .transform((val) => val === "on"),
});
