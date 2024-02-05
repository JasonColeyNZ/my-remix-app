import { redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import getSupabaseServerClient from "~/services/supabase.ts";

export async function action({ request }: ActionFunctionArgs) {
  const response = new Response();
  const supabaseClient = await getSupabaseServerClient(request, response);
  await supabaseClient.auth.signOut();

  return redirect("/", { headers: response.headers });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const response = new Response();
  const supabaseClient = await getSupabaseServerClient(request, response);
  await supabaseClient.auth.signOut();

  return redirect("/", { headers: response.headers });
}
