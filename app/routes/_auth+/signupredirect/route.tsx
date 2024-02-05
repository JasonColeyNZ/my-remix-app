import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import getSupabaseServerClient from "~/services/supabase.ts";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  console.log("code", code);

  const response = new Response();
  const supabaseClient = await getSupabaseServerClient(request, response);

  const session = supabaseClient.auth.exchangeCodeForSession(code!);
}

const SignUpRedirect = () => {
  return <div>SignUpRedirect</div>;
};
export default SignUpRedirect;
