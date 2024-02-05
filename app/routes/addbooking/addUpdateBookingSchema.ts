import { z } from "zod";

export enum addUpdateBookingIntent {
  ADDBOOKING = "ADDBOOKING",
  UPDATEBOOKING = "UPDATEBOOKING",
}

export const addBookingSchema = z.object({
  intent: z.literal(addUpdateBookingIntent.ADDBOOKING),
  clientId: z.string(),
});

export const updateBookingSchema = z.object({
  intent: z.literal(addUpdateBookingIntent.UPDATEBOOKING),
  id: z.string(),
  clientId: z.string(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  color: z.string().optional(),
  textColor: z.string().optional(),
  services: z.string().transform((val) => (val ? val.split(",") : [])),
});

export const BookingSchema = z.discriminatedUnion("intent", [
  addBookingSchema,
  updateBookingSchema,
]);
