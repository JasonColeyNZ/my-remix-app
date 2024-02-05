import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import getSupabaseServerClient from "~/services/supabase.ts";

import { Hero } from "./components/Hero.tsx";
import { Footer } from "./components/footer.tsx";
import { Header } from "./components/header/header.tsx";
import { FaqSection } from "./components/sections/faq-section/faq-section.tsx";
import { FeaturesSection } from "./components/sections/features-section/features-section.tsx";
import { JoinSection } from "./components/sections/join-section.tsx";
import { validateCSRF } from "~/utils/csrf.server.ts";
import { checkHoneypot } from "~/utils/honeypot.server.ts";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  checkHoneypot(formData);
  return json({
    status: "ok",
    success: false,
    message: "Not implemented",
    submission: null,
  });
};

export async function loader({ request }: LoaderFunctionArgs) {
  //console.log("dashboard loader");
  const response = new Response();
  const supabaseClient = getSupabaseServerClient(request, response);

  const {
    data: { user },
  } = await supabaseClient.auth.getUser();
  return json({ user }, { headers: response.headers });
}

const Public = () => {
  //const user = useOptionalUser();
  //console.log(user);
  return (
    <div className="">
      <Header />
      <main className="pt-header xl:pt-header-xl">
        <Hero />
        <FeaturesSection />
        <FaqSection />
        <JoinSection />
      </main>
      <Footer />
    </div>
    // <>
    //   <div>Welcome to the public facing page!</div>
    //   {user ? (
    //     <Link to="dashboard">Proceed to the Dashboard</Link>
    //   ) : (
    //     <Link to="login">Login</Link>
    //   )}
    // </>
  );
};
export default Public;
