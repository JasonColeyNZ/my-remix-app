// import type { LocationHourItemType } from "~/models/location.server.ts";

// function isLocationHours(
//   locationHours: any,
// ): locationHours is LocationHourItemType {
//   return locationHours && Array.isArray(locationHours);
// }

// export function useOptionalLocationHours(): LocationHourItemType[] | undefined {
//   const data = useMatchesData("routes/dashboard");
//   if (!data || !isLocationHours(data.locationHours)) {
//     return undefined;
//   }
//   return data.locationHours;
// }

// export function useLocationHours(): LocationHourItemType[] | null {
//   const maybeLocationHours = useOptionalLocationHours();
//   if (!maybeLocationHours) {
//     throw new Error(
//       "No location hours found in dashboard loader, but location hours is required by useLocationHours.",
//     );
//   }
//   return maybeLocationHours;
// }
