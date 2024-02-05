import { z } from "zod";

export enum RoomAndLocationIntent {
  ADDROOM = "add-room",
  DELETEROOM = "delete-room",
  ADDLOCATION = "add-location",
}

const addRoomSchema = z.object({
  intent: z.literal(RoomAndLocationIntent.ADDROOM),
  locationId: z.string(),
});

export const deleteRoomSchema = z.object({
  intent: z.literal(RoomAndLocationIntent.DELETEROOM),
  id: z.string(),
});

export const addLocationSchema = z.object({
  intent: z.literal(RoomAndLocationIntent.ADDLOCATION),
  name: z
    .string()
    .min(3, "Please enter a location name")
    .max(50, "Location name must be less than 50 characters"),
});

export const RoomAndLocationSchema = z.discriminatedUnion("intent", [
  addRoomSchema,
  deleteRoomSchema,
  addLocationSchema,
]);
