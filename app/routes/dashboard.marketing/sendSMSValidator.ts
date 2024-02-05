import { z } from "zod";

export const sendSMSValidator = z.object({
  phoneNumber: z.string(),
  message: z.string(),
});
