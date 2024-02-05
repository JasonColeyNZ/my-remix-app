import { z } from "zod";

export const updateLetterSchema = z.object({
  id: z.string(),
  text: z.string(),
});
