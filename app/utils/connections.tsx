// // import { StatusButton } from "#app/components/ui/status-button.tsx";
// import { Form } from "@remix-run/react";
// import { FaGoogle } from "react-icons/fa6/index.js";
// import { FaGithub } from "react-icons/fa6/index.js";
// import { FaFacebookF } from "react-icons/fa/index.js";
// import { z } from "zod";
// import { Button } from "~/components/ui/button.tsx";

// import { useIsPending } from "./misc.tsx";

// const GITHUB_PROVIDER_NAME = "github";
// const GOOGLE_PROVIDER_NAME = "google";
// const FACEBOOK_PROVIDER_NAME = "facebook";
// // to add another provider, set their name here and add it to the providerNames below

// export const providerNames = [
//   GITHUB_PROVIDER_NAME,
//   GOOGLE_PROVIDER_NAME,
//   FACEBOOK_PROVIDER_NAME,
// ] as const;
// export const ProviderNameSchema = z.enum(providerNames);
// export type ProviderName = z.infer<typeof ProviderNameSchema>;

// export const providerLabels: Record<ProviderName, string> = {
//   [GITHUB_PROVIDER_NAME]: "GitHub",
//   [GOOGLE_PROVIDER_NAME]: "Google",
//   [FACEBOOK_PROVIDER_NAME]: "Facebook",
// } as const;

// export const providerIcons: Record<ProviderName, React.ReactNode> = {
//   [GITHUB_PROVIDER_NAME]: <FaGithub />,
//   [GOOGLE_PROVIDER_NAME]: <FaGoogle />,
//   [FACEBOOK_PROVIDER_NAME]: <FaFacebookF />,
// } as const;

// export function ProviderConnectionForm({
//   type,
//   providerName,
// }: {
//   type: "Connect" | "Login" | "Signup";
//   providerName: ProviderName;
// }) {
//   const label = providerLabels[providerName];
//   const formAction = `/auth/${providerName}`;
//   const isPending = useIsPending({ formAction });
//   return (
//     <Form
//       className="flex items-center justify-center gap-2"
//       action={formAction}
//       method="POST"
//     >
//       <Button
//         className="w-full"
//         type="submit"
//         // variant="contained"
//         // fullWidth={true}
//         // loading={isPending}
//       >
//         <span
//           style={{ display: "inline-flex", alignItems: "center", gap: "1.5em" }}
//         >
//           {providerIcons[providerName]}
//           <span>
//             {type} with {label}
//           </span>
//         </span>
//       </Button>
//     </Form>
//   );
// }
