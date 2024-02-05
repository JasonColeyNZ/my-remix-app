import type { Params } from "@remix-run/react";
import type { Session } from "@remix-run/cloudflare";
import { redirect } from "@remix-run/cloudflare";
import { sessionStorage } from "~/services/session.server.ts";

//type

export const redirectToFirstId = async <T, Key extends keyof T>(
  session: Session,
  sessionVar: string,
  params: Params,
  paramName: string,
  redirectUrl: string,
  list: T[],
  key: Key,
  suffix: string = "",
) => {
  //TODO: This fires continuously when adding a new Form?

  // console.log("redirect selectedId", sessionVar);
  let selectedId =
    session.get(sessionVar) || (list && list.length > 0 && list[0][key]);

  if (!selectedId) return null;

  if (list.length === 0) {
    selectedId = null;
  } else if (list.length > 0 && !list.find((f) => f[key] === selectedId)) {
    selectedId = list[0][key];
  }

  // console.log("redirect selectedId", selectedId, list, key, suffix);
  if (!selectedId) selectedId = "new";

  if (
    !params[paramName] ||
    (params && params[paramName] && params[paramName] !== selectedId)
  ) {
    //console.log("redirect selectedId", selectedId);

    if (suffix) {
      suffix = `/${suffix}`;
    }
    session.set(sessionVar, selectedId);

    //console.log("redirect", `${redirectUrl}${selectedId}${suffix}`);
    return redirect(`${redirectUrl}${selectedId}${suffix}`, {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    });
  }

  //console.log("not redirecting");
  return null;
  // if (!params[paramName]) {
  //   return redirect(`/dashboard/settings/records/forms/${selectedId}`);
  // }
};
