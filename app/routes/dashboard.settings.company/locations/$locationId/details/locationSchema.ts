import { z } from "zod";
import { addressSchema } from "~/components/form-controls/address/address-schema";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema";

export const locationSchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  id: z.string(),
  name: z.string().min(2, "Please include a name"),
  workNumber: z.string().optional(),
  mobileNumber: z.string().optional(),
  address: z.object(addressSchema).optional(),
});
