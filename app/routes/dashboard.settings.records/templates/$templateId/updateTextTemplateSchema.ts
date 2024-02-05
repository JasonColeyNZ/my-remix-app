import { z } from "zod";

export const updateTextTemplateSchema = z.object({
  id: z.string(),
  text: z.string(),
});
