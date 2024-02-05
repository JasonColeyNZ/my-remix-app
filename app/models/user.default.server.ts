import type { Prisma } from "@prisma/client";
import type { User as supabaseUser } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import { TableTypes } from "~/utils/types.ts";

export async function setLocationDefault(
  userId: string,
  locationId: string,
  sbUser: supabaseUser,
) {
  const userDefault = await authenticatedPrismaClient(
    sbUser,
  ).userDefaults.findUnique({
    where: { userId },
  });
  userDefault
    ? await authenticatedPrismaClient(sbUser).userDefaults.update({
        where: {
          userId,
        },
        data: {
          locationId,
        },
      })
    : await authenticatedPrismaClient(sbUser).userDefaults.create({
        data: {
          userId,
          locationId,
        },
      });
}

export async function getLocationDefault(userId: string, sbUser: supabaseUser) {
  const userDefault = await authenticatedPrismaClient(
    sbUser,
  ).userDefaults.findUnique({
    where: { userId },
  });
  if (!userDefault) {
    //get the first location that isn't a demo?
    const location = await authenticatedPrismaClient(sbUser).location.findFirst(
      {
        where: {
          entityId: sbUser.app_metadata.entityId,
          demo: false,
        },
        select: {
          id: true,
        },
      },
    );

    await authenticatedPrismaClient(sbUser).userDefaults.create({
      data: {
        userId,
        locationId: location?.id ?? "",
      },
    });
    return location?.id ?? "";
  }
  return userDefault?.locationId ?? "";
}

export async function setTableDefault(
  table: string,
  data: string,
  sbUser: supabaseUser,
) {
  const parsedData = JSON.parse(data) as Prisma.JsonArray;

  const userDefault = await authenticatedPrismaClient(
    sbUser,
  ).userDefaults.findUnique({
    where: { userId: sbUser.id },
  });

  if (userDefault) {
    let saveData = {};

    switch (table) {
      case TableTypes.CLIENTS:
        saveData = { clientTable: parsedData };
        break;
      case TableTypes.CLIENT_BOOKINGS:
        saveData = { clientBookingTable: parsedData };
        break;
      case TableTypes.CLIENT_NOTES:
        saveData = { clientNoteTable: parsedData };
        break;
      case TableTypes.CLIENT_RECORDS:
        saveData = { clientRecordTable: parsedData };
        break;
      case TableTypes.CLIENT_MESSAGES:
        saveData = { clientMessageTable: parsedData };
        break;
      case TableTypes.CLIENT_CONSENTS:
        saveData = { clientConsentTable: parsedData };
        break;
      case TableTypes.MEMBERS:
        saveData = { memberTable: parsedData };
      case TableTypes.MEMBER_NOTES:
        saveData = { memberNoteTable: parsedData };
        break;
      default:
        break;
    }
    if (saveData)
      await authenticatedPrismaClient(sbUser).userDefaults.update({
        where: {
          userId: sbUser.id,
        },
        data: {
          ...saveData,
        },
      });
  } else {
    switch (table) {
      case TableTypes.CLIENTS:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, clientTable: parsedData },
        });
        break;
      case TableTypes.CLIENT_BOOKINGS:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, clientBookingTable: parsedData },
        });
        break;
      case TableTypes.CLIENT_NOTES:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, clientNoteTable: parsedData },
        });
        break;
      case TableTypes.CLIENT_RECORDS:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, clientRecordTable: parsedData },
        });
        break;
      case TableTypes.CLIENT_MESSAGES:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, clientMessageTable: parsedData },
        });
        break;
      case TableTypes.CLIENT_CONSENTS:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, clientConsentTable: parsedData },
        });
        break;

      case TableTypes.MEMBERS:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, memberTable: parsedData },
        });
        break;
      case TableTypes.MEMBER_NOTES:
        await authenticatedPrismaClient(sbUser).userDefaults.create({
          data: { userId: sbUser.id, memberNoteTable: parsedData },
        });
        break;

      default:
        break;
    }
  }
}

export async function getTableDefault(table: string, sbUser: supabaseUser) {
  const userDefault = await authenticatedPrismaClient(
    sbUser,
  ).userDefaults.findUnique({
    where: { userId: sbUser.id },
    select: {
      clientTable: table === TableTypes.CLIENTS,
      clientBookingTable: table === TableTypes.CLIENT_BOOKINGS,
      clientNoteTable: table === TableTypes.CLIENT_NOTES,
      clientRecordTable: table === TableTypes.CLIENT_RECORDS,
      clientMessageTable: table === TableTypes.CLIENT_MESSAGES,
      clientConsentTable: table === TableTypes.CLIENT_CONSENTS,
      memberTable: table === TableTypes.MEMBERS,
      memberNoteTable: table === TableTypes.MEMBER_NOTES,
      productTable: table === TableTypes.PRODUCTS,
    },
    // cacheStrategy: { ttl: 600 },
  });
  switch (table) {
    case TableTypes.CLIENTS:
      return userDefault?.clientTable ?? [];
    case TableTypes.CLIENT_BOOKINGS:
      return userDefault?.clientBookingTable ?? [];
    case TableTypes.CLIENT_NOTES:
      return userDefault?.clientNoteTable ?? [];
    case TableTypes.CLIENT_RECORDS:
      return userDefault?.clientRecordTable ?? [];
    case TableTypes.CLIENT_MESSAGES:
      return userDefault?.clientMessageTable ?? [];
    case TableTypes.CLIENT_CONSENTS:
      return userDefault?.clientConsentTable ?? [];
    case TableTypes.MEMBERS:
      return userDefault?.memberTable ?? [];
    case TableTypes.MEMBER_NOTES:
      return userDefault?.memberNoteTable ?? [];
    case TableTypes.PRODUCTS:
      return userDefault?.productTable ?? [];
    default:
      return [];
  }
}
