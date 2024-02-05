import { z } from "zod";
import { zx } from "zodix";
// import { TrackingType } from "~/utils/types";
// import { safePreprocessor, stringToNumberSchema } from "~/utils/zod-utils";

export const serviceAddonSchema = z.object({
  isAddon: z
    .string()
    .optional()
    .default("off")
    .transform((val) => (val === "on" ? true : false)),
  addonPrice: zx.NumAsString.optional(),
  addonDuration: z.string().optional(),
  addonTimeMargin: z.string().optional(),
  servicesAddon: z.array(z.string()),
});

export type ServiceAddonSchemaType = z.infer<typeof serviceAddonSchema>;
