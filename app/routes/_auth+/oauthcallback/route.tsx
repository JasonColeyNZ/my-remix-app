// import { useSubmit } from "@remix-run/react";
// import { useEffect } from "react";
// // import { authenticator } from "~/utils/auth.server.ts";
// import { supabaseClient } from "~/utils/supabase.client.ts";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   // await authenticator.authenticate("sb-oauth", request, {
//   //   successRedirect: "/private",
//   //   failureRedirect: "/login",
//   // });
// };

// export default function OAuth() {
//   const submit = useSubmit();

//   useEffect(() => {
//     const { data: authListener } = supabaseClient.auth.onAuthStateChange(
//       (event, session) => {
//         if (event === "SIGNED_IN") {
//           const formData = new FormData();
//           formData.append("session", JSON.stringify(session));

//           submit(formData, { method: "post" });
//         }
//       },
//     );

//     return () => {
//       authListener?.subscription.unsubscribe();
//     };
//   }, [submit]);

//   return null;
// }
