import { z } from "zod";

export const locationSchema = z.object({
  intent: z.literal("change-location"),
  locationId: z.string(),
});
