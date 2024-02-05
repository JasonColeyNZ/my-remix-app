import { NavLink } from "@remix-run/react";
import React from "react";
import type { Path } from "~/app-navigation";
import { cn } from "~/utils/shadcn.utils";
import type { RoleType } from "~/utils/types";

const SubSubMenu = ({
  navItem,
  permissions,
}: {
  navItem: Path;
  permissions: RoleType[];
}) => {
  // console.log("navItem", navItem);
  if (navItem.identifier) {
    const p = permissions.find((p) => navItem.identifier?.includes(p.module));
    if (!p) return null;
  }
  return (
    <li key={navItem.path}>
      <NavLink
        key={navItem.path}
        to={navItem.path}
        className={({ isActive }) =>
          cn("flex overflow-clip", isActive ? "pointer-events-none" : "")
        }
        prefetch="intent"
      >
        {({ isActive }) => (
          <div
            className={cn(
              "text-xs py-[0] lg:py-[2px] rounded-xl px-2 block outline-none select-none whitespace-nowrap ",
              "lg:text-xs lg:px-3 hover:bg-primary-8 hover:text-primary-2 ",
              {
                "bg-primary text-primary-2": isActive,
                "bg-background text-primary": !isActive,
              },
            )}
          >
            {navItem.text}
          </div>
        )}
      </NavLink>
    </li>
  );
};

export default SubSubMenu;
