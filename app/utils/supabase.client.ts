import { createClient } from "@supabase/supabase-js";

// declare global {
//   interface Window {
//     env: {
//       SUPABASE_URL: string;
//       SUPABASE_ANON_KEY: string;
//     };
//   }
// }

if (!window.ENV.SUPABASE_URL) throw new Error("SUPABASE_URL is required");

if (!window.ENV.SUPABASE_ANON_KEY)
  throw new Error("SUPABASE_ANON_KEY is required");

// Supabase options example (build your own :))
// https://supabase.com/docs/reference/javascript/initializing#with-additional-parameters

// const supabaseOptions = {
//   fetch, // see ⚠️ cloudflare
//   schema: "public",
//   persistSession: true,
//   autoRefreshToken: true,
//   detectSessionInUrl: true,
//   headers: { "x-application-name": "{my-site-name}" }
// };

// ⚠️ cloudflare needs you define fetch option : https://github.com/supabase/supabase-js#custom-fetch-implementation
// Use Remix fetch polyfill for node (See https://remix.run/docs/en/v1/other-api/node)
export const supabaseClient = createClient(
  window.ENV.SUPABASE_URL,
  window.ENV.SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  },
);

export const signInWithGithub = (
  redirectTo = "http://localhost:3000/oauth/callback",
) =>
  supabaseClient.auth.signInWithOAuth(
    {
      provider: "github",
      options: {
        redirectTo,
      },
    },
    // { redirectTo },
  );
