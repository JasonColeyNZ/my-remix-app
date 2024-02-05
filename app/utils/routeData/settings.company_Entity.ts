// import type { EntityItemType } from "~/models/entity.server.ts";
// import { loader } from "~/routes/dashboard.settings.company/info/route.tsx";
// import { useMatchesData } from "~/utils.ts";

// function isEntity(entity: any): entity is EntityItemType {
//   return (
//     entity && typeof entity === "object" && typeof entity.name === "string"
//   );
// }

// export async function useOptionalEntity(): EntityItemType | undefined {
//   const data = useMatchesData<typeof loader>(
//     "routes/dashboard.settings/company/info/route",
//   );
//   // console.log("useOptionalEntity", data);
//   if (!data ) {
//     return undefined;
//   }
//   // if (!isEntity(data.entity)) {
//   //   throw new Error(
//   //     "No entity found in root loader, but entity is required by useEntity.",
//   //   );
//   // }
//   return data.entity;
// }

// export function useEntity(): EntityItemType | null {
//   const maybeEntity = useOptionalEntity();
//   if (!maybeEntity) {
//     throw new Error(
//       "No entity found in root loader, but entity is required by useEntity.",
//     );
//   }
//   return maybeEntity;
// }
