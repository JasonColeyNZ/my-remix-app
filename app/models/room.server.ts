import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

export async function getRoomById(roomId: string, sbUser: User) {
  const room = (await authenticatedPrismaClient(sbUser).room.findUnique({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      name: true,
      services: {
        select: {
          service: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  })) as { id: string; name: string; services: { service: { id: string } }[] };
  return { ...room, services: room.services.map((s) => s.service.id) };
}

type AddRoomType = {
  id: string;
  name: string;
};

export async function addRoom(locationId: string, sbUser: User) {
  //get count of rooms for this location
  const roomCount = await authenticatedPrismaClient(sbUser).room.count({
    where: {
      locationId,
    },
  });

  return (await authenticatedPrismaClient(sbUser).room.create({
    data: {
      locationId,
      name: `Room ${roomCount + 1}`,
    },
  })) as AddRoomType;
}

export async function updateRoom(
  { id, name, services }: { id: string; name: string; services: string[] },
  sbUser: User,
) {
  const room = await authenticatedPrismaClient(sbUser).room.update({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  for (let i = 0; i < services.length; i++) {
    await authenticatedPrismaClient(sbUser).servicesOnRooms.upsert({
      where: {
        serviceId_roomId: {
          serviceId: services[i],
          roomId: id,
        },
      },
      update: {},
      create: {
        serviceId: services[i],
        roomId: id,
      },
    });
  }

  //remove services not in services array
  await authenticatedPrismaClient(sbUser).servicesOnRooms.deleteMany({
    where: {
      roomId: id,
      NOT: {
        serviceId: {
          in: services,
        },
      },
    },
  });

  return room;
}

export async function deleteRoom(id: string, sbUser: User) {
  return await authenticatedPrismaClient(sbUser).room.delete({
    where: {
      id,
    },
  });
}
