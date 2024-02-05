import { z } from "zod";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";

export const categorySchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  id: z.string(),
  name: z.string().min(2, "Please include a name"),
  color: z.string(),
  textColor: z.string(),
});
