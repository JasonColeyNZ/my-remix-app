// import { redirect } from "@remix-run/cloudflare";
import type {
  SupabaseClient,
  User as supabaseUser,
} from "@supabase/supabase-js";
import { createCookieSessionStorage } from "@remix-run/node";
import {  redirect } from "@remix-run/cloudflare";
// import { Authenticator, AuthorizationError } from "remix-auth";
// import { SupabaseStrategy } from "remix-auth-supabase";
import { getUserById } from "~/models/user.server.ts";
import { getSession } from "~/services/session.server.ts";
import type { RoleType } from "./types";

// import type { Session } from "./supabase.server.ts";
// import { supabaseAdmin } from "./supabase.server.ts";
// import { redirectWithToast } from "./toast.server.ts";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "sb",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cr3t"], // This should be an env variable
    secure: process.env.NODE_ENV === "production",
  },
});

// export const oAuthStrategy = new SupabaseStrategy(
//   {
//     supabaseClient: supabaseAdmin,
//     sessionStorage,
//     sessionKey: "sb:session",
//     sessionErrorKey: "sb:error",
//   },
//   async ({ req }) => {
//     const form = await req.formData();
//     // const session = form?.get("session");

//     if (typeof session !== "string")
//       throw await redirectWithToast("/login", {
//         title: "No email found",
//         description: "Please add a verified email to your Facebook account.",
//       });

//     return JSON.parse(session);
//   },

//   // async ({ profile }) => {
//   //   const email = profile.emails[0].value.trim().toLowerCase();
//   //   if (!email) {
//   //     throw await redirectWithToast("/login", {
//   //       title: "No email found",
//   //       description: "Please add a verified email to your Facebook account.",
//   //    packas });
//   //   }
//   //   const username = profile.displayName;
//   //   const imageUrl = profile.photos[0].value;
//   //   return {
//   //     email,
//   //     id: profile.id,
//   //     username,
//   //     name: profile.name.givenName,
//   //     imageUrl,
//   //   };
//   // },
// );

// export const authenticator = new Authenticator<Session>(sessionStorage, {
//   sessionKey: oAuthStrategy.sessionKey,
//   sessionErrorKey: oAuthStrategy.sessionErrorKey,
// });

// authenticator.use(oAuthStrategy, "sb-oauth");

// import { Authenticator } from "remix-auth";
// import type { User } from "~/models/user.server.ts";

// import { USER_SESSION_KEY } from "../const.ts";
// import { checkUserIdValid, getUserById } from "../models/user.server.ts";
// import { getSession } from "../services/session.server.ts";
// import { connectionSessionStorage } from "./connections.server.ts";
// import { ProviderUser } from "./providers/provider.ts";
// import { sessionStorage } from "./session.server.ts";

// const SESSION_EXPIRATION_TIME = 1000 * 60 * 60 * 24 * 30;
// export const getSessionExpirationDate = () =>
//   new Date(Date.now() + SESSION_EXPIRATION_TIME);

// export const sessionKey = "sessionId";
// // export const authenticator = new Authenticator<ProviderUser>(
// //   connectionSessionStorage,
// // );

// // for (const [providerName, provider] of Object.entries(providers)) {
// //   authenticator.use(provider.getAuthStrategy(), providerName);
// // }

// export async function createUserSession({
//   request,
//   userId,
//   remember,
//   redirectTo,
//   response,
// }: {
//   request: Request;
//   userId: string;
//   remember: boolean;
//   redirectTo: string;
//   response: Response;
// }) {
//   //const session = await getSession(request);
//   //session.set(USER_SESSION_KEY, userId);
//   return redirect(redirectTo, {
//     headers: response.headers,
//     // "Set-Cookie": await sessionStorage.commitSession(session, {
//     //   maxAge: remember
//     //     ? 60 * 60 * 24 * 7 // 7 days
//     //     : undefined,
//     // }),
//   });
// }

export async function createUserSession({
  redirectTo,
  response,
}: {
  redirectTo: string;
  response: Response;
}) {
  // console.log("createUserSession", response.headers);
  return redirect(redirectTo, {
    headers: response.headers,
  });
}

// export async function getUserId(
//   request: Request,
// ): Promise<User["id"] | undefined> {
//   const session = await getSession(request);
//   const userId = session.get(USER_SESSION_KEY);
//   return userId;
// }

export async function getUser(
  request: Request,
  sbUser: supabaseUser,
  supabase: SupabaseClient,
) {
  //const userId = await getUserId(request);
  //console.log("sbUser", sbUser);

  if (sbUser === undefined) throw await logout(request);

  const user = await getUserById(sbUser.id, sbUser);

  let roles: any = null;

  try {
    if (supabase) {
      const { data: _allowSettings } = await supabase.rpc("role_settings");
      // console.log("allowSettings: ", _allowSettings);
      roles = [
        ..._allowSettings.map((setting: any) => {
          return {
            module: setting.moduleidentifier.split("|")[0],
            permissions: setting.moduleidentifier.split("|")[1].split(","),
          };
        }),
      ] as RoleType[];
    }
    // console.log("allowSettings: ", allowSettings);
  } catch (e) {
    console.log("error: ", e);
  }

  if (user) return { ...user, roles };
  throw await logout(request);
}

// export async function requireUserId(
//   request: Request,
//   redirectTo: string = new URL(request.url).pathname,
// ) {
//   const userId = await getUserId(request);
//   if (!userId) {
//     const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
//     throw redirect(`/login?${searchParams}`);
//   }
//   return userId;
// }

// export async function requireUser(request: Request) {
//   const userId = await requireUserId(request);

//   const user = await checkUserIdValid(userId);
//   if (user) return user;

//   throw await logout(request);
// }

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session),
    },
  });
}
