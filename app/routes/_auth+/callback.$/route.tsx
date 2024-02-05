import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { createNewEntity } from "~/models/user.server.ts";
import getSupabaseServerClient from "~/services/supabase.ts";
import { safeRedirect } from "~/utils.server";
import { createUserSession } from "~/utils/auth.server.ts";
import { redirectWithToast } from "~/utils/toast.server.ts";

export async function loader({ request }: LoaderFunctionArgs) {
  // console.log("auth.callback", request.url);
  const requestUrl = new URL(request.url);
  const response = new Response();

  const code = requestUrl.searchParams.get("code") || "/";
  // console.log("code", code);
  // const next = requestUrl.searchParams.get("next") || "/";

  if (code) {
    // const cookies = parse(request.headers.get("Cookie") ?? "");
    // const headers = response.headers;

    const supabase = getSupabaseServerClient(request, response);

    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    // console.log("error", error);
    if (!error) {
      // const {
      //   data: { user },
      //   error: getUserError,
      // } = await supabase.auth.getUser();

      // const {
      //   data: { user },
      //   error,
      // } = await supabase.auth.getUser(data.session.access_token);

      //user === null if the user doesn't exist?

      // redirectLoginErrorWithToast(getUserError);

      //check user exists in db
      // console.log("user", user);
      // console.log("data", data.session.user.user_metadata);

      //if user has no entityId then they are new
      if (await createNewEntity(data.user.id, "", "", request)) {
        //we have added a new entity, so should finish our onboarding
        console.log("new entity created");
        const redirectTo = safeRedirect("/completesignup");

        return createUserSession({
          redirectTo,
          response,
        });
      }

      //entity is setup

      const redirectTo = safeRedirect("/dashboard");

      return createUserSession({
        redirectTo,
        response,
      });

      // return redirect("/dashboard", { headers: response.headers });
    }
    // return the user to an error page with instructions
    redirectWithToast(
      "/login",
      {
        title: "Error",
        description: error.message,
        type: "destructive",
      },
      { headers: response.headers },
    );

    // return redirect("/auth/auth-code-error", { headers });
  }
  return json({}, { headers: response.headers });
}
