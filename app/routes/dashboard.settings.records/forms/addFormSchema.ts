import { z } from "zod";
import { AreaType } from "~/components/draggable-forms-editor/types";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema";

export const addFormSchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  name: z.string().min(2, "Please include a name"),
  description: z.string().optional(),
  area: z.nativeEnum(AreaType),
});

export type AddFormSchema = z.infer<typeof addFormSchema>;
