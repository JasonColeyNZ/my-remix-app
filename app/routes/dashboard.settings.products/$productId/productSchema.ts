import { z } from "zod";
import { serviceSchema } from "~/components/form-controls/services-on-product-select/serviceSchema";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import { UnitOfMeasure } from "~/utils/types";

export const productSchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  id: z.string().min(1),
  name: z.string().min(2, "Please provide a name for the product"),
  description: z.string().optional(),
  unitOfMeasure: z.nativeEnum(UnitOfMeasure),
  productTypeId: z.string().min(1, "Please select a product type"),
  services: z.array(serviceSchema).optional(),
});
