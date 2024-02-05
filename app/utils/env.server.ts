import { z } from "zod";

const schema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"] as const),
  SESSION_SECRET: z.string(),
  HONEYPOT_SECRET: z.string(),
  // RESEND_API_KEY: z.string(),

  GOOGLE_MAPS_API_KEY: z.string(),

  GOOGLE_OAUTH_CLIENT_ID: z.string(),
  GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
  GOOGLE_OAUTH_REDIRECT_URI: z.string(),

  GITHUB_OAUTH_CLIENT_ID: z.string(),
  GITHUB_OAUTH_CLIENT_SECRET: z.string(),

  // FACEBOOK_OAUTH_CLIENT_ID: z.string(),
  // FACEBOOK_OAUTH_CLIENT_SECRET: z.string(),

  // APPLE_OAUTH_CLIENT_ID: z.string(),
  // APPLE_OAUTH_CLIENT_SECRET: z.string(),

  // Mock_User_Code: z.string(),

  SUPABASE_URL: z.string(),
  SUPABASE_ANON_KEY: z.string(),

  MC_AUTHORIZE_URI: z.string(),
  MC_TOKEN_URI: z.string(),
  MC_CLIENT_ID: z.string(),
});

// console.log("env.server declare global");

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof schema> {}
  }
}

export function init() {
  const parsed = schema.safeParse(process.env);

  if (parsed.success === false) {
    console.error(
      "❌ Invalid environment variables:",
      parsed.error.flatten().fieldErrors,
    );

    throw new Error("Invalid envirmonment variables");
  }
}

/**
 * This is used in both `entry.server.ts` and `root.tsx` to ensure that
 * the environment variables are set and globally available before the app is
 * started.
 *
 * NOTE: Do *not* add any environment variables in here that you do not wish to
 * be included in the client.
 * @returns all public ENV variables
 */
export function getEnv() {
  return {
    NODE_ENV: process.env.NODE_ENV,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    MC_AUTHORIZE_URI: process.env.MC_AUTHORIZE_URI,
    MC_TOKEN_URI: process.env.MC_TOKEN_URI,
    MC_CLIENT_ID: process.env.MC_CLIENT_ID,
  };
}

type ENV = ReturnType<typeof getEnv>;

// console.log("env.server declare global2");

declare global {
  var ENV: ENV;
  interface Window {
    ENV: ENV;
  }
}
