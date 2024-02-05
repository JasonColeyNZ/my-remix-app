import { z } from "zod";
import { zx } from "zodix";
import { productSchema } from "~/components/form-controls/products-on-service-select/productSchema";
import { serviceAddonSchema } from "~/components/form-controls/service-addon/serviceAddonSchema";
import { serviceMemberSchema } from "~/components/form-controls/service-members/serviceMemberSchema";
import {
  formViewerIntent,
  // formViewerProductListIntent,
} from "~/components/form-viewer/formViewerSchema.ts";

const serviceSchema = z.object({
  id: z.string(),
  //entityId: z.string(),
  categoryId: z.string(),
  name: z.string().min(2, "Please include a name"),
  //description: z.string().nullable(),
  color: z
    .string()
    .nullish()
    .transform((val) => (val ? val.trim() : "")),
  textColor: z
    .string()
    .nullish()
    .transform((val) => (val ? val.trim() : "")),
  duration: z.string(),
  timeMargin: z.string().nullable(),
  locations: z.array(z.string()), // string().transform((val) => (val ? val.trim().split(",") : [])),
  users: z.array(serviceMemberSchema).optional(),
  forms: z
    .string()
    .optional()
    .transform((val) => (val ? val.trim().split(",") : [])),
  products: z.array(productSchema).optional(),
  consents: z.array(z.string()).optional(),
  // .string()
  // .optional()
  // .transform((val) => (val ? val.trim().split(",") : [])),
  // questionnaires: z.string().optional(),
  price: zx.NumAsString,
  maximumConcurrentBookings: zx.IntAsString,
  addon: serviceAddonSchema,
  //roomId: z.string().nullable(),
});

export const createServiceSchema = serviceSchema.extend({
  intent: z.literal(formViewerIntent.CREATE),
});
export const updateServiceSchema = serviceSchema.extend({
  intent: z.literal(formViewerIntent.UPDATE),
});

// const UpdateServiceProductSchema = z.object({
//   intent: z.literal(formViewerProductListIntent.UPDATE),
//   id: z.string(),
//   products: z.array(productSchema).optional(),
// });
// const service = {
//   ...result.data,
//   users: result.data.users === "" ? [] : result.data.users.trim().split(";"),
//   forms: result.data.forms === "" ? [] : result.data.forms.trim().split(";"),
// };

export const ServiceSchema = z.discriminatedUnion("intent", [
  createServiceSchema,
  updateServiceSchema,
  // UpdateServiceProductSchema,
]);
