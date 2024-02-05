import { TagType, type Tag } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

export type TagItemType = {
  id: string;
  name: Tag["name"];
  color: Tag["color"];
  textColor: Tag["textColor"];
  tagType: Tag["tagType"];
  integrationTagId?: Tag["integrationTagId"];
  _count?: {
    clients: number;
  };
};
export type TagItemsType = TagItemType[];

export async function getTags(tagType: TagType, sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).tag.findMany({
    where: {
      tagType,
      entityId: sbUser.app_metadata.entityId,
    },
    select: {
      id: true,
      name: true,
      color: true,
      textColor: true,
      integrationTagId: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return data as TagItemsType;
}

export async function getTagById(id: string, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      name: "",
      color: "#5551CE",
      textColor: "#FFFFFF",
    } as TagItemType;
  }

  const data = await authenticatedPrismaClient(sbUser).tag.findUnique({
    where: {
      id,
      entityId: sbUser.app_metadata.entityId,
    },
    select: {
      id: true,
      name: true,
      color: true,
      textColor: true,
      tagType: true,
      integrationTagId: true,
      _count: {
        select: {
          clients: true,
        },
      },
    },
  });
  return data as TagItemType;
}

export async function createTag(
  tag: Partial<TagItemType>,
  sbUser: User,
  demo: boolean = false,
) {
  const data = await authenticatedPrismaClient(sbUser).tag.create({
    data: {
      name: tag.name ?? "",
      tagType: tag.tagType ?? TagType.Client,
      color: tag.color,
      textColor: tag.textColor,
    },
  });
  return data;
}

export async function updateTag(
  {
    id,
    name,
    color,
    textColor,
  }: { id: string; name: string; color: string; textColor: string },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).tag.update({
    where: {
      id,
      entityId: sbUser.app_metadata.entityId,
    },
    data: {
      name,
      color,
      textColor,
    },
  });
  return data as TagItemType;
}

export async function updateTagIntegrationLink(
  { id, integrationTagId }: { id: string; integrationTagId: string },
  sbUser: User,
) {
  const oldTagId = await authenticatedPrismaClient(sbUser).tag.findFirst({
    where: {
      integrationTagId,
      entityId: sbUser.app_metadata.entityId,
    },
    select: {
      id: true,
    },
  });

  //remove all links to this integrationTagId
  await authenticatedPrismaClient(sbUser).tag.updateMany({
    where: {
      integrationTagId,
      entityId: sbUser.app_metadata.entityId,
    },
    data: {
      integrationTagId: null,
    },
  });

  if (oldTagId?.id !== id) {
    const data = await authenticatedPrismaClient(sbUser).tag.update({
      where: {
        id,
        entityId: sbUser.app_metadata.entityId,
      },
      data: {
        integrationTagId,
      },
    });
    return data as TagItemType;
  }
  return null;
}
