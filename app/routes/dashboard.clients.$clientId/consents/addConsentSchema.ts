import { z } from "zod";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema";

export const addConsentSchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  formId: z.string().min(2, "Please select a letter"),
});
