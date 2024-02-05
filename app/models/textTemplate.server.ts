import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

export type TextTemplateType = {
  id: string;
  name: string;
  text: string;
  description?: string | null;
  type?: string;
};

export type TextTemplateItemsType = TextTemplateType[];
export async function getTextTemplates(sbUser: User) {
  const data = await authenticatedPrismaClient(sbUser).textTemplate.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      type: true,
    },
    orderBy: [{ type: "asc" }, { name: "asc" }],
  });
  //console.log(data);
  return data as TextTemplateItemsType;
  //     .map((service) => {
  //       const { services } = service;
  //       return services.map((obj) => obj);
  //     })
  //     .flat(1);
}

export async function createTextTemplate(
  {
    name,
  }: {
    name: string;
  },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).textTemplate.create({
    data: {
      entityId: sbUser.app_metadata.entityId,
      name,
      text: "",
    },
  });
  //console.log(data);
  return data;
}

export async function getTextTemplateById(
  {
    id,
  }: {
    id: string;
  },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).textTemplate.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      text: true,
      description: true,
      type: true,
      cost: true,
    },
  });
  //console.log(data);
  if (!data) throw new Error("TextTemplate not found");
  return data;
}

export async function updateTextInTemplate(
  {
    id,
    text,
  }: {
    id: string;
    text: string;
  },
  sbUser: User,
) {
  const data = await authenticatedPrismaClient(sbUser).textTemplate.update({
    where: { id },
    data: { text },
  });
  console.log(data);
  return data;
}
