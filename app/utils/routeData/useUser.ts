import type { UserItemType } from "~/models/user.server.ts";
import { useMatchesData } from "./route-matches";

export function isUser(user: any): user is UserItemType {
  return user && typeof user === "object" && typeof user.email === "string";
}

export function useOptionalUser(): UserItemType | null {
  let result = null;

  let data = useMatchesData<{ user: UserItemType }>("root");
  //console.log("useUser: root", data);
  if (data && isUser(data.user)) {
    result = data.user;
  }

  data = useMatchesData<{ user: UserItemType }>("routes/dashboard");
  //console.log("useUser: routes/dashboard", data);
  if (!result)
    if (data && isUser(data.user)) {
      result = data.user;
    }
  return result;
}
