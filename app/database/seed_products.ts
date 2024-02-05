import { UnitOfMeasure } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import { createProductType } from "~/models/product.server.ts";

import { authenticatedPrismaClient } from "./useSupabaseRLS";

export async function seedProducts(sbUser: User, demo = false) {
  const productDermalFiller = await createProductType(
    "Skin Care - Dermal Filler",
    sbUser,
    demo,
  );
  const productEyelashGrowthStimulator = await createProductType(
    "Eye Care - Eyelash Growth Stimulator",
    sbUser,
    demo,
  );

  await authenticatedPrismaClient(sbUser).$transaction([
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Ultra PLUS XC",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Ultra PLUS XC",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Vollure XC .5",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Vollure XC .5",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Vollure XC",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Vollure XC",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Volbella XC.5",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Volbella XC.5",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Ultra XC",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Ultra XC",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Botox - Per Unit",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Botox - Per Unit",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Kybella",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Kybella",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Voluma XC",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Voluma XC",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Volbella XC",
          productTypeId: productDermalFiller.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Volbella XC",
        description: "",
        productTypeId: productDermalFiller.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).product.upsert({
      where: {
        uq_p_product_name_product_type_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvederm Latisse",
          productTypeId: productEyelashGrowthStimulator.id,
        },
      },
      update: {},
      create: {
        name: "Juvederm Latisse",
        description: "",
        productTypeId: productEyelashGrowthStimulator.id,
        unitOfMeasure: UnitOfMeasure.ml,
        demo,
      },
    }),
  ]);
}
