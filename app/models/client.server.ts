import type { Client } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { SupabaseClient, User } from "@supabase/supabase-js";
import type { FormDefinition } from "~/components/draggable-forms-editor/types.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
// import { prisma } from "~/db.server.ts";
import type { ImageUploadDataType } from "~/utils/types.ts";

import type { AddressType } from "./address.server.ts";
import { getFormById } from "./form.server.ts";
import type { TagItemType } from "./tag.server.ts";
import { saveImageToSupabase } from "~/services/supabase-bucket.ts";

export type ClientsItemType = {
  id: Client["id"];
  firstName: Client["firstName"];
  lastName: Client["lastName"];
  email: Client["email"];
  mobileNumber: Client["mobileNumber"];
  avatarData: Partial<ImageUploadDataType> | null;
  lastBooking: string | null;
};

export type ClientsItemsType = ClientsItemType[];
export async function getClients(sbUser: User) {
  const clients = await authenticatedPrismaClient(sbUser).client.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      mobileNumber: true,
      avatarData: true,
      bookings: {
        orderBy: { startDate: "desc" },
        select: {
          startDate: true,
          services: {
            select: {
              service: {
                select: {
                  name: true,
                  color: true,
                  category: {
                    select: {
                      color: true,
                    },
                  },
                },
              },
            },
          },
        },
        take: 1,
      },
    },
    orderBy: { lastName: "asc" },
    // cacheStrategy: { ttl: 60 },
  });
  // console.log("getClients.avatardata: ", clients[0].avatarData?.toString());
  return clients.map((client) => {
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      mobileNumber: client.mobileNumber,
      avatarData: client.avatarData || "{}",
      lastBooking:
        client.bookings.length > 0
          ? `${client.bookings[0].startDate}||${client.bookings[0].services
              .map((service) => {
                return `${service.service.name}|${
                  service.service.color
                    ? service.service.color
                    : service.service.category.color
                }`;
              })
              .join(",")}`
          : null,
    };
  }) as ClientsItemsType;
}

export async function getPaginatedClients(
  { skip, take }: { skip: number; take: number },
  sbUser: User,
) {
  const clients = await authenticatedPrismaClient(sbUser).client.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      mobileNumber: true,
      avatarData: true,
    },
    orderBy: { lastName: "asc" },
    skip: skip,
    take: take,
  });

  return clients.map((client) => {
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      email: client.email,
      mobileNumber: client.mobileNumber,
      avatarData: client.avatarData || "{}",
    };
  });
}

export async function getTotalClients(sbUser: User) {
  return authenticatedPrismaClient(sbUser).client.count();
}

export type ClientItemType = {
  id: Client["id"];
  firstName: Client["firstName"];
  lastName: Client["lastName"];
  email: Client["email"];
  mobileNumber: Client["mobileNumber"];
  dateOfBirth: string | null;
  occupation: Client["occupation"];
  homeNumber: Client["homeNumber"];
  maritalStatus: Client["maritalStatus"];
  preferredName: Client["preferredName"];
  countryOfBirth: Client["countryOfBirth"];
  workNumber: Client["workNumber"];
  formData: Client["formData"];
  formId: Client["formId"];
  avatarData: Partial<ImageUploadDataType> | null;
  address?: AddressType;
  tags: TagItemType[] | null;
  mailingLists: TagItemType[] | null;
};

export async function getClientById({ id }: Pick<Client, "id">, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      firstName: "",
      lastName: "",
      email: "",
      mobileNumber: "",
      dateOfBirth: null,
      occupation: "",
      homeNumber: "",
      maritalStatus: "",
      preferredName: "",
      countryOfBirth: "",
      workNumber: "",
      formData: {},
      formId: "",
      tags: null,
      mailingLists: null,
      avatarData: {
        fileName: "",
        storageKey: "",
        publicUrl: "",
        signedUrl: "",
      },
    };
  }

  let data = await authenticatedPrismaClient(sbUser).client.findFirst({
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      dateOfBirth: true,
      mobileNumber: true,
      occupation: true,
      homeNumber: true,
      maritalStatus: true,
      preferredName: true,
      countryOfBirth: true,
      workNumber: true,
      formData: true,
      formId: true,
      avatarData: true,
      tags: {
        select: {
          id: true,
          tag: {
            select: {
              id: true,
              name: true,
              color: true,
              textColor: true,
              integrationTagId: true,
            },
          },
        },
      },
      address: {
        select: {
          id: true,
          streetAddress: true,
          streetAddress2: true,
          city: true,
          state: true,
          zipCode: true,
          country: true,
        },
      },
    },
    where: { id, entityId: sbUser.app_metadata.entityId },
  });

  //  data = flattenFormData(data);

  // console.log("getClientById: ", data);
  if (!data) {
    throw new Error("Client not found");
  }

  return {
    ...data,
    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.toISOString() : "",
    tags: data.tags
      ? data.tags
          .filter((tag) => tag.tag.integrationTagId === null)
          .map((tag) => {
            return {
              ...tag.tag,
            };
          })
      : null,
    mailingLists: data.tags
      ? data.tags
          .filter((tag) => tag.tag.integrationTagId !== null)
          .map((tag) => {
            return {
              ...tag.tag,
            };
          })
      : null,
    avatarData:
      data.avatarData ||
      `{ "fileName": "", "storageKey": "", "publicUrl": "", "signedUrl": ""}`,
  } as ClientItemType;
}

export type addUpdateClientItemType = {
  id: Client["id"];
  firstName: Client["firstName"];
  lastName: Client["lastName"];
  email: Client["email"];
  mobileNumber?: Client["mobileNumber"];
  dateOfBirth?: Client["dateOfBirth"];
  occupation?: Client["occupation"];
  homeNumber?: Client["homeNumber"];
  maritalStatus?: Client["maritalStatus"];
  preferredName?: Client["preferredName"];
  countryOfBirth?: Client["countryOfBirth"];
  workNumber?: Client["workNumber"];
  formData: Client["formData"];
  formId: Client["formId"];
  avatarData: ImageUploadDataType | null;
};

export async function addUpdateClient(
  {
    id,
    firstName,
    lastName,
    email,
    mobileNumber,
    dateOfBirth,
    occupation,
    homeNumber,
    maritalStatus,
    preferredName,
    countryOfBirth,
    workNumber,
    formData,
    formId,
    avatarData,
  }: {
    id: Client["id"];
    firstName: Client["firstName"];
    lastName: Client["lastName"];
    email: Client["email"];
    mobileNumber?: Client["mobileNumber"];
    dateOfBirth?: Client["dateOfBirth"];
    occupation?: Client["occupation"];
    homeNumber?: Client["homeNumber"];
    maritalStatus?: Client["maritalStatus"];
    preferredName?: Client["preferredName"];
    countryOfBirth?: Client["countryOfBirth"];
    workNumber?: Client["workNumber"];
    formData: Client["formData"];
    formId: Client["formId"];
    avatarData: ImageUploadDataType | null;
  },
  sbUser: User,
  supabase: SupabaseClient,
) {
  if (id === "new") {
    try {
      const client = await authenticatedPrismaClient(sbUser).client.create({
        data: {
          firstName,
          lastName,
          email,
          mobileNumber,
          dateOfBirth,
          occupation,
          homeNumber,
          maritalStatus,
          preferredName,
          countryOfBirth,
          workNumber,
          formId,
          formData: formData != null ? formData : Prisma.JsonNull,
        },
      });

      if (avatarData?.file) {
        // console.log("avatarData: ", avatarData);
        const { file, ...rest } = avatarData;
        avatarData = rest;
        const savedData = await saveImageToSupabase(
          supabase,
          sbUser,
          client.id,
          "avatarData",
          file,
          avatarData.storedFileName,
        );
        avatarData = {
          fileName: avatarData.fileName,
          storageKey: savedData.storageKey,
          publicUrl: savedData.publicUrl,
          signedUrl: "",
          storedFileName: savedData.storedFileName,
        };
      }

      return {
        ...client,
        dateOfBirth: client ? client.dateOfBirth?.toISOString() : "",
        avatarData: client.avatarData || "{}",
      };
    } catch (e) {
      console.log("create client error ", e);
      // if (e instanceof Prisma.PrismaClientValidationError) {
      //   captureException(e);
      //   //Sentry
      //   //Bugsnag.notify(new Error(`PrismaClientValidationError: ${e.message}`));
      // }
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   captureException(e);
      //   // Bugsnag.notify(
      //   //   new Error(`PrismaClientKnownRequestError: ${e.message}`)
      //   // );
      // }
    }
  } else {
    try {
      // console.log("avatarData: ", avatarData);
      if (avatarData?.file) {
        // console.log("avatarData: ", avatarData);
        const { file, ...rest } = avatarData;
        avatarData = rest;
        const savedData = await saveImageToSupabase(
          supabase,
          sbUser,
          id,
          "avatarData",
          file,
          avatarData.storedFileName,
        );
        avatarData = {
          fileName: avatarData.fileName,
          storageKey: savedData.storageKey,
          publicUrl: savedData.publicUrl,
          signedUrl: "",
          storedFileName: savedData.storedFileName,
        };
      }

      const client = await authenticatedPrismaClient(sbUser).client.update({
        data: {
          firstName,
          lastName,
          email,
          mobileNumber,
          occupation,
          homeNumber,
          maritalStatus,
          preferredName,
          countryOfBirth,
          workNumber,
          dateOfBirth,
          avatarData: avatarData != null ? avatarData : Prisma.JsonNull,
        },
        where: {
          id,
        },
      });
      return {
        ...client,
        dateOfBirth: client ? client.dateOfBirth?.toISOString() : "",
        avatarData: client.avatarData || "{}",
      };
    } catch (e) {
      console.log("update client error ", e);
      // if (e instanceof Prisma.PrismaClientValidationError) {
      //   captureException(e);
      //   //Bugsnag.notify(new Error(`PrismaClientValidationError: ${e.message}`));
      // }
      // if (e instanceof Prisma.PrismaClientKnownRequestError) {
      //   captureException(e);
      //   // Bugsnag.notify(
      //   //   new Error(`PrismaClientKnownRequestError: ${e.message}`)
      //   // );
      // }
    }
  }
}

export async function addUpdateClientAvatar(
  {
    id,
    avatarData,
  }: {
    id: Client["id"];
    avatarData: string;
  },
  sbUser: User,
) {
  try {
    const client = await authenticatedPrismaClient(sbUser).client.update({
      data: {
        avatarData: avatarData != null ? avatarData : Prisma.JsonNull,
      },
      where: {
        id,
      },
    });
    return {
      ...client,
      avatarData: client.avatarData || "{}",
    };
  } catch (e) {}
}

export async function deleteClient(id: string, sbUser: User) {
  return await authenticatedPrismaClient(sbUser).client.delete({
    where: { id },
  });
}

// export async function createClient({
//   id,
//   entityId,
//   firstName,
//   lastName,
//   email,
//   mobileNumber,
//   //dateOfBirth,
//   occupation,
//   homeNumber,
//   maritalStatus,
//   preferredName,
//   countryOfBirth,
//   workNumber,
//   formId,
//   formData,
// }: {
//   id: Client["id"];
//   entityId: Entity["id"];
//   firstName: Client["firstName"];
//   lastName: Client["lastName"];
//   email: Client["email"];
//   mobileNumber?: Client["mobileNumber"];
//   //dateOfBirth?: Client["dateOfBirth"];
//   occupation?: Client["occupation"];
//   homeNumber?: Client["homeNumber"];
//   maritalStatus?: Client["maritalStatus"];
//   preferredName?: Client["preferredName"];
//   countryOfBirth?: Client["countryOfBirth"];
//   workNumber?: Client["workNumber"];
//   formId: Client["formId"];
//   formData: Client["formData"];
// }) {
//   return await prisma.client.create({
//     data: {
//       entity: {
//         connect: { id: entityId },
//       },
//       firstName,
//       lastName,
//       email,
//       mobileNumber,
//       //dateOfBirth,
//       occupation,
//       homeNumber,
//       maritalStatus,
//       preferredName,
//       countryOfBirth,
//       workNumber,
//       formId,
//       formData: formData != null ? formData : Prisma.JsonNull,
//     },
//   });
// }

// export async function checkClientUniqueInEntity({
//   email,
//   entityId,
// }: {
//   email: Client["email"];
//   entityId: Entity["id"];
// }) {
//   return prisma.client.findUnique({
//     where: { email },
//     select: {
//       email: true,
//     },
//   });
// }

export async function processClientFormData(
  client: ClientItemType,
  formDefinition: FormDefinition,
  sbUser: User,
) {
  if (!client) throw new Error("Client not found");
  const form = await getFormById({ id: client.formId }, sbUser);
  if (!form) {
    throw new Error("Form not found");
  }

  client = { ...client, ...formDefinition.usedFormFields };
  if (client.formData && typeof client.formData === "object") {
    client = { ...client, ...client.formData };
    client.formData = null; // Prisma.JsonNull;
  }

  return { client, formDefinition };
}
