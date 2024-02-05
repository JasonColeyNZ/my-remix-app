import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

type CategoryItemType = {
  id: string;
  name: string;
  color: string;
  textColor: string;
};
export type CategoryItemsType = CategoryItemType[];

export async function getCategories(sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).category.findMany({
    select: {
      id: true,
      name: true,
      color: true,
      textColor: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return data as CategoryItemsType;
}

export async function getCategoryById(id: string, sbUser: User) {
  if (id === "new") {
    return {
      id: "new",
      name: "",
      color: "#5551CE",
      textColor: "#FFFFFF",
    } as CategoryItemType;
  }

  const data = await authenticatedPrismaClient(sbUser).category.findUnique({
    where: {
      id,
    },
  });
  return data as CategoryItemType;
}

export async function createCategory(
  {
    name,
    color,
    textColor,
  }: { name: string; color: string; textColor: string },
  sbUser: User,
  demo: boolean = false,
) {
  const data = await authenticatedPrismaClient(sbUser).category.create({
    data: {
      name,
      color,
      textColor,
      demo,
    },
  });
  return data as CategoryItemType;
}

export async function updateCategory(
  {
    id,
    name,
    color,
    textColor,
  }: { id: string; name: string; color: string; textColor: string },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).category.update({
    where: {
      id,
    },
    data: {
      name,
      color,
      textColor,
    },
  });
  return data as CategoryItemType;
}
