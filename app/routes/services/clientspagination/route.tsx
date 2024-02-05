// import { json } from "@remix-run/cloudflare";
// import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
// import type { ClientsItemType } from "~/models/client.server.ts";
// import { getPaginatedClients } from "~/models/client.server.ts";
// import { invariantResponse } from "~/utils/misc.tsx";
// import { requireUserSession } from "~/utils/session.server.ts";

// // import { getPaginatedItems, getTotalItems } from "~/models/item.server.ts";

// // import { requireUserId } from "~/session.server";

// export type ClientTableData = {
//   clients: ClientsItemType[] | [];
//   error?: string;
// };

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   const url = new URL(request.url);
//   const page = Number(url.searchParams.get("page"));
//   const limit = Number(url.searchParams.get("limit"));
//   const offset = page * limit;

//   try {
//     const clients = await getPaginatedClients(
//       {
//         skip: offset,
//         take: limit,
//       },
//       sbUser,
//     );

//     return json<ClientTableData>({
//       clients,
//     });
//   } catch (error) {
//     return json<ClientTableData>({
//       clients: [],
//       error: `Error finding items ${error}`,
//     });
//   }
// };

// const route = () => {
//   return <div>route</div>;
// };

// export default route;
