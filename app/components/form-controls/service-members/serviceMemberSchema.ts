import { z } from "zod";
// import { TrackingType } from "~/utils/types";

export const serviceMemberSchema = z.object({
  userId: z.string(),
  // trackingType: z
  //   .string()
  //   .optional()
  //   .default("off")
  //   .transform((val) =>
  //     val === "on" ? TrackingType.UNIT : TrackingType.CONSUMABLE,
  //   ),
  // qty: z.number(),
});

export type ServiceMemberSchemaType = z.infer<typeof serviceMemberSchema>;
