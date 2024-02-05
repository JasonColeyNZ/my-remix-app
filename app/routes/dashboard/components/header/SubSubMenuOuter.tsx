import type { Path } from "~/app-navigation";
import { cn } from "~/utils/shadcn.utils";
import SubSubMenu from "./SubSubMenu";
import { useLocation } from "@remix-run/react";
import { animated, useSpring } from "@react-spring/web";
import { useEffect, useState } from "react";
import type { RoleType } from "~/utils/types";

const SubSubMenuOuter = ({
  subMenu,
  permissions,
}: {
  subMenu: Path;
  permissions: RoleType[];
}) => {
  const location = useLocation();

  const [isPathActive, setIsPathActive] = useState(false);

  useEffect(() => {
    if (!subMenu.path) return setIsPathActive(false);
    setIsPathActive(location.pathname.startsWith(subMenu.path));
  }, [location.pathname, subMenu.path]);

  const charCount = (submenu: Path) => {
    let count = 0;
    if (submenu.subMenu) {
      submenu.subMenu.forEach((subMenu) => {
        count += Math.max(subMenu.text.length, 5);
      });
    }
    // console.log("count", submenu.text, count);
    return count * 12;
  };

  const { maxWidth } = useSpring({
    from: { maxWidth: 0 },
    to: { maxWidth: isPathActive ? charCount(subMenu) : 0 },
    delay: 50,
    config: { mass: 1, tension: 250, friction: 56 },
  });

  if (!subMenu.subMenu) return null;

  // const isPathActive = (
  //   path: string | undefined,
  //   //  parentPath: string | undefined,
  // ) => {
  //   // console.log("path", path);
  //   // console.log("location.pathname", location.pathname);
  //   if (!path) return false;
  //   if (location.pathname.startsWith(path)) return true;
  //   return false;
  // };

  return (
    <animated.ul
      className={cn(
        "flex flex-row mt-[-1px] gap-1 rounded-xl rounded-l-none",
        " overflow-clip mb-px p-px pl-[2px] border-[1px] border-l-0",
        isPathActive
          ? " bg-primary-4 border-primary-8"
          : "  bg-transparent border-transparent",
      )}
      style={{ maxWidth }}
    >
      {subMenu.subMenu.map((navItem) => (
        <SubSubMenu
          key={navItem.path}
          navItem={navItem as Path}
          permissions={permissions}
        />
      ))}
    </animated.ul>
  );
};

export default SubSubMenuOuter;
