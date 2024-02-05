// import { createId as cuid } from "@paralleldrive/cuid2";
// import { redirect } from "@remix-run/cloudflare";
// import { GoogleStrategy } from "remix-auth-google";
// import { z } from "zod";

// import { connectionSessionStorage } from "../connections.server.ts";
// import { redirectWithToast } from "../toast.server.ts";
// import { type AuthProvider } from "./provider.ts";

// const GoogleUserSchema = z.object({ login: z.string() });

// const shouldMock = process.env.GOOGLE_OAUTH_CLIENT_ID.startsWith("MOCK_");

// export class GoogleProvider implements AuthProvider {
//   getAuthStrategy() {
//     return new GoogleStrategy(
//       {
//         clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
//         callbackURL: "/auth/google/callback",
//       },
//       async ({ profile }) => {
//         const email = profile.emails[0].value.trim().toLowerCase();
//         if (!email) {
//           throw await redirectWithToast("/login", {
//             title: "No email found",
//             description: "Please add a verified email to your Google account.",
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
//     const response = await fetch(`https://api.google.com/user/${providerId}`, {
//       headers: { Authorization: `token ${process.env.GOOGLE_TOKEN}` },
//     });
//     const rawJson = await response.json();
//     const result = GoogleUserSchema.safeParse(rawJson);
//     return {
//       displayName: result.success ? result.data.login : "Unknown",
//       link: result.success ? `https://google.com/${result.data.login}` : null,
//     } as const;
//   }

//   async handleMockAction(request: Request) {
//     if (!shouldMock) return;
//     // console.log("mocking google", request);
//     const connectionSession = await connectionSessionStorage.getSession(
//       request.headers.get("cookie"),
//     );
//     const state = cuid();
//     connectionSession.set("oauth2:state", state);
//     const code = process.env.Mock_User_Code;
//     console.log("code", code);
//     console.log("state", state);
//     const searchParams = new URLSearchParams({ code, state });
//     console.log("searchParams", searchParams);
//     throw redirect(`/auth/google/callback?${searchParams}`, {
//       headers: {
//         "set-cookie": await connectionSessionStorage.commitSession(
//           connectionSession,
//         ),
//       },
//     });
//   }
// }
