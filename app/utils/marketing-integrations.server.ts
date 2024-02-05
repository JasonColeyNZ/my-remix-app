// import { createCookieSessionStorage } from "@remix-run/cloudflare";
// import type {
//   MarketingProvider,
//   MarketingProviderName,
// } from "./marketing-providers/marketing-provider";
// import { MailchimpProvider } from "./marketing-providers/mailchimp.server";
// import { SendGridProvider } from "./marketing-providers/sendgrid.server";

// export const connectionSessionStorage = createCookieSessionStorage({
//   cookie: {
//     name: "en_marketing_integration",
//     sameSite: "lax",
//     path: "/",
//     httpOnly: true,
//     maxAge: 60 * 10, // 10 minutes
//     secrets: process.env.SESSION_SECRET.split(","),
//     secure: process.env.NODE_ENV === "production",
//   },
// });
// export const providers: Record<MarketingProviderName, MarketingProvider> = {
//   mailchimp: new MailchimpProvider(),
//   sendGrid: new SendGridProvider(),
// };

// export const connect = (providerName: MarketingProviderName) => {
//   return providers[providerName].connect();
// };
// export const disconnect = (providerName: MarketingProviderName) => {
//   return providers[providerName].disconnect();
// };

// export function handleMockAction(providerName: ProviderName, request: Request) {
//   return providers[providerName].handleMockAction(request);
// }
