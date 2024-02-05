import type { User } from "@supabase/supabase-js";
import { authenticatedPrismaClient } from "~/database/useSupabaseRLS.ts";
import type { RoleType } from "~/routes/dashboard.settings.security/roles/$roleId/roleSchema";

// type ModulePermissionType = {
//   id: string;
//   name: string;
//   rolePermissionId: string | null;
// };

// export type ModuleType = {
//   id: string;
//   name: string;
//   permissions: ModulePermissionType[];
// };

// export type RoleType = {
//   id: string;
//   name: string;
//   modules: ModuleType[];
// };

export async function getRoles(sbUser: User) {
  const roles = await authenticatedPrismaClient(sbUser).role.findMany({
    select: {
      id: true,
      name: true,
      users: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          avatarData: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return roles;
}

export type GetRoleType = {
  id: string;
  name: string;
  modules: {
    id: string;
    name: string;
    modulePermissions: {
      id: string;
      name: string;
      // permission: {
      //   id: string;
      //   name: string;
      // };
      checked: boolean;
      rolePermissionId: string;
    }[];
  }[];
};

export async function getRoleById(roleId: string, sbUser: User) {
  const role =
    roleId !== "new"
      ? ((await authenticatedPrismaClient(sbUser).role.findUnique({
          where: {
            id: roleId,
          },
          select: {
            id: true,
            name: true,
            permissions: {
              select: {
                id: true,
                modulePermissionId: true,
              },
            },
          },
        })) as {
          id: string;
          name: string;
          permissions: { modulePermissionId: string; id: string }[];
        })
      : { id: "new", name: "", modules: [], permissions: [] };

  const modules = await authenticatedPrismaClient(sbUser).module.findMany({
    orderBy: {
      name: "asc",
    },
    select: {
      id: true,
      name: true,
      modulePermissions: {
        orderBy: {
          permission: {
            name: "asc",
          },
        },
        select: {
          id: true,
          permission: {
            select: {
              id: true,
              name: true,
            },
          },
          roles: {
            select: {
              id: true,
              modulePermissionId: true,
            },
          },
        },
      },
    },
  });
  // console.log("modules", modules);
  return {
    // intent:
    //   roleId === "new" ? formViewerIntent.CREATE : formViewerIntent.UPDATE,
    id: role.id,
    name: role.name,
    // ...role,
    modules: modules.map((m) => ({
      ...m,
      modulePermissions: m.modulePermissions.map((p) => {
        return {
          // modulePermissionId: p.id,

          ...p.permission,
          id: p.id,
          rolePermissionId:
            role.permissions.find((rp) => {
              const r = p.roles.find(
                (r) => r.modulePermissionId === rp.modulePermissionId,
              );
              return r && r.modulePermissionId === rp.modulePermissionId;
            })?.id ?? null, // .permission.id,

          checked: role.permissions.find((rp) => {
            const r = p.roles.find(
              (r) => r.modulePermissionId === rp.modulePermissionId,
            );
            return r && r.modulePermissionId === rp.modulePermissionId;
          })?.id
            ? true
            : null,
        };
      }),
    })),
  } as GetRoleType;
}

export async function addRole(role: RoleType, sbUser: User) {
  const newRole = await authenticatedPrismaClient(sbUser).role.create({
    data: {
      name: role.name,
    },
  });

  await updateRolePermissions(newRole.id, role, sbUser);

  return await getRoleById(newRole.id, sbUser);
}

export async function updateRole(role: RoleType, sbUser: User) {
  await authenticatedPrismaClient(sbUser).role.update({
    where: {
      id: role.id,
    },
    data: {
      name: role.name,
    },
  });

  await updateRolePermissions(role.id, role, sbUser);

  return await getRoleById(role.id, sbUser);
}

async function updateRolePermissions(
  roleId: string,
  role: RoleType,
  sbUser: User,
) {
  //remove any items with rolePermissionId and checked false
  const removePermissions = role.modules
    .flatMap((m) => m.modulePermissions)
    .filter((p) => p.rolePermissionId && !p.checked)
    .map((p) => p.rolePermissionId || "");

  if (removePermissions.length > 0) {
    await authenticatedPrismaClient(sbUser).rolePermission.deleteMany({
      where: {
        id: {
          in: removePermissions,
        },
      },
    });
  }
  // console.log("removePermissions", removePermissions);

  //add any items with rolePermissionId and checked true
  const addPermissions = role.modules
    .flatMap((m) => m.modulePermissions)
    .filter((p) => !p.rolePermissionId && p.checked)
    .map((p) => p.id);

  // console.log("addPermissions", addPermissions);

  if (addPermissions.length > 0) {
    // console.log("addPermissions", addPermissions);
    await authenticatedPrismaClient(sbUser).rolePermission.createMany({
      data: addPermissions.map((p) => ({
        roleId,
        modulePermissionId: p,
      })),
    });
  }
}

// export async function getRoleById(roleId: string, sbUser: User) {
//   if (roleId === "new") {
//     return {
//       id: "new",
//       name: "",
//       permissions: [],
//     };
//   }

//   const role = (await authenticatedPrismaClient(sbUser).role.findUnique({
//     where: {
//       id: roleId,
//     },
//     select: {
//       id: true,
//       name: true,
//       permissions: {
//         select: {
//           permission: {
//             select: {
//               id: true,
//             },
//           },
//         },
//       },
//     },
//   })) as {
//     id: string;
//     name: string;
//     permissions: { permission: { id: string } }[];
//   };
//   return { ...role, permissions: role.permissions.map((s) => s.permission.id) };
// }
