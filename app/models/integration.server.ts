import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { User } from "@supabase/supabase-js";
import { Prisma } from "~/db.server.ts";
import { type EntityIntegration, type IntegrationType } from "@prisma/client";

export type GetIntegrationsType = {
  id: string;
  integrationType: string;
  accessToken: string | null;
  integrationData: EntityIntegration["integrationData"];
};

export async function getIntegrations(sbUser: User) {
  const integrations = await authenticatedPrismaClient(
    sbUser,
  ).entityIntegration.findMany({
    where: {
      invalid: false,
    },
    select: {
      id: true,
      integrationType: true,
      accessToken: true,
      integrationData: true,
      lists: {
        select: {
          id: true,
          listName: true,
          listId: true,
          primary: true,
          tags: {
            select: {
              id: true,
              tagId: true,
              tagName: true,
            },
          },
        },
      },
    },
  });

  return integrations.map((integration) => {
    return {
      ...integration,
      lists: integration?.lists.map((list) => {
        return {
          ...list,
          tags: list.tags.map((tag) => {
            return {
              name: tag.tagName,
              id: tag.id,
            };
          }),
        };
      }),
    };
  });
}

export type GetIntegrationType = {
  id: string;
  integrationType: string;
  accessToken: string | null;
  integrationData: EntityIntegration["integrationData"];
  lists?: {
    id: string;
    listId: string;
    primary: boolean;
    tags: {
      id: string;
      tagId: string;
      tagName: string;
    }[];
  }[];
};

export async function getIntegration(integrationType: string, sbUser: User) {
  const integration = await authenticatedPrismaClient(
    sbUser,
  ).entityIntegration.findFirst({
    where: {
      integrationType: integrationType as IntegrationType,
      invalid: false,
    },
    select: {
      state: true,
      id: true,
      integrationType: true,
      accessToken: true,
      integrationData: true,
      lists: {
        select: {
          id: true,
          listId: true,
          primary: true,
          tags: {
            select: {
              id: true,
              tagId: true,
              tagName: true,
            },
          },
        },
      },
    },
  });
  if (integration == null) return null;
  return {
    ...integration,
    lists: integration?.lists.map((list) => {
      return {
        ...list,
        tags: list.tags.map((tag) => {
          return {
            ...tag,
            tagName: tag.tagName,
          };
        }),
      };
    }),
  };
}

export async function updateIntegration(
  {
    id,
    accessToken,
    integrationData,
  }: {
    id: string;
    accessToken: string;
    integrationData: EntityIntegration["integrationData"];
  },
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).entityIntegration.update({
    where: {
      id,
    },
    data: {
      accessToken,
      integrationData:
        integrationData != null ? integrationData : Prisma.JsonNull,
    },
  });
}

export async function updateIntegrationPrimaryListId(
  {
    listId,
    id,
  }: {
    listId: string;
    id: string;
  },
  sbUser: User,
) {
  await authenticatedPrismaClient(sbUser).integrationList.updateMany({
    where: {
      integrationId: id,
    },
    data: {
      primary: false,
    },
  });
  return await authenticatedPrismaClient(sbUser).integrationList.update({
    where: {
      id: listId,
    },
    data: {
      primary: true,
    },
  });
}

export async function createIntegration(
  {
    integrationType,
    state,
  }: {
    integrationType: string;
    state: string;
  },
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).entityIntegration.create({
    data: {
      integrationType: integrationType as IntegrationType,
      state,
    },
  });
}

export async function invalidateIntegration(
  {
    id,
  }: {
    id: string;
  },
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).entityIntegration.update({
    where: {
      id,
    },
    data: {
      invalid: true,
    },
  });
}

export async function getIntegrationByState(
  integrationType: string,
  state: string,
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).entityIntegration.findFirst({
    where: {
      state,
      invalid: false,
      integrationType: integrationType as IntegrationType,
    },
    select: {
      state: true,
      id: true,
      accessToken: true,
      serverPrefix: true,
      integrationType: true,
    },
  });
}

export async function addUpdateIntegrationList(
  {
    integrationId,
    listId,
    listName,
  }: {
    integrationId: string;
    listId: string;
    listName: string;
  },
  sbUser: User,
) {
  return await authenticatedPrismaClient(sbUser).integrationList.upsert({
    where: {
      uq_i_integration_id_list_id: {
        integrationId,
        listId,
      },
    },
    update: {
      listName,
    },
    create: {
      listId,
      listName,

      integration: {
        connect: {
          id: integrationId,
        },
      },
    },
  });
}
