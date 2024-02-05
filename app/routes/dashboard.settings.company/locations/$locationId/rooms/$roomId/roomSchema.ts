import { z } from "zod";

export const roomSchema = z.object({
  id: z.string(),
  name: z.string().min(2, "Please include a name"),
  services: z.string(),
});
