import { z } from "zod";

export enum addUpdateBookingIntent {
  ADDBOOKING = "ADDBOOKING",
  UPDATECLIENT = "UPDATECLIENT",
  UPDATEBOOKING = "UPDATEBOOKING",
  UPDATESERVICE = "UPDATESERVICE",
}

export const addBookingSchema = z.object({
  intent: z.literal(addUpdateBookingIntent.ADDBOOKING),
  clientId: z.string(),
});

export const updateBookingClientSchema = z.object({
  intent: z.literal(addUpdateBookingIntent.UPDATECLIENT),
  id: z.string(),
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

export const updateBookingServicesSchema = z.object({
  intent: z.literal(addUpdateBookingIntent.UPDATESERVICE),
  id: z.string(),
  services: z.string().transform((val) => (val ? val.split(",") : [])),
});

export const BookingSchema = z.discriminatedUnion("intent", [
  addBookingSchema,
  updateBookingClientSchema,
  updateBookingSchema,
  updateBookingServicesSchema,
]);
