// import type { User } from "@supabase/supabase-js";

// import { authenticatedPrismaClient } from "./useSupabaseRLS";

// export async function removeDemoData(sbUser: User) {
//   console.log("Removing demo data...");

//   //get demo location Id
//   const demoLocation = await authenticatedPrismaClient(
//     sbUser,
//   ).location.findFirst({
//     where: {
//       demo: {
//         equals: true,
//       },
//     },
//   });
//   // invariant(demoLocation, "No demo location found");

//   try {
//     await authenticatedPrismaClient(sbUser).demoClientEvent.deleteMany({});
//   } catch (error) {
//     console.error("Error deleting demoClientEvent", error);
//   }

//   try {
//     await authenticatedPrismaClient(sbUser).client.deleteMany({
//       where: {
//         demo: {
//           equals: true,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting client", error);
//   }

//   try {
//     await authenticatedPrismaClient(sbUser).product.deleteMany({
//       where: {
//         demo: {
//           equals: true,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting product", error);
//   }

//   try {
//     await authenticatedPrismaClient(sbUser).productType.deleteMany({
//       where: {
//         demo: {
//           equals: true,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting productType", error);
//   }

//   try {
//     await authenticatedPrismaClient(sbUser).servicesOnLocations.deleteMany({
//       where: {
//         service: {
//           demo: {
//             equals: true,
//           },
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting servicesOnLocations", error);
//   }

//   try {
//     await authenticatedPrismaClient(sbUser).service.deleteMany({
//       where: {
//         demo: {
//           equals: true,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting service", error);
//   }
//   try {
//     await authenticatedPrismaClient(sbUser).category.deleteMany({
//       where: {
//         demo: {
//           equals: true,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting category", error);
//   }

//   try {
//     await authenticatedPrismaClient(sbUser).location.deleteMany({
//       where: {
//         demo: {
//           equals: true,
//         },
//       },
//     });
//   } catch (error) {
//     console.error("Error deleting location", error);
//   }

//   //update userdefault locationId to be something other than the demo location
//   try {
//     const userDefaultLocation = await authenticatedPrismaClient(
//       sbUser,
//     ).userDefaults.findFirst({
//       where: {
//         userId: {
//           equals: sbUser.id,
//         },
//       },
//       select: {
//         locationId: true,
//       },
//     });
//     if (demoLocation && userDefaultLocation?.locationId === demoLocation.id) {
//       const firstLocationId = await authenticatedPrismaClient(
//         sbUser,
//       ).location.findFirst({
//         select: {
//           id: true,
//         },
//       });

//       await authenticatedPrismaClient(sbUser).userDefaults.update({
//         where: {
//           userId: sbUser.id,
//           locationId: demoLocation.id,
//         },
//         data: {
//           locationId: firstLocationId?.id,
//         },
//       });
//     }
//   } catch (error) {
//     console.error("Error updating userDefaults", error);
//   }
// }
