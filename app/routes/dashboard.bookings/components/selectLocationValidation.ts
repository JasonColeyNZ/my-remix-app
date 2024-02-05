import { z } from "zod";

export const selectLocationValidation = z.object({
  locationId: z.string(),
});
