import { z } from "zod";
// import { zx } from "zodix";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";

export const modulePermissionSchema = z.object({
  id: z.string().min(1),
  // modulePermissionId: z.string().min(1),
  name: z.string().min(1),
  checked: z.boolean().optional(),
  rolePermissionId: z
    .string()
    .min(1)
    .optional()
    .transform((v) => v ?? ""),
});

export const moduleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  modulePermissions: z.array(modulePermissionSchema),
});

export const roleSchema = z.object({
  intent: z.nativeEnum(formViewerIntent),
  id: z.string().min(1),
  name: z.string().min(1),
  modules: z.array(moduleSchema),
});

export type RoleType = z.infer<typeof roleSchema>;
export type ModuleType = z.infer<typeof moduleSchema>;
export type ModulePermissionType = z.infer<typeof modulePermissionSchema>;
