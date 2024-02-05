import { Decimal } from "@prisma/client/runtime/library.js";
import type { User } from "@supabase/supabase-js";

// import { botulinumtoxin } from "./letters/letter_Botulinumtoxin.ts";
// import { co2Laser } from "./letters/letter_CO2Laser.ts";
// import { chemicalPeeling } from "./letters/letter_ChemicalPeeling.ts";
// import { fatDissolvingInjection } from "./letters/letter_FatDissolvingInjection.ts";
// import { filler } from "./letters/letter_Filler.ts";
// import { ipl } from "./letters/letter_IPL.ts";
// import { microneedling } from "./letters/letter_Microneedling.ts";
// import { prp } from "./letters/letter_PRP.ts";
// import { plasmaPen } from "./letters/letter_PlasmaPen.ts";
// import { profhilo } from "./letters/letter_Profhilo.ts";
// import { hyalase } from "./letters/letter_hyalase.ts";
import { authenticatedPrismaClient } from "./useSupabaseRLS.ts";

export async function seedServices(
  sbUser: User,
  locationId: string,
  entityId: string,
  demo = false,
) {
  const {
    kybellaCategory,
    skinCareCategory,
    dermalFillerCategory,
    neurotoxinCategory,
    combinationCategory,
    mechanicalServicesCategory,
    consultationCategory,
    sculptraCategory,
    microneedelingCategory,
    electroylsisCategory,
    microBladingCategory,
  } = await seedCategories(sbUser, demo);

  // const {
  //   // locCO2Laser,
  //   // locChemicalPeeling,
  //   // locFiller,
  //   // locPRP,
  //   // locProfhilo,
  //   // locPlasmaPen,
  //   locFatDissolvingInjection,
  //   locHyalase,
  //   locBotulinumtoxin,
  //   locMicroneedling,
  //   locIPL,
  // } = await seedLetters(sbUser, entityId);

  const [
    kybella,
    hylenex,
    facial,
    peel,
    skinvive,
    countour,
    beloteroBalance,
    beloteraPlus,
    juvedermUltraPlus,
    juvedemUltra,
    juvedermVoluma,
    juvedremVolbella,
    juvedermVollure,
    juvedermVolux,
    refyne,
    defyne,
    restylaneL,
    restylaneLyft,
    radiesse,
    radiessePlus,
    versa,
    rha2,
    rha3,
    rha4,
    botox,
    dysport,
    xeomin,
    dysportAndRadiesse,
    botoxAndJuvederm,
    morpheus8,
    laserHairRemoval,
    consulationOnly,
    sculptra,
    microNeedling,
    electrolysis15,
    electrolysis30,
    electrolysis60,
    mb2ndAppointment,
    microBladingBrows,
  ] = await authenticatedPrismaClient(sbUser).$transaction([
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Kybella",
          categoryId: kybellaCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Kybella",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: kybellaCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Hylenex",
          categoryId: skinCareCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Hylenex",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: skinCareCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Facial",
          categoryId: skinCareCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Facial",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: skinCareCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Peel",
          categoryId: skinCareCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Peel",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: skinCareCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Skinvive",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Skinvive",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Countour",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Countour",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Belotero BALANCE",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Belotero BALANCE",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Belotera PLUS",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Belotera PLUS",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvéderm Ultra PLUS",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Juvéderm Ultra PLUS",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvéderm Ultra",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Juvéderm Ultra",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvéderm Voluma",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Juvéderm Voluma",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvéderm Volbella",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Juvéderm Volbella",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvéderm Vollure",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Juvéderm Vollure",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Juvéderm Volux",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Juvéderm Volux",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Refyne",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Refyne",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Defyne",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Defyne",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Restylane-L",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Restylane-L",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Restylane Lyft",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Restylane Lyft",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Radiesse",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Radiesse",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Radiesse Plus",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Radiesse Plus",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Versa",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Versa",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "RHA2",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "RHA2",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "RHA3",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "RHA3",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "RHA4",
          categoryId: dermalFillerCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "RHA4",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: dermalFillerCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Botox",
          categoryId: neurotoxinCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Botox",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: neurotoxinCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Dysport",
          categoryId: neurotoxinCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Dysport",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: neurotoxinCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Xeomin",
          categoryId: neurotoxinCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Xeomin",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: neurotoxinCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Dysport and Radiesse",
          categoryId: combinationCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Dysport and Radiesse",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: combinationCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Botox and Juvéderm",
          categoryId: combinationCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Botox and Juvéderm",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: combinationCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Morpheus8",
          categoryId: mechanicalServicesCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Morpheus8",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: mechanicalServicesCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Laser Hair Removal",
          categoryId: mechanicalServicesCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Laser Hair Removal",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: mechanicalServicesCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Consultation Only",
          categoryId: consultationCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Consultation Only",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: consultationCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Sculptra",
          categoryId: sculptraCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Sculptra",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: sculptraCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Micro-Needling",
          categoryId: microneedelingCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Micro-Needling",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: microneedelingCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Electrolysis - 15 Minutes",
          categoryId: electroylsisCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Electrolysis - 15 Minutes",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: electroylsisCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Electrolysis - 30 Minutes",
          categoryId: electroylsisCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Electrolysis - 30 Minutes",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: electroylsisCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Electrolysis - 60 Minutes",
          categoryId: electroylsisCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Electrolysis - 60 Minutes",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: electroylsisCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "2nd Appointment",
          categoryId: microBladingCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "2nd Appointment",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: microBladingCategory.id,
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).service.upsert({
      where: {
        uq_s_name_category_id: {
          entityId: sbUser.app_metadata.entityId,
          name: "Micro Blading Brows",
          categoryId: microBladingCategory.id,
        },
      },
      update: {},
      create: {
        entityId,
        name: "Micro Blading Brows",
        price: new Decimal(0),
        duration: "1:30",
        timeMargin: "0:30",
        description: "",
        categoryId: microBladingCategory.id,
        demo,
      },
    }),
  ]);

  //ServicesOnLocations and LettersOnServices
  await authenticatedPrismaClient(sbUser).$transaction([
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: kybella.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: hylenex.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: facial.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: peel.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: skinvive.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: countour.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: beloteroBalance.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: beloteraPlus.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: juvedermUltraPlus.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: juvedemUltra.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: juvedermVoluma.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: juvedremVolbella.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: juvedermVollure.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: juvedermVolux.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: refyne.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: defyne.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: restylaneL.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: restylaneLyft.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: radiesse.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: radiessePlus.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: versa.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: rha2.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: rha3.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: rha4.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: botox.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: dysport.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: xeomin.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: dysportAndRadiesse.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: botoxAndJuvederm.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: morpheus8.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: laserHairRemoval.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: consulationOnly.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: sculptra.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: microNeedling.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: electrolysis15.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: electrolysis30.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: electrolysis60.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: mb2ndAppointment.id,
        locationId,
      },
    }),
    authenticatedPrismaClient(sbUser).servicesOnLocations.create({
      data: {
        serviceId: microBladingBrows.id,
        locationId,
      },
    }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locFatDissolvingInjection.id,
    //       serviceId: kybella.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locFatDissolvingInjection.id,
    //     serviceId: kybella.id,
    //   },
    // }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locHyalase.id,
    //       serviceId: hylenex.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locHyalase.id,
    //     serviceId: hylenex.id,
    //   },
    // }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locBotulinumtoxin.id,
    //       serviceId: botox.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locBotulinumtoxin.id,
    //     serviceId: botox.id,
    //   },
    // }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locBotulinumtoxin.id,
    //       serviceId: botoxAndJuvederm.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locBotulinumtoxin.id,
    //     serviceId: botoxAndJuvederm.id,
    //   },
    // }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locBotulinumtoxin.id,
    //       serviceId: dysport.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locBotulinumtoxin.id,
    //     serviceId: dysport.id,
    //   },
    // }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locBotulinumtoxin.id,
    //       serviceId: dysportAndRadiesse.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locBotulinumtoxin.id,
    //     serviceId: dysportAndRadiesse.id,
    //   },
    // }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locIPL.id,
    //       serviceId: laserHairRemoval.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locIPL.id,
    //     serviceId: laserHairRemoval.id,
    //   },
    // }),
    // authenticatedPrismaClient(sbUser).lettersOnServices.upsert({
    //   where: {
    //     letterId_serviceId: {
    //       letterId: locMicroneedling.id,
    //       serviceId: microNeedling.id,
    //     },
    //   },
    //   update: {},
    //   create: {
    //     letterId: locMicroneedling.id,
    //     serviceId: microNeedling.id,
    //   },
    // }),
  ]);

  return {
    kybella,
    hylenex,
    facial,
    peel,
    skinvive,
    countour,
    beloteroBalance,
    beloteraPlus,
    juvedermUltraPlus,
    juvedemUltra,
    juvedermVoluma,
    juvedremVolbella,
    juvedermVollure,
    juvedermVolux,
    refyne,
    defyne,
    restylaneL,
    restylaneLyft,
    radiesse,
    radiessePlus,
    versa,
    rha2,
    rha3,
    rha4,
    botox,
    dysport,
    xeomin,
    dysportAndRadiesse,
    botoxAndJuvederm,
    morpheus8,
    laserHairRemoval,
    consulationOnly,
    sculptra,
    microNeedling,
    electrolysis15,
    electrolysis30,
    electrolysis60,
    mb2ndAppointment,
    microBladingBrows,
  };
}

// async function seedLetters(sbUser: User, entityId: string) {
//   const [
//     locCO2Laser,
//     locChemicalPeeling,
//     locFiller,
//     locHyalase,
//     locMicroneedling,
//     locPRP,
//     locProfhilo,
//     locPlasmaPen,
//     locIPL,
//     locBotulinumtoxin,
//     locFatDissolvingInjection,
//   ] = await authenticatedPrismaClient(sbUser).$transaction([
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "CO2-laser",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "CO2-laser",
//         text: co2Laser,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Chemical Peeling",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Chemical Peeling",
//         text: chemicalPeeling,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Filler",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Filler",
//         text: filler,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Hyalase",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Hyalase",
//         text: hyalase,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Microneedling",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Microneedling",
//         text: microneedling,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "PRP",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "PRP",
//         text: prp,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Profhilo",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Profhilo",
//         text: profhilo,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Plasma Pen",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Plasma Pen",
//         text: plasmaPen,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "IPL",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "IPL",
//         text: ipl,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Botulinumtoxin",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Botulinumtoxin",
//         text: botulinumtoxin,
//         demo: true,
//       },
//     }),
//     authenticatedPrismaClient(sbUser).letterOfConsent.upsert({
//       where: {
//         name: "Fat dissolving injection",
//       },
//       update: {},
//       create: {
//         entityId,
//         name: "Fat dissolving injection",
//         text: fatDissolvingInjection,
//         demo: true,
//       },
//     }),
//   ]);

//   return {
//     locCO2Laser,
//     locChemicalPeeling,
//     locFiller,
//     locPRP,
//     locProfhilo,
//     locPlasmaPen,
//     locFatDissolvingInjection,
//     locHyalase,
//     locBotulinumtoxin,
//     locMicroneedling,
//     locIPL,
//   };
// }

async function seedCategories(sbUser: User, demo: boolean) {
  const [
    kybellaCategory,
    skinCareCategory,
    dermalFillerCategory,
    neurotoxinCategory,
    combinationCategory,
    mechanicalServicesCategory,
    consultationCategory,
    sculptraCategory,
    microneedelingCategory,
    electroylsisCategory,
    microBladingCategory,
  ] = await authenticatedPrismaClient(sbUser).$transaction([
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Kybella",
        },
      },
      update: {},
      create: {
        name: "Kybella",
        color: "#f27679",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Skin Care",
        },
      },
      update: {},
      create: {
        name: "Skin Care",
        color: "#68c4a0",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Dermal Filler",
        },
      },
      update: {},
      create: {
        name: "Dermal Filler",
        color: "#12a44a",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Neurotoxin",
        },
      },
      update: {},
      create: {
        name: "Neurotoxin",
        color: "#a391c5",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Combination",
        },
      },
      update: {},
      create: {
        name: "Combination",
        color: "#faa53f",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Mechanical Services",
        },
      },
      update: {},
      create: {
        name: "Mechanical Services",
        color: "#b47e62",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Consultation",
        },
      },
      update: {},
      create: {
        name: "Consultation",
        color: "#ef484a",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Sculptra",
        },
      },
      update: {},
      create: {
        name: "Sculptra",
        color: "#b4b5b4",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Micro-Needling",
        },
      },
      update: {},
      create: {
        name: "Micro-Needling",
        color: "#d6d6d6",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Electrolysis",
        },
      },
      update: {},
      create: {
        name: "Electrolysis",
        color: "#ffffff",
        textColor: "#ffffff",
        demo,
      },
    }),
    authenticatedPrismaClient(sbUser).category.upsert({
      where: {
        uq_c_entity_id_name: {
          entityId: sbUser.app_metadata.entityId,
          name: "Micro Blading",
        },
      },
      update: {},
      create: {
        name: "Micro Blading",
        color: "#faf6a7",
        textColor: "#ffffff",
        demo,
      },
    }),
  ]);
  return {
    kybellaCategory,
    skinCareCategory,
    dermalFillerCategory,
    neurotoxinCategory,
    combinationCategory,
    mechanicalServicesCategory,
    consultationCategory,
    sculptraCategory,
    microneedelingCategory,
    electroylsisCategory,
    microBladingCategory,
  };
}
