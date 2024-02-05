import { NavLink } from "@remix-run/react";
import type { Path } from "~/app-navigation";
import { cn } from "~/utils/shadcn.utils";
import type { RoleType } from "~/utils/types";

const SubMenu = ({
  subMenu,
  permissions,
}: {
  subMenu: Path;
  permissions: RoleType[];
}) => {
  if (subMenu.identifier) {
    const p = permissions.find((p) => subMenu.identifier?.includes(p.module));
    if (!p) return null;
  }
  return (
    <NavLink
      key={subMenu.path}
      to={subMenu.path}
      prefetch="intent"
      className={({ isActive }) => (isActive ? "pointer-events-none" : "")}
    >
      {({ isActive }) => (
        <div
          className={cn(
            "transition-all duration-300 text-xs py-[2px] rounded-xl px-2 block outline-none select-none whitespace-nowrap ",
            "lg:text-sm lg:px-3 hover:bg-primary-8 hover:text-primary-2 border-[1px] mt-[-1px] py-[1px] border-r-0",

            isActive ? "bg-primary text-primary-2 " : "text-primary-8",

            subMenu.subMenu && subMenu.subMenu.length > 0 && isActive
              ? "rounded-r-none  border-primary-8  bg-primary-4 text-primary-9 "
              : "border-transparent",
          )}
        >
          {subMenu.text}
        </div>
      )}
    </NavLink>
  );
};

export default SubMenu;
