import { z } from "zod";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";

export const memberRoleSchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  userId: z.string().min(1),
  roleId: z.string().min(1),
});

export type MemberRoleType = z.infer<typeof memberRoleSchema>;
