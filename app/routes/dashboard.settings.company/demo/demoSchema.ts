import { z } from "zod";

export enum DemoFormIntent {
  INSTALL = "add-demo-data",
  UNINSTALL = "remove-demo-data",
}

export const demoSchema = z.object({
  intent: z.nativeEnum(DemoFormIntent),
});
