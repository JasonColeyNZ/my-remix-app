// import type { User } from "@supabase/supabase-js";
// // import { AreaType } from "~/components/draggable-forms-editor/types.ts";
// // import { getAreaDefaultForm } from "~/models/form.server.ts";
// import { addLocation } from "~/models/location.server.ts";
// import { invariantResponse } from "~/utils/misc.tsx";

// // import { seedProducts } from "./seed_products.ts";
// // import { seedServices } from "./seed_services.ts";
// // import demoUsersJson from "./seedusers.json";
// // import demoEventsJson from "./seedDemoEvents.json";
// import { authenticatedPrismaClient } from "./useSupabaseRLS.ts";
// import { createBrowserClient } from "@supabase/ssr";
// import { createSupabaseUser } from "./seedFunctions.ts";
// import sculptraForm from "./letters/sculptra.json";
// import microbladingForm from "./letters/microblading.json";
// import microneedlingForm from "./letters/microneedling.json";

// export async function seedDemoLocation(sbUser: User) {
//   const location = await addLocation(
//     sbUser.user_metadata.entityId,
//     "Demo Location",
//     sbUser,
//     true,
//   );
//   invariantResponse(location, "location is undefined");

//   //update userdefault locationId to demo location
//   await authenticatedPrismaClient(sbUser).userDefaults.upsert({
//     where: {
//       userId: sbUser.id,
//     },
//     update: {
//       locationId: location.id,
//     },
//     create: {
//       locationId: location.id,
//       userId: sbUser.id,
//     },
//   });

// try {
//   await authenticatedPrismaClient(sbUser).$transaction([
//     authenticatedPrismaClient(sbUser).locationHours.createMany({
//       data: [
//         {
//           locationId: location.id,
//           dayOfWeek: "MO",
//           start: "08:00",
//           end: "17:00",
//         },
//         {
//           locationId: location.id,
//           dayOfWeek: "TU",
//           start: "08:00",
//           end: "17:00",
//         },
//         {
//           locationId: location.id,
//           dayOfWeek: "WE",
//           start: "08:00",
//           end: "17:00",
//         },
//         {
//           locationId: location.id,
//           dayOfWeek: "TH",
//           start: "08:00",
//           end: "17:00",
//         },
//         {
//           locationId: location.id,
//           dayOfWeek: "FR",
//           start: "08:00",
//           end: "17:00",
//         },
//         {
//           locationId: location.id,
//           dayOfWeek: "SA",
//           start: "08:00",
//           end: "12:00",
//         },
//       ],
//     }),

//     authenticatedPrismaClient(sbUser).room.createMany({
//       data: [
//         {
//           locationId: location.id,
//           name: `Room 1`,
//         },
//         {
//           locationId: location.id,
//           name: `Room 2`,
//         },
//         {
//           locationId: location.id,
//           name: `Room 3`,
//         },
//         {
//           locationId: location.id,
//           name: `Room 4`,
//         },
//         {
//           locationId: location.id,
//           name: `Room 5`,
//         },
//       ],
//     }),
//   ]);
// } catch (error) {
//   console.error("Error seeding location hours and rooms", error);
// }

// try {
//   await seedProducts(sbUser, true);
// } catch (error) {
//   console.error("Error seeding products", error);
// }

// try {
//   const memberForm = await getAreaDefaultForm(
//     { area: AreaType.MEMBER_DETAIL.toString() },
//     sbUser,
//   );
//   invariantResponse(memberForm, "memberForm is undefined");

//   const supabase = createBrowserClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_ANON_KEY!,
//   );

// const permissionUser = await permission(
//   authenticatedPrismaClient(sbUser),
//   false,
//   false,
//   true,
// );

// const { user: NPAJackie } =
//   await createSupabaseUser(
//     supabase,
//     "jackie@test.com",
//     "Thisisabigsecret",
//     "Jackie",
//     "Smith",
//     location.entityId,
//     // permissionUser.id,
//     memberForm.id,
//   );

//   // const { user: NursePenny } =
//   await createSupabaseUser(
//     supabase,
//     "penny@test.com",
//     "Thisisabigsecret",
//     "Penny",
//     "Johnson",
//     location.entityId,
//     // permissionUser.id,
//     memberForm.id,
//   );

//   // const { user: NPAAdele } =
//   await createSupabaseUser(
//     supabase,
//     "adele@test.com",
//     "Thisisabigsecret",
//     "Adele",
//     "Rogers",
//     location.entityId,
//     // permissionUser.id,
//     memberForm.id,
//   );
// } catch (error) {
//   console.error("Error seeding team members", error);
// }

// try {
//Create 500 Clients
// const clientForm = await getAreaDefaultForm(
//   { area: AreaType.CLIENT_DETAIL.toString() },
//   sbUser,
// );
// invariantResponse(clientForm, "clientForm is undefined");
// const demoUsers = demoUsersJson.map((user: any) => {
//   return {
//     formId: clientForm.id,
//     firstName: user.name.first,
//     lastName: user.name.last,
//     email: user.email,
//     mobileNumber: user.cell,
//     workNumber: user.phone,
//     avatarData: {
//       fileName: "",
//       storageKey: "",
//       publicUrl: user.picture.large,
//       signedUrl: "",
//     },
//     demo: true,
//     // address: {
//     //   create: {
//     //     streetAddress: `${user.location.street.number} ${user.location.street.name}`,
//     //     city: user.location.city,
//     //     state: user.location.state,
//     //     zipCode: user.location.postcode,
//     //     country: user.location.country,
//     //   },
//     // },
//   };
// });
// await authenticatedPrismaClient(sbUser).$transaction([
// await authenticatedPrismaClient(sbUser).client.createMany({
//   data: demoUsers,
// });
// ]);
// } catch (error) {
//   console.error("Error seeding clients and demoEvents", error);
// }
// await authenticatedPrismaClient(sbUser).demoClientEvent.createMany({
//   data: demoEventsJson,
// });

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
// } = await seedServices(sbUser, location.id, location.entityId, true);

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
// const sculptraConsent = await authenticatedPrismaClient(sbUser).form.create({
//   data: {
//     name: "Sculptra Injectable Informed Consent",
//     entityId: location.entityId,
//     area: AreaType.CLIENT_CONSENT,
//     formDefinition: sculptraForm,
//   },
// });

// // const microbladingConsent =
// await authenticatedPrismaClient(sbUser).form.create({
//   data: {
//     name: "Microblading Consent Form",
//     entityId: location.entityId,
//     area: AreaType.CLIENT_CONSENT,
//     formDefinition: microbladingForm,
//   },
// });

// const microneedlingConsent = await authenticatedPrismaClient(
//   sbUser,
// ).form.create({
//   data: {
//     name: "Micro-needling",
//     entityId: location.entityId,
//     area: AreaType.CLIENT_CONSENT,
//     formDefinition: microneedlingForm,
//   },
// });

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
//     // client: {
//     //   select: {
//     //     id: true,
//     //   },
//     // },
//     service1: true,
//     service2: true,
//     // user: {
//     //   select: {
//     //     id: true,
//     //   },
//     // },
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
//             // clientId: demoClientEvents[i].client.id,
//             // userId: demoClientEvents[i].user.id,
//             // createdBy: demoClientEvents[i].user.id,
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

// demoClientEvents.map((demoClientEvent) => {
//   const now = new Date(new Date().setHours(0, 0, 0, 0));
//   const now2 = new Date(new Date().setHours(0, 0, 0, 0));
//   const start = demoClientEvent.startTime - now.getTimezoneOffset();
//   const end = demoClientEvent.endTime - now.getTimezoneOffset();
//   const dayDifference =
//     demoClientEvent.dayDifference - (now.getDay() + 2);

//   return {
//     title: "Demo Booking",
//     startDate: new Date(
//       new Date(now.setDate(now.getDate() + dayDifference)).setHours(
//         Math.trunc(start / 60),
//         start - Math.trunc(start / 60) * 60,
//       ),
//     ),
//     endDate: new Date(
//       new Date(now2.setDate(now2.getDate() + dayDifference)).setHours(
//         Math.trunc(end / 60),
//         end - Math.trunc(end / 60) * 60,
//       ),
//     ),
//     allDay: false,
//     description: "Demo Booking 1",
//     clientId: demoClientEvent.client.id,
//     userId: demoClientEvent.user.id,
//     createdBy: demoClientEvent.user.id,
//     ServicesOnBookings: {
//       createServicesOnBookings: [
//         {

//           serviceId: dysportAndRadiesse.id,

//         },
//       ],
//     },
//   };
// }),

// console.log("demoClientEvents", demoClientEvents);

//   .$queryRaw`SELECT "client"."id", "user"."id", "user"."id", current_date + MAKE_INTERVAL(0, 0, 0,"demoClientEvent"."dayDifference", 0, "demoClientEvent"."startTime"), current_date + MAKE_INTERVAL(0, 0, 0, "demoClientEvent"."dayDifference", 0, "demoClientEvent"."endTime")
//  FROM "Client" as "client"
//  INNER JOIN "DemoClientEvent" as "demoClientEvent" ON "client"."email" = "demoClientEvent"."email"
//  INNER JOIN "User" as "user" ON "demoClientEvent"."teamMemberEmail" = "user"."email";`;
// //  });
// .$executeRaw`select demo_client_events();`;
// .$executeRaw`INSERT INTO "Booking" ("clientId", "userId", "createdBy", "startDate", "endDate")
// SELECT "client"."id", "user"."id", "user"."id", current_date + MAKE_INTERVAL(0, 0, 0,"demoClientEvent"."dayDifference", 0, "demoClientEvent"."startTime"), current_date + MAKE_INTERVAL(0, 0, 0, "demoClientEvent"."dayDifference", 0, "demoClientEvent"."endTime")
// FROM "Client" as "client"
// INNER JOIN "DemoClientEvent" as "demoClientEvent" ON "client"."email" = "demoClientEvent"."email"
// INNER JOIN "User" as "user" ON "demoClientEvent"."teamMemberEmail" = "user"."email";`;

//Add Events for Clients
// await authenticatedPrismaClient(sbUser).$transaction([
//   authenticatedPrismaClient(sbUser).booking.create({
//     data: {
//       title: "Demo Booking 1",
//       startDate: new Date(),
//       endDate: addHours(new Date(), 1),
//       allDay: false,
//       description: "Demo Booking 1",
//       clientId: clients[0].id,
//       userId: sbUser.id,
//       createdBy: sbUser.id,
//       services: {
//         create: [
//           {
//             serviceId: dysportAndRadiesse.id,
//           },
//         ],
//       },
//     },
//   }),
//   authenticatedPrismaClient(sbUser).booking.create({
//     data: {
//       title: "Demo Booking 2",
//       startDate: new Date(),
//       endDate: addHours(new Date(), 1),
//       allDay: false,
//       description: "Demo Booking 2",
//       clientId: clients[1].id,
//       userId: sbUser.id,
//       createdBy: sbUser.id,
//       services: {
//         create: [
//           {
//             serviceId: botoxAndJuvederm.id,
//           },
//         ],
//       },
//     },
//   }),
// ]);
// }
