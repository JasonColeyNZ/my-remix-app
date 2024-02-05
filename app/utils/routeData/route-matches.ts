import { useMatches } from "@remix-run/react";
import { useMemo } from "react";

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData<T>(id: string): T | undefined {
  const matchingRoutes = useMatches();
  //  console.log("matchingRoutes: ", matchingRoutes);
  // console.log("id: ", id);
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data as T;
}

export function routeDataIsString(data: any): data is string {
  return data && typeof data === "string";
}

// export function validateEmail(email: unknown): email is string {
//   return typeof email === "string" && email.length > 3 && email.includes("@");
// }
export function metaMatchesData(id: string, matches: any[]) {
  const route = matches.find((route: any) => route.id === id);
  return route?.data;
}
