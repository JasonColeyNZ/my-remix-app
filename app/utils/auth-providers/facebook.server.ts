// import { createId as cuid } from "@paralleldrive/cuid2";
// import { redirect } from "@remix-run/cloudflare";
// import { FacebookStrategy } from "remix-auth-facebook";
// import { z } from "zod";

// import { connectionSessionStorage } from "../connections.server.ts";
// import { redirectWithToast } from "../toast.server.ts";
// import { type AuthProvider } from "./provider.ts";

// const FacebookUserSchema = z.object({ login: z.string() });

// const shouldMock = process.env.FACEBOOK_OAUTH_CLIENT_ID.startsWith("MOCK_");

// export class FacebookProvider implements AuthProvider {
//   getAuthStrategy() {
//     return new FacebookStrategy(
//       {
//         clientID: process.env.FACEBOOK_OAUTH_CLIENT_ID,
//         clientSecret: process.env.FACEBOOK_OAUTH_CLIENT_SECRET,
//         callbackURL: "/auth/facebook/callback",
//       },
//       async ({ profile }) => {
//         const email = profile.emails[0].value.trim().toLowerCase();
//         if (!email) {
//           throw await redirectWithToast("/login", {
//             title: "No email found",
//             description:
//               "Please add a verified email to your Facebook account.",
//           });
//         }
//         const username = profile.displayName;
//         const imageUrl = profile.photos[0].value;
//         return {
//           email,
//           id: profile.id,
//           username,
//           name: profile.name.givenName,
//           imageUrl,
//         };
//       },
//     );
//   }

//   async resolveConnectionData(providerId: string) {
//     const response = await fetch(
//       `https://api.facebook.com/user/${providerId}`,
//       {
//         headers: { Authorization: `token ${process.env.GITHUB_TOKEN}` },
//       },
//     );
//     const rawJson = await response.json();
//     const result = FacebookUserSchema.safeParse(rawJson);
//     return {
//       displayName: result.success ? result.data.login : "Unknown",
//       link: result.success ? `https://facebook.com/${result.data.login}` : null,
//     } as const;
//   }

//   async handleMockAction(request: Request) {
//     if (!shouldMock) return;

//     const connectionSession = await connectionSessionStorage.getSession(
//       request.headers.get("cookie"),
//     );
//     const state = cuid();
//     connectionSession.set("oauth2:state", state);
//     const code = process.env.Mock_User_Code;
//     const searchParams = new URLSearchParams({ code, state });
//     throw redirect(`/auth/facebook/callback?${searchParams}`, {
//       headers: {
//         "set-cookie": await connectionSessionStorage.commitSession(
//           connectionSession,
//         ),
//       },
//     });
//   }
// }
