import { z } from "zod";

export enum SystemInfoFormIntent {
  UPDATE = "update",
}
export const updateSystemSchema = z.object({
  intent: z.nativeEnum(SystemInfoFormIntent),
  id: z.string(),

  unit: z.string().min(2, "Please include a unit"),
  language: z.string().min(2, "Please include a language"),
  theme: z.string().min(2, "Please include a theme"),
  dateFormat: z.string().min(2, "Please include a date format"),
  timeFormat: z.string().min(2, "Please include a time format"),
  timeZone: z.string().min(2, "Please include a time zone"),
});
