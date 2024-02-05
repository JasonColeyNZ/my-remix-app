//  import type { ClientItemsType } from "~/models/client.server.ts";
// import { useMatchesData } from "~/utils.ts";

// function isClients(users: any): users is ClientItemsType {
//   return users && Array.isArray(users);
// }

// export function useOptionalClients(): ClientItemsType | undefined {
//   const data = useMatchesData("routes/dashboard.bookings");
//   if (!data || !isClients(data.clients)) {
//     return undefined;
//   }
//   return data.clients;
// }

// export function useClients(): ClientItemsType | null {
//   const maybeClients = useOptionalClients();
//   if (!maybeClients) {
//     throw new Error(
//       "No clients found in loader, but clients is required by useClients."
//     );
//   }
//   return maybeClients;
// }
