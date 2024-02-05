import { z } from "zod";
import { TrackingType } from "~/utils/types";

export const serviceSchema = z.object({
  // id: z.string(),
  serviceId: z.string(),
  trackingType: z
    .string()
    .optional()
    .default("off")
    .transform((val) =>
      val === "on" ? TrackingType.UNIT : TrackingType.CONSUMABLE,
    ),
  qty: z.number(),
});

export type ServiceSchemaType = z.infer<typeof serviceSchema>;
