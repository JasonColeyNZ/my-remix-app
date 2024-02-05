import type { UserItemType } from "~/models/user.server.ts";
import type { loader as DashboardLoader } from "~/routes/dashboard/route.tsx";

import { useOptionalUser } from "./useUser.ts";
import { routeDataIsString, useMatchesData } from "./route-matches.ts";

export function isUser(user: any): user is UserItemType {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useUser(): UserItemType {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

export function useOptionalLocationId(): string | undefined {
  const data = useMatchesData<{ locationId: typeof DashboardLoader }>(
    "routes/dashboard/route",
  );
  if (!data || !routeDataIsString(data.locationId)) {
    return undefined;
  }
  return data.locationId;
}

export function useLocationId(): string | null {
  const maybeLocationId = useOptionalLocationId();
  if (!maybeLocationId) {
    throw new Error(
      "No locationId found in root loader, but locationId is required by useLocationId. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeLocationId;
}
