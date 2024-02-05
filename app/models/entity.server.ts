import type { Entity } from "@prisma/client";
import type { SupabaseClient, User } from "@supabase/supabase-js";
// import { removeDemoData } from "~/database/removeDemo.ts";
// import { seedDemoLocation } from "~/database/seed-demo-location.ts";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";

import type { AddressType } from "./address.server.ts";
import getSupabaseServerClient from "~/services/supabase.ts";

type ThenArg<T> = T extends PromiseLike<infer U> ? U : T;

export type EntityItemType = ThenArg<ReturnType<typeof getEntity>>;
export async function getEntity(sbUser: User) {
  return (await authenticatedPrismaClient(sbUser).entity.findFirst({
    select: {
      name: true,
      id: true,
      workNumber: true,
      mobileNumber: true,
      demoDataInstalled: true,
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
  })) as Entity & {
    address: AddressType | undefined;
  };
}

export async function entityModulePermissions(supabase: SupabaseClient) {
  console.log("entityModulePermissions");
  await supabase.rpc("roles_populate_modules");
}

export async function updateEntity(
  {
    id,
    name,
    workNumber,
    mobileNumber,
    address, // demoDataInstalled,
  }: {
    id: string;
    name: string;
    workNumber?: string | null;
    mobileNumber?: string | null;
    address: AddressType | undefined;
    // demoDataInstalled: boolean;
  },
  sbUser: User,
) {
  //first lets create the address if its new...
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

    return await authenticatedPrismaClient(sbUser).entity.update({
      where: {
        id,
      },
      data: {
        name,
        workNumber,
        // demoDataInstalled,
        mobileNumber,
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
    return await authenticatedPrismaClient(sbUser).entity.update({
      where: {
        id,
      },
      data: {
        name,
        workNumber,
        mobileNumber,
        // demoDataInstalled,
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

  return await authenticatedPrismaClient(sbUser).entity.update({
    where: {
      id,
    },
    data: {
      name,
      workNumber,
      mobileNumber,
      // demoDataInstalled,
    },
  });
}

export async function demoDataInstall(
  demoInstall: boolean,
  sbUser: User,
  request: Request,
) {
  //we can update many as there is only one entity
  await authenticatedPrismaClient(sbUser).entity.updateMany({
    where: {
      id: sbUser.app_metadata.entityId,
    },
    data: {
      demoDataInstalled: demoInstall,
    },
  });

  const response = new Response();
  const supabaseClient = getSupabaseServerClient(request, response, {
    admin: true,
  });

  //Add Demo Data to tables
  if (demoInstall) {
    try {
      await supabaseClient.rpc("demo_install", {
        dest_entity_id: sbUser.app_metadata.entityId,
      });
      // await seedDemoLocation(sbUser);
    } catch (error) {
      console.error("Error seeding demo location", error);
    }
  } else {
    //remove demo data from tables
    try {
      await supabaseClient.rpc("demo_remove", {
        dest_entity_id: sbUser.app_metadata.entityId,
      });
    } catch (error) {
      console.error("Error seeding demo location", error);
    }
  }
}
