import { z } from "zod";

export const addSignatureValidator = z.object({
  id: z.string(),
  signature: z.string().min(1, ""),
});
