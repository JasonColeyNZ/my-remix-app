import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

//import { daysOfWeek } from "./../utils/scheduler/utils";
import type { AddressType } from "./address.server.ts";

type LocationRoomItemType = {
  id: string;
  name: string;
};

type LocationItemType = {
  id: string;
  name: string;
  rooms: LocationRoomItemType[];
};

export type LocationItemsType = LocationItemType[];
export async function getLocations(sbUser: User) {
  return (await authenticatedPrismaClient(sbUser).location.findMany({
    select: {
      name: true,
      id: true,
      rooms: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
    // cacheStrategy: { ttl: 60 },
  })) as LocationItemsType;
}

type LocationItemByIdType = {
  id: string;
  name: string;
  mobileNumber: string;
  workNumber: string;
  address: AddressType | null;
};

export async function getLocationById(id: string, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      name: "",
      mobileNumber: "",
      workNumber: "",
      address: null,
    };
  }
  const location = (await authenticatedPrismaClient(sbUser).location.findUnique(
    {
      where: { id },
      select: {
        name: true,
        id: true,
        mobileNumber: true,
        workNumber: true,
        address: {
          select: {
            id: true,
            streetAddress: true,
            streetAddress2: true,
            city: true,
            zipCode: true,
            state: true,
            country: true,
          },
        },
      },
    },
  )) as LocationItemByIdType;
  // location.mobileNumber = location.mobileNumber || "";
  // location.workNumber = location.workNumber || "";
  // location.address = location.address;
  // location.address.id = location.address.id || "";
  // location.address.streetAddress = location.address.streetAddress || "";
  // location.address.streetAddress2 = location.address.streetAddress2 || "";
  // location.address.city = location.address.city || "";
  // location.address.zipCode = location.address.zipCode || "";
  // location.address.state = location.address.state || "";
  // location.address.country = location.address.country || "";

  return location;
}

export type LocationHourItemType = {
  id: string;
  dayOfWeek: string;
  start: string;
  end: string;
  include: boolean;
};
export async function getLocationHours(locationId: string, sbUser: User) {
  return (await authenticatedPrismaClient(sbUser).locationHours.findMany({
    where: { locationId },
    select: {
      id: true,
      dayOfWeek: true,
      start: true,
      end: true,
      include: true,
    },
  })) as LocationHourItemType[];
}

export type LocationClosedHourItemType = {
  recurring: any;
  start: string;
  end: string;
};
export async function getAllLocationHours(locationId: string, sbUser: User) {
  const locationHours = (await authenticatedPrismaClient(
    sbUser,
  ).locationHours.findMany({
    where: { locationId },
    select: {
      id: true,
      dayOfWeek: true,
      start: true,
      end: true,
      include: true,
    },
  })) as LocationHourItemType[];

  const openDays =
    locationHours.length > 0
      ? locationHours.reduce((acc: string[], locationHour) => {
          //console.log(locationHour);
          if (!acc.includes(locationHour.dayOfWeek)) {
            acc.push(locationHour.dayOfWeek);
          }
          return acc;
        }, [])
      : [];

  const closedHours: LocationClosedHourItemType[] = [];
  for (let i = 0; i < locationHours.length; i++) {
    const locationHour = locationHours[i];

    closedHours.push({
      recurring: { repeat: "weekly", weekDays: locationHour.dayOfWeek },
      start: locationHour.end,
      end: "24:00",
    });
    closedHours.push({
      recurring: { repeat: "weekly", weekDays: locationHour.dayOfWeek },
      start: "00:01",
      end: locationHour.start,
    });
  }

  return { locationHours, closedHours, openDays };
}

export async function addLocation(
  entityId: string,
  name: string,
  sbUser: User,
  demo: boolean = false,
) {
  try {
    const location = await authenticatedPrismaClient(sbUser).location.create({
      data: {
        name,
        entityId,
        demo,
      },
    });
    return location;
  } catch (error) {
    return null;
  }
}

export async function updateLocation(
  {
    id,
    name,
    workNumber,
    mobileNumber,
    address,
  }: {
    id: string;
    name: string;
    workNumber?: string | null;
    mobileNumber?: string | null;
    address: AddressType | undefined;
  },
  sbUser: User,
) {
  if (address && !address.id) {
    //console.log("address", address);
    const newAddress = await authenticatedPrismaClient(sbUser).address.create({
      data: {
        streetAddress: address.streetAddress,
        streetAddress2: address.streetAddress2,
        city: address.city,
        zipCode: address.zipCode,
        state: address.state,
        country: address.country,
      },
    });
    address.id = newAddress.id;
    //console.log("newAddress", newAddress);

    return await authenticatedPrismaClient(sbUser).location.update({
      where: { id },
      data: {
        name,
        mobileNumber,
        workNumber,
        address: {
          connect: {
            id: newAddress.id,
          },
        },
      },
    });
  }

  //otherwise, lets update the existing address
  if (address && address.id) {
    return await authenticatedPrismaClient(sbUser).location.update({
      where: {
        id,
      },
      data: {
        name,
        workNumber,
        mobileNumber,
        address: {
          update: {
            streetAddress: address.streetAddress,
            streetAddress2: address.streetAddress2,
            city: address.city,
            zipCode: address.zipCode,
            state: address.state,
            country: address.country,
          },
        },
      },
    });
  }

  return await authenticatedPrismaClient(sbUser).location.update({
    where: {
      id,
    },
    data: {
      name,
      workNumber,
      mobileNumber,
    },
  });
}

export async function deleteLocation(id: string, sbUser: User) {
  try {
    await authenticatedPrismaClient(sbUser).location.delete({
      where: { id },
    });
    return 0;
  } catch (error) {
    return null;
  }
}
