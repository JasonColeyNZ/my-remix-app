import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { Message } from "~/db.server.ts";
import type { ImageUploadDataType } from "~/utils/types";

export type MessageItemType = {
  id: Message["id"];
  datetime: string;
  subject: Message["subject"];
  status: Message["status"];
  creator: {
    firstName: string;
    lastName: string;
    avatarData: ImageUploadDataType | null;
  };
};

export type MessageItemsType = MessageItemType[];
// export async function getMessages(sbUser: User) {
//   const data = await authenticatedPrismaClient(sbUser).message.findMany({
//     select: {
//       id: true,
//       datetime: true,
//       subject: true,
//       status: true,
//     },
//     orderBy: [{ datetime: "asc" }],
//   });
//   return data.map(
//     (item) =>
//       ({
//         id: item.id,
//         datetime: item.datetime.toISOString(),
//         subject: item.subject,
//         status: item.status,
//       }) as MessageItemType,
//   ) as MessageItemsType;
// }

export async function getClientMessages(clientId: string, sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).message.findMany({
    where: {
      clientId: clientId,
    },
    select: {
      id: true,
      datetime: true,
      subject: true,
      status: true,
      creator: {
        select: {
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
    },
    orderBy: [{ datetime: "asc" }],
  });

  return data.map(
    (item) =>
      ({
        id: item.id,
        datetime: item.datetime.toISOString(),
        subject: item.subject,
        status: item.status,
        creator: item.creator,
      }) as MessageItemType,
  ) as MessageItemsType;
}
