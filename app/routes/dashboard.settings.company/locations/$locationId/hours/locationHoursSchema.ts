import { z } from "zod";

export enum LocationHourFormIntent {
  ADD = "add",
  UPDATE = "update",
  DELETE = "delete",
}

const defaultHoursSchema = z.object({
  dayOfWeek: z.string(),
  start: z.string(),
  end: z.string(),
});

const createHoursSchema = defaultHoursSchema.extend({
  intent: z.literal(LocationHourFormIntent.ADD),
});

const updateHoursSchema = defaultHoursSchema.extend({
  intent: z.literal(LocationHourFormIntent.UPDATE),
  id: z.string().min(1, "Please select a Location Hour"),
});

const deleteHoursSchema = z.object({
  intent: z.literal(LocationHourFormIntent.DELETE),
  id: z.string().min(1, "Please select a Location Hour"),
});

export const locationHoursSchema = z.discriminatedUnion("intent", [
  createHoursSchema,
  updateHoursSchema,
  deleteHoursSchema,
]);
