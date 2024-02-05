import { z } from "zod";
import { zx } from "zodix";
import { TrackingType } from "~/utils/types";

export const productSchema = z.object({
  // id: z.string(),
  productId: z.string(),
  trackingType: z
    .string()
    .optional()
    .default("off")
    .transform((val) =>
      val === "on" ? TrackingType.UNIT : TrackingType.CONSUMABLE,
    ),
  qty: zx.NumAsString,
});

export type ProductSchemaType = z.infer<typeof productSchema>;
