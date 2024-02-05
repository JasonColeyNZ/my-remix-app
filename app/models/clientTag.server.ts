import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

// type ClientTagType = {
//   id: string;
//   clientId: string;
//   tagId: string;
// };

export async function createClientTag(
  { clientId, tagId }: { clientId: string; tagId: string },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).clientTag.create({
    data: {
      clientId: clientId,
      tagId: tagId,
    },
  });
  return data;
}

export async function removeClientTag(
  { clientId, tagId }: { clientId: string; tagId: string },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).clientTag.deleteMany({
    where: {
      clientId: clientId,
      tagId: tagId,
    },
  });
  return data;
}
