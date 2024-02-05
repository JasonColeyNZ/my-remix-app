import { UnitOfMeasure } from "@prisma/client";
import { z } from "zod";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";

export const questionSchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  id: z.string().min(1),
  name: z.string().min(2, "Please provide a name for the product"),
  description: z.string().optional(),
  unitOfMeasure: z.nativeEnum(UnitOfMeasure),
  productTypeId: z.string().min(1, "Please select a product type"),
});
