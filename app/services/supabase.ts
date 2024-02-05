import { createServerClient, parse, serialize } from "@supabase/ssr";
import { invariantResponse } from "~/utils/misc.tsx";

function getSupabaseServerClient(
  request: Request,
  response?: any,
  params = { admin: false },
) {
  if (!response) response = new Response();
  const env = process.env;
  invariantResponse(env.SUPABASE_URL, `Supabase URL not provided`);
  const cookies = parse(request.headers.get("Cookie") ?? "");
  const headers = response.headers;
  invariantResponse(env.SUPABASE_ANON_KEY, `Supabase Anon Key not provided`);
  if (params.admin) {
    const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;
    invariantResponse(serviceRoleKey, `Supabase Service Role Key not provided`);
    // console.log("serviceRoleKey", serviceRoleKey);
    return createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(key) {
            return cookies[key];
          },
          set(key, value, options) {
            headers.append("Set-Cookie", serialize(key, value, options));
          },
          remove(key, options) {
            headers.append("Set-Cookie", serialize(key, "", options));
          },
        },
      },
    );

    // return createServerClient(env.SUPABASE_URL, serviceRoleKey, {
    //   request,
    //   response,
    // });
  }

  return createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(key) {
          return cookies[key];
        },
        set(key, value, options) {
          headers.append("Set-Cookie", serialize(key, value, options));
        },
        remove(key, options) {
          headers.append("Set-Cookie", serialize(key, "", options));
        },
      },
    },
  );
  // return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
  //   request,
  //   response,
  // });
}

// async function getSupabaseServerClient(
//   request: Request,
//   response?: any,
//   params = { admin: false },
// ) {
//   if (!response) response = new Response();
//   const env = process.env;

//   // const type = requestUrl.searchParams.get("type") as EmailOtpType | null;
//   // const next = requestUrl.searchParams.get("next") || "/";

//   invariantResponse(env.SUPABASE_URL, `Supabase URL not provided`);
//   invariantResponse(env.SUPABASE_ANON_KEY, `Supabase Anon Key not provided`);
//   const cookies = parse(request.headers.get("Cookie") ?? "");
//   const headers = new Headers();
//   if (params.admin) {
//     const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

//     invariantResponse(serviceRoleKey, `Supabase Service Role Key not provided`);

//     return createServerClient(
//       process.env.SUPABASE_URL!,
//       process.env.SUPABASE_ANON_KEY!,
//       {
//         cookies: {
//           get(key) {
//             return cookies[key];
//           },
//           set(key, value, options) {
//             headers.append("Set-Cookie", serialize(key, value, options));
//           },
//           remove(key, options) {
//             headers.append("Set-Cookie", serialize(key, "", options));
//           },
//         },
//       },
//     );
//     // const { error } = await supabase.auth.verifyOtp({
//     //   type,
//     //   token_hash,
//     // })
//   }

//   return createServerClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
//     cookies: {
//       get(key) {
//         return cookies[key];
//       },
//       set(key, value, options) {
//         headers.append("Set-Cookie", serialize(key, value, options));
//       },
//       remove(key, options) {
//         headers.append("Set-Cookie", serialize(key, "", options));
//       },
//     },
//   });
// }

export default getSupabaseServerClient;
