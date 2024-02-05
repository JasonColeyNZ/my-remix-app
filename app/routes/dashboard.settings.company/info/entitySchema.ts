import { z } from "zod";
import { addressSchema } from "~/components/form-controls/address/address-schema";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema";

export const entitySchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  id: z.string().min(1),
  name: z.string().min(2, "Please provide the Company name"),
  workNumber: z.string().optional(),
  mobileNumber: z.string().optional(),
  address: z.object(addressSchema).optional(),
});
