import { z } from "zod";

export enum BookingFormIntent {
  CREATE = "create",
  UPDATE = "update",
}

const defaultBookingSchema = z.object({
  clientId: z.string().min(1, "Please select a Client"),
  userId: z.string().min(1, "Please select a Team member"),
  services: z.array(z.string()).min(1, "Please select a Service"),
  startDate: z.string().min(1, "Please select a Start Date"),
  endDate: z.string().min(1, "Please select a End Date"),
  description: z.string().min(1, "Please enter a Description"),
});

const createBookingSchema = defaultBookingSchema.extend({
  intent: z.literal(BookingFormIntent.CREATE),
});

const updateBookingSchema = defaultBookingSchema.extend({
  intent: z.literal(BookingFormIntent.UPDATE),
  id: z.string().min(1, "Please select a Booking"),
});

export const bookingSchema = z.discriminatedUnion("intent", [
  createBookingSchema,
  updateBookingSchema,
]);
