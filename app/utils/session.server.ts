import type { Session, SessionData } from "@remix-run/cloudflare";
import {
  createCookieSessionStorage,
} from "@remix-run/node";
import {
  json,
  redirect,
} from "@remix-run/cloudflare";
import { getSession } from "~/services/session.server";
import getSupabaseServerClient from "~/services/supabase";
import type { RoleType } from "./types";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "en_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: process.env.SESSION_SECRET.split(","),
    secure: process.env.NODE_ENV === "production",
  },
});

// we have to do this because every time you commit the session you overwrite it
// so we store the expiration time in the cookie and reset it every time we commit
const originalCommitSession = sessionStorage.commitSession;

Object.defineProperty(sessionStorage, "commitSession", {
  value: async function commitSession(
    ...args: Parameters<typeof originalCommitSession>
  ) {
    const [session, options] = args;
    if (options?.expires) {
      session.set("expires", options.expires);
    }
    if (options?.maxAge) {
      session.set("expires", new Date(Date.now() + options.maxAge * 1000));
    }
    const expires = session.has("expires")
      ? new Date(session.get("expires"))
      : undefined;
    const setCookieHeader = await originalCommitSession(session, {
      ...options,
      expires,
    });
    return setCookieHeader;
  },
});

export async function requireUserSession(
  request: Request,
  noRedirect: boolean = false,
) {
  const response = new Response();
  const supabaseClient = getSupabaseServerClient(request, response);
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  const { data: _allowSettings } = await supabaseClient.rpc("role_settings");
  const roles = [
    ..._allowSettings.map((setting: any) => {
      return {
        module: setting.moduleidentifier.split("|")[0],
        permissions: setting.moduleidentifier.split("|")[1].split(","),
      };
    }),
  ] as RoleType[];

  if (!user && !noRedirect) {
    // if there is no user session, redirect to login
    throw redirect("/login");
  }

  return { response, user, roles, supabase: supabaseClient };
}

export function moduleInRoles(
  roles: RoleType[],
  module: string[],
  permission: string,
) {
  let result = false;
  module.forEach((m) => {
    const role = roles.find((r) => r.module === m.toString());
    if (role && role.permissions.includes(permission)) {
      result = true;
      return true;
    }
  });
  return result;
}

export async function saveSessionDetail(
  request: Request,
  detailKey: string,
  detailData: string,
  session: Session<SessionData, SessionData> | null,
  data: any,
  headers: any,
) {
  if (!session) session = await getSession(request);
  session.set(detailKey, detailData);
  return json(
    { status: "ok", ...data },
    {
      headers: {
        ...headers,
        //"Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}
