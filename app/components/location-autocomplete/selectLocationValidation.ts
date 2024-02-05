import { z } from "zod";

export const selectLocationValidation = z.object({
  action: z.literal("location-select"),
  locationId: z.string(),
});
