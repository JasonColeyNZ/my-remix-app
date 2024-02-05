import { type Path, navigation } from "~/app-navigation.tsx";

export type SubSubMenu = {
  parentPath: string;
  subMenu?: Path[];
};

export const findSubmenu = (
  pathName: string,
  clientId: string | undefined,
  memberId: string | undefined,
  serviceId: string | undefined,
) => {
  // console.log("pathName", pathName);
  let subMenu: Path[] = [];
  let subSubMenu: SubSubMenu | null = null;
  const processPath = (path: string) => {
    if (path.includes("$clientId"))
      path = path.replace("$clientId", clientId ?? "");
    if (path.includes("$memberId"))
      path = path.replace("$memberId", memberId ?? "");
    if (path.includes("$serviceId"))
      path = path.replace("$serviceId", serviceId ?? "");
    return path;
  };

  const navItem =
    navigation.find((nav) => {
      if (nav.regExp && nav.regExp.test(pathName + " ")) return nav;
      return false;
    }) || null;

  if (navItem && navItem.subMenu)
    subMenu = navItem.subMenu?.map((nav) => {
      return {
        ...nav,
        path: processPath(nav.path),
        subMenu: nav.subMenu?.map((subNav) => {
          return {
            ...subNav,
            path: processPath(subNav.path),
            subMenu: subNav.subMenu?.map((subSubNav) => {
              return {
                ...subSubNav,
                path: processPath(subSubNav.path),
              };
            }),
          };
        }),
      };
    });
  else subMenu = [];

  const subNavItem =
    (navItem &&
      navItem.subMenu &&
      navItem.subMenu.find((nav) => {
        //       console.log("nav", nav);
        if (nav.regExp && nav.regExp.test(pathName + " ")) return nav;
        return false;
      })) ||
    null;
  // console.log("subMenu", navItem);
  if (subNavItem && subNavItem.subMenu)
    subSubMenu = { parentPath: subNavItem.path, subMenu: subNavItem.subMenu };
  // subNavItem.subMenu.map((nav) => ({
  //   parentPath: subNavItem.path,
  //   subMenu: nav.subMenu,
  // })),
  else subSubMenu = null;
  return { subMenu, subSubMenu };
};
