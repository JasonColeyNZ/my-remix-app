import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

type LocationHourItemType = {
  id?: string;
  dayOfWeek: string;
  start: string;
  end: string;
  // include: boolean;
};

export async function addLocationHours(
  {
    locationId,
    hour,
  }: {
    locationId: string;
    hour: LocationHourItemType;
  },
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).locationHours.create({
    data: {
      locationId,
      dayOfWeek: hour.dayOfWeek,
      start: hour.start,
      end: hour.end,
    },
  });
}

export async function updateLocationHours(
  {
    locationId,
    hour,
  }: {
    locationId: string;
    hour: LocationHourItemType;
  },
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).locationHours.update({
    where: { id: hour.id },
    data: {
      locationId,
      dayOfWeek: hour.dayOfWeek,
      start: hour.start,
      end: hour.end,
    },
  });
}

export async function deleteLocationHours(
  {
    id,
  }: {
    id: string;
  },
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).locationHours.delete({
    where: { id },
  });
}
