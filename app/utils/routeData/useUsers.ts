import type { GetUsersItemsType } from "~/models/user.server.ts";
// import type { loader as DashboardBookingsLoader } from "~/routes/dashboard.bookings/route.tsx";
import type { loader as DashboardClientsLoader } from "~/routes/dashboard.clients/route.tsx";
import { useMatchesData } from "./route-matches";

function isUsers(users: any): users is GetUsersItemsType {
  return users && Array.isArray(users);
}

export function useOptionalUsers(): GetUsersItemsType | null {
  let result = null;

  // let data = useMatchesData<{
  //   users: typeof DashboardBookingsLoader;
  // }>("routes/dashboard.bookings/route");
  // if (data && isUsers(data.users)) {
  //   result = data.users;
  // }

  let data = useMatchesData<{
    users: typeof DashboardClientsLoader;
  }>("routes/dashboard.clients");
  if (!result && data && data.users && isUsers(data.users)) {
    result = data.users;
  }
  data = useMatchesData<{ users: typeof DashboardClientsLoader }>(
    "routes/dashboard.clients/route",
  );
  if (!result) {
    if (!result && data && data.users && isUsers(data.users)) {
      result = data.users;
    }
  }

  return result;
}

export function useUsers(): GetUsersItemsType | null {
  const maybeUsers = useOptionalUsers();
  if (!maybeUsers) {
    throw new Error(
      "No users found in loader, but users is required by useUsers.",
    );
  }
  return maybeUsers;
}
