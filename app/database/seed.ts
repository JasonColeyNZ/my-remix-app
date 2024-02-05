import { PrismaClient } from "@prisma/client";
import type { User } from "@supabase/supabase-js";
import { AreaType } from "~/components/draggable-forms-editor/types.ts";
import { v4 as uuidv4 } from "uuid";
import clientDetailDefinition from "./formDefs/formDef_ClientDetail.json";
import clientNoteDefinition from "./formDefs/formDef_ClientNote.json";
import clientRecordDefinition from "./formDefs/formDef_ClientRecord.json";
import memberDetailDefinition from "./formDefs/formDef_MemberDetail.json";
import memberNoteDefinition from "./formDefs/formDef_MemberNote.json";
import sculptraForm from "./letters/sculptra.json";
import microbladingForm from "./letters/microblading.json";
import microneedlingForm from "./letters/microneedling.json";
import qHealth from "./letters/q_health.json";
import { addLocation } from "~/models/location.server.ts";
import { createEntity, createForm, createUser } from "./seedFunctions.ts";
import { authenticatedPrismaClient } from "./useSupabaseRLS.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { seedProducts } from "./seed_products.ts";
// import { getAreaDefaultForm } from "~/models/form.server.ts";
import demoUsersJson from "./seedusers.json";
// import demoEventsJson from "./seedDemoEvents.json";
import { seedServices } from "./seed_services.ts";

const prisma = new PrismaClient();

async function seed() {
  //Create Entity for EMS System
  await prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', FALSE)`;
  const entity = await createEntity(prisma, "EMS System");
  await prisma.$executeRaw`SELECT set_config('app.bypass_rls', 'off', FALSE)`;
  // // create prisma with RLS

  const sbUser: User = {
    id: "00000000-0000-0000-0000-000000000000",
    aud: "authenticated",
    email: "jason@software-solutions.co.nz",
    phone: "",
    app_metadata: {
      provider: "email",
      entityId: entity.id,
      providers: ["email"],
    },
    user_metadata: {},
    role: "authenticated",
    created_at: new Date().toISOString(),
  };

  const entityPrisma = authenticatedPrismaClient(sbUser);

  //check on next seed, just in case we need this?
  await entityPrisma.$executeRaw`SELECT set_config('app.bypass_rls', 'on', FALSE)`;

  //Build System Forms
  const memberForm = await createForm(
    entityPrisma,
    entity.id,
    "Team Member Detail",
    "Used to add and update Team Member Details",
    memberDetailDefinition,
    AreaType.MEMBER_DETAIL,
    true,
  );

  await createForm(
    entityPrisma,
    entity.id,
    "Team Member Note",
    "Used for Team Member Notes",
    memberNoteDefinition,
    AreaType.MEMBER_NOTE,
    true,
  );

  const clientForm = await createForm(
    entityPrisma,
    entity.id,
    "Client Detail",
    "Used to add and update Client Details",
    clientDetailDefinition,
    AreaType.CLIENT_DETAIL,
    true,
  );

  await createForm(
    entityPrisma,
    entity.id,
    "Client Note",
    "Used to create Client Notes",
    clientNoteDefinition,
    AreaType.CLIENT_NOTE,
    true,
  );

  await createForm(
    entityPrisma,
    entity.id,
    "Client Record",
    "Used to create Client Records",
    clientRecordDefinition,
    AreaType.CLIENT_RECORD,
    true,
  );

  await createUser(
    entityPrisma,
    uuidv4(),
    entity.id,
    "Jackie",
    "Smith",
    "jackie@test.com",
    memberForm.id,
    true,
  );

  await createUser(
    entityPrisma,
    uuidv4(),
    entity.id,
    "Penny",
    "Johnson",
    "penny@test.com",
    memberForm.id,
    true,
  );

  await createUser(
    entityPrisma,
    uuidv4(),
    entity.id,
    "Adele",
    "Rogers",
    "adele@test.com",
    memberForm.id,
    true,
  );

  const location = await addLocation(
    sbUser.app_metadata.entityId,
    "Demo Location",
    sbUser,
    true,
  );
  invariantResponse(location, "location is undefined");

  try {
    await authenticatedPrismaClient(sbUser).$transaction([
      authenticatedPrismaClient(sbUser).locationHours.createMany({
        data: [
          {
            locationId: location.id,
            dayOfWeek: "MO",
            start: "08:00",
            end: "17:00",
          },
          {
            locationId: location.id,
            dayOfWeek: "TU",
            start: "08:00",
            end: "17:00",
          },
          {
            locationId: location.id,
            dayOfWeek: "WE",
            start: "08:00",
            end: "17:00",
          },
          {
            locationId: location.id,
            dayOfWeek: "TH",
            start: "08:00",
            end: "17:00",
          },
          {
            locationId: location.id,
            dayOfWeek: "FR",
            start: "08:00",
            end: "17:00",
          },
          {
            locationId: location.id,
            dayOfWeek: "SA",
            start: "08:00",
            end: "12:00",
          },
        ],
      }),

      authenticatedPrismaClient(sbUser).room.createMany({
        data: [
          {
            locationId: location.id,
            name: `Room 1`,
          },
          {
            locationId: location.id,
            name: `Room 2`,
          },
          {
            locationId: location.id,
            name: `Room 3`,
          },
          {
            locationId: location.id,
            name: `Room 4`,
          },
          {
            locationId: location.id,
            name: `Room 5`,
          },
        ],
      }),
    ]);
  } catch (error) {
    console.error("Error seeding location hours and rooms", error);
  }

  try {
    await seedProducts(sbUser, true);
  } catch (error) {
    console.error("Error seeding products", error);
  }

  try {
    //Create 500 Clients
    // const clientForm = await getAreaDefaultForm(
    //   { area: AreaType.CLIENT_DETAIL.toString() },
    //   sbUser,
    // );
    // invariantResponse(clientForm, "clientForm is undefined");
    const demoUsers = demoUsersJson.map((user: any) => {
      return {
        formId: clientForm.id,
        firstName: user.name.first,
        lastName: user.name.last,
        email: user.email,
        mobileNumber: user.cell,
        workNumber: user.phone,
        avatarData: {
          fileName: "",
          storageKey: "",
          publicUrl: user.picture.large,
          signedUrl: "",
        },
        demo: true,
      };
    });
    await authenticatedPrismaClient(sbUser).client.createMany({
      data: demoUsers,
    });
    // ]);
  } catch (error) {
    console.error("Error seeding clients", error);
  }
  // try {
  //   await authenticatedPrismaClient(sbUser).demoClientEvent.createMany({
  //     data: demoEventsJson,
  //   });
  // } catch (error) {
  //   console.error("Error seeding demoEvents", error);
  // }

  // const {
  //   // kybella,
  //   // hylenex,
  //   // facial,
  //   // peel,
  //   // skinvive,
  //   // countour,
  //   // beloteroBalance,
  //   beloteraPlus,
  //   juvedermUltraPlus,
  //   juvedemUltra,
  //   // juvedermVoluma,
  //   juvedremVolbella,
  //   // juvedermVollure,
  //   juvedermVolux,
  //   // refyne,
  //   // defyne,
  //   // restylaneL,
  //   restylaneLyft,
  //   radiesse,
  //   // radiessePlus,
  //   // versa,
  //   // rha2,
  //   // rha3,
  //   // rha4,
  //   botox,
  //   dysport,
  //   xeomin,
  //   // dysportAndRadiesse,
  //   // botoxAndJuvederm,
  //   // morpheus8,
  //   laserHairRemoval,
  //   // consulationOnly,
  //   sculptra,
  //   microNeedling,
  //   // electrolysis15,
  //   // electrolysis30,
  //   // electrolysis60,
  //   // mb2ndAppointment,
  //   // microBladingBrows,
  // } =
  await seedServices(sbUser, location.id, location.entityId, true);

  // console.log("demoEventsJson", demoEventsJson);

  // const clients = await authenticatedPrismaClient(sbUser).client.findMany({
  //   where: {
  //     email: {
  //       in: ["kathryn.allen@example.com", "kent.anderson@example.com"],
  //     },
  //   },
  // });

  // const getService = (serviceName: string): string | null => {
  //   switch (serviceName) {
  //     case "Botox":
  //       return botox.id;
  //     case "Xeomin":
  //       return xeomin.id;
  //     case "Juvederm Ultra":
  //       return juvedemUltra.id;
  //     case "Laser Hair Removal":
  //       return laserHairRemoval.id;
  //     case "Micro-Needling":
  //       return microNeedling.id;
  //     case "Juvederm Volux":
  //       return juvedermVolux.id;
  //     case "Radiesse":
  //       return radiesse.id;
  //     case "Restylane Lyft":
  //       return restylaneLyft.id;
  //     case "Dysport":
  //       return dysport.id;
  //     case "Belotera PLUS":
  //       return beloteraPlus.id;
  //     case "Juvederm Volbella":
  //       return juvedremVolbella.id;
  //     case "Juvederm Ultra PLUS":
  //       return juvedermUltraPlus.id;
  //     default:
  //       return null;
  //   }
  // };

  //create consent forms
  // const sculptraConsent =
  await authenticatedPrismaClient(sbUser).form.create({
    data: {
      name: "Sculptra Injectable Informed Consent",
      entityId: location.entityId,
      area: AreaType.CLIENT_CONSENT,
      formDefinition: sculptraForm,
      demo: true,
    },
  });

  // const microbladingConsent =
  await authenticatedPrismaClient(sbUser).form.create({
    data: {
      name: "Microblading Consent Form",
      entityId: location.entityId,
      area: AreaType.CLIENT_CONSENT,
      formDefinition: microbladingForm,
      demo: true,
    },
  });

  // const microneedlingConsent =
  await authenticatedPrismaClient(sbUser).form.create({
    data: {
      name: "Micro-needling",
      entityId: location.entityId,
      area: AreaType.CLIENT_CONSENT,
      formDefinition: microneedlingForm,
      demo: true,
    },
  });

  await authenticatedPrismaClient(sbUser).form.create({
    data: {
      name: "Health Questionnaire",
      entityId: location.entityId,
      area: AreaType.CLIENT_QUESTIONNAIRE,
      formDefinition: qHealth,
      demo: true,
    },
  });

  // await authenticatedPrismaClient(sbUser).consentsOnServices.create({
  //   data: {
  //     formId: sculptraConsent.id,
  //     serviceId: sculptra.id,
  //   },
  // });

  // await authenticatedPrismaClient(sbUser).consentsOnServices.create({
  //   data: {
  //     formId: microneedlingConsent.id,
  //     serviceId: microNeedling.id,
  //   },
  // });

  // const getServicesOnBookingsData = (
  //   demoClientEvent: any,
  //   bookingId: string,
  // ) => {
  //   if (!demoClientEvent.service1 && !demoClientEvent.service2) return null;

  //   const servicesOnBookingsData = [];
  //   const service1Id = getService(demoClientEvent.service1);
  //   const service2Id = getService(demoClientEvent.service2);
  //   if (service1Id) {
  //     servicesOnBookingsData.push({
  //       serviceId: service1Id,
  //       bookingId,
  //     });
  //   }
  //   if (service2Id) {
  //     servicesOnBookingsData.push({
  //       serviceId: service2Id,
  //       bookingId,
  //     });
  //   }

  //   return servicesOnBookingsData;
  // };
  // const demoClientEvents = await authenticatedPrismaClient(
  //   sbUser,
  // ).demoClientEvent.findMany({
  //   select: {
  //     email: true,
  //     teamMemberEmail: true,
  //     dayDifference: true,
  //     startTime: true,
  //     endTime: true,
  //     client: {
  //       select: {
  //         id: true,
  //       },
  //     },
  //     service1: true,
  //     service2: true,
  //     user: {
  //       select: {
  //         id: true,
  //       },
  //     },
  //   },
  // });

  // try {
  //   await authenticatedPrismaClient(sbUser).$transaction(async (tx) => {
  //     //loop each demoClientEvent and create a booking
  //     for (let i = 0; i < demoClientEvents.length; i++) {
  //       // for (const demoClientEvent of demoClientEvents) {
  //       const now = new Date(new Date().setHours(0, 0, 0, 0));
  //       const now2 = new Date(new Date().setHours(0, 0, 0, 0));
  //       const start = demoClientEvents[i].startTime - now.getTimezoneOffset();
  //       const end = demoClientEvents[i].endTime - now.getTimezoneOffset();
  //       const dayDifference =
  //         demoClientEvents[i].dayDifference - (now.getDay() + 2);

  //       try {
  //         const booking = await authenticatedPrismaClient(
  //           sbUser,
  //         ).booking.create({
  //           data: {
  //             title: "Demo Booking",
  //             startDate: new Date(
  //               new Date(now.setDate(now.getDate() + dayDifference)).setHours(
  //                 Math.trunc(start / 60),
  //                 start - Math.trunc(start / 60) * 60,
  //               ),
  //             ),
  //             endDate: new Date(
  //               new Date(now2.setDate(now2.getDate() + dayDifference)).setHours(
  //                 Math.trunc(end / 60),
  //                 end - Math.trunc(end / 60) * 60,
  //               ),
  //             ),
  //             allDay: false,
  //             clientId: demoClientEvents[i].client.id,
  //             userId: demoClientEvents[i].user.id,
  //             createdBy: demoClientEvents[i].user.id,
  //           },
  //         });

  //         const data = getServicesOnBookingsData(
  //           demoClientEvents[i],
  //           booking.id,
  //         );
  //         if (data) {
  //           try {
  //             for (let j = 0; j < data.length; j++) {
  //               await authenticatedPrismaClient(
  //                 sbUser,
  //               ).servicesOnBookings.create({
  //                 data: {
  //                   serviceId: data[j].serviceId,
  //                   bookingId: data[j].bookingId,
  //                 },
  //               });
  //             }
  //           } catch (error) {
  //             console.error("Error seeding servicesOnBookings", data, error);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error seeding booking", demoClientEvents[i], error);
  //       }
  //     }
  //   });
  // } catch (error) {
  //   console.error("Error seeding bookings", error);
  // }

  console.log(`Database has been seeded. 🌱`);
}

// setupRLS(prisma);

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

//This will create the supabase user if it does not exist
//and updates the user info
