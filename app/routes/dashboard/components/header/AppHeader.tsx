import { NavLink, useFetcher, useLoaderData } from "@remix-run/react";
// import { useEffect, useState } from "react";
import { MdOutlineMenu, MdOutlineSettings } from "react-icons/md/index.js";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import appInfo from "~/app-info.tsx";
import type { Path } from "~/app-navigation.tsx";
import { navigation } from "~/app-navigation.tsx";
import AppIcon from "~/assets/app.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar.tsx";
import { Button } from "~/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/drop-down-menu.tsx";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "~/components/ui/navigation-menu.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import { userInitials } from "~/utils/strings.tsx";

import type { loader } from "../../route.tsx";
import SubSubMenuOuter from "./SubSubMenuOuter.tsx";
import SubMenu from "./SubMenu.tsx";

const userNavigation = [
  { name: "Your Profile", href: "/dashboard/member/profile" },
  { name: "Settings", href: "/dashboard/settings" },
  { name: "Sign out", href: "/logout" },
];

const Header = () => {
  const {
    user,
    locations,
    selectedLocation,
    subMenu,
    // subSubMenu: loaderSubSubMenu,
  } = useLoaderData<typeof loader>();
  const locationFetcher = useFetcher();
  // console.log("user", user.roles);

  // const [isScrollOnPageTop, setIsScrollOnPageTop] = useState(true);
  // const [subMenu, setSubmenu] = useState(loaderSubMenu);
  // const [activeSubMenu, setActiveSubMenu] = useState<Path | null>(null);

  // const [subSubMenu, setSubSubmenu] = useState(loaderSubSubMenu);

  // const [springs, api] = useSpring(() => ({
  //   from: { maxWidth: 0 },
  // }));

  // console.log("subMenu", subMenu);
  // console.log("subSubMenu", subSubMenu);

  // useEffect(() => {
  //   setSubmenu(loaderSubMenu);
  //   setSubSubmenu(loaderSubSubMenu);
  // }, [loaderSubMenu, loaderSubSubMenu]);

  // useEffect(() => {
  //   setIsScrollOnPageTop(window.scrollY < 20);

  //   const onScroll = () => {
  //     setIsScrollOnPageTop(window.scrollY < 20);
  //   };
  //   window.addEventListener("scroll", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // }, []);

  const handleNewBooking = () => {
    window.open("/addbooking", "_blank");
  };

  return (
    <>
      <div className={`sticky flex w-full flex-col top-0 z-50`}>
        <div
          className={`absolute w-full shadow-md bg-header top-0 ${
            // isScrollOnPageTop
            // ?
            " h-max-[3em] h-min-[3em] h-[3em]"
            // : "h-max-[2em] h-min-[2em] h-[2em]"
          }`}
        ></div>

        <div className="flex w-full flex-1 md:max-w-[1000px] lg:max-w-[1200px] mx-auto lg:mr-auto lg:ml-auto  ">
          <NavigationMenu
            className={` header-toolbar shadow-0 border-0 w-full max-w-none ${
              // isScrollOnPageTop
              // ?
              "h-max-[3em] h-min-[3em] h-[3em]"
              // : "h-max-[2em] h-min-[2em] h-[2em]"
            }`}
          >
            <NavigationMenuList
              id="navigation-menu-list"
              className="justify-between select-none "
            >
              {/* Container */}
              <div className="flex flex-col flex-1 h-max-[3em] h-min-[3em] h-[3em]">
                {/* Top Bar */}
                <div className="h-max-[3em] h-min-[3em] h-[3em] justify-between flex flex-1 flex-row pt-0 items-center">
                  <div
                    className="hidden md:flex text-sm  text-primary-10 text-decoration-none
              mr-2 ml-3 md:text-xl whitespace-nowrap"
                  >
                    <span>
                      <AppIcon className={cn(" mr-1")}></AppIcon>
                    </span>
                    <div className="flex flex-col">
                      <NavLink
                        className="font-[monospace] tracking-wider font-bold"
                        to={"/"}
                      >
                        {appInfo.title}
                      </NavLink>
                      <div className="pl-1 text-xs ">
                        {user.entity.name}
                        {locations && locations.length > 1 && (
                          <>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="ml-2 bg-primary-4 border-primary-8 text-primary-10 rounded-full border px-2 hover:bg-primary-9 hover:text-primary-2">
                                {selectedLocation}
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="text-foreground text-sm font-medium">
                                <DropdownMenuLabel className="text-sm font-medium text-primary-10">
                                  Choose Location
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <locationFetcher.Form method="POST">
                                  <AuthenticityTokenInput />
                                  <HoneypotInputs />
                                  <input
                                    type="hidden"
                                    name="intent"
                                    value="change-location"
                                    onChange={() => {}}
                                  />
                                  {locations &&
                                    locations.map((location) => (
                                      <DropdownMenuItem
                                        key={location.id}
                                        className="py-0.5 px-0.5"
                                      >
                                        <Button
                                          variant="ghost"
                                          type="submit"
                                          name="locationId"
                                          value={location.id}
                                          className="normal-case justify-start w-full p-2 h-5"
                                        >
                                          {location.name}
                                        </Button>
                                      </DropdownMenuItem>
                                    ))}
                                </locationFetcher.Form>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile header */}
                  <NavigationMenuItem className="md:hidden">
                    <NavigationMenuTrigger>
                      <Button variant="link" size="icon" asChild>
                        <MdOutlineMenu />
                      </Button>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid gap-3 p-4 md:w-[400px] bg-gradient-to-b from-primary-4 to-primary-3">
                        {navigation.map(
                          (page) =>
                            !page.hidden && (
                              <li key={page.path} className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <NavLink
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md text-primary bg-white p-1 px-2  no-underline outline-none focus:shadow-md"
                                    key={page.path}
                                    to={page.path}
                                    // prefetch="intent"
                                  >
                                    <div className="text-center">
                                      {page.text}
                                    </div>
                                  </NavLink>
                                </NavigationMenuLink>
                              </li>
                            ),
                        )}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <div className="md:hidden flex-1 flex whitespace-nowrap mr-2 grow font-[monospace] text-xl tracking-wider font-bold text-primary-10 text-decoration-none">
                    <span>
                      <AppIcon className={cn("ml-1 pb-0.5 mr-1", {})}></AppIcon>
                    </span>
                    <NavLink to={"/"}>{appInfo.title}</NavLink>
                  </div>

                  {/* Main Menu */}
                  <div className="pt-1 hidden md:flex flex-col h-8">
                    <div className="flex grow ml-auto mr-auto ">
                      <ul className="flex flex-row p-4 py-0 ">
                        {navigation.map(
                          (page, index) =>
                            !page.hidden && (
                              <li key={page.path} className=" ">
                                <NavLink
                                  key={page.path}
                                  to={page.path}
                                  // prefetch="intent"
                                  end={index < 1 ? true : false}
                                  // className={({ isActive }) =>
                                  //   isActive ? "pointer-events-none" : ""
                                  // }
                                >
                                  {({ isActive }) => (
                                    <div
                                      className={cn(
                                        "transition-all duration-300 rounded-2xl font-xl text-xs lg:text-sm mx-[0.1em] whitespace-nowrap",
                                        "p-0.5 md:p-1 px-1 md:px-2 block ",
                                        "outline-none select-none ",
                                        "lg:mx-1 lg:p-1 lg:px-4 hover:bg-primary-9 hover:text-primary-2",
                                        {
                                          "bg-primary text-primary-2": isActive,
                                          "text-primary-9": !isActive,
                                          "flex lg:px-2":
                                            page.text === "Settings",
                                        },
                                      )}
                                    >
                                      {page.text === "Settings" && (
                                        <Tooltip>
                                          <TooltipTrigger>
                                            <MdOutlineSettings />
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            Open Settings
                                          </TooltipContent>
                                        </Tooltip>
                                      )}
                                      {page.text !== "Settings" && page.text}
                                    </div>
                                  )}
                                </NavLink>
                              </li>
                            ),
                        )}
                      </ul>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="success"
                            className="text-xs p-2 h-6"
                            onClick={handleNewBooking}
                          >
                            New Booking
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Open a new tab to create a new booking
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>
                  {/* Profile Menu */}
                  <div className="grow-0 pr-2 pb-1 pt-1">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-none ">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Avatar className="h-10">
                              <AvatarImage
                                alt={`${user.firstName} ${user.lastName}`}
                                src={user.avatarData?.publicUrl ?? ""}
                              />
                              <AvatarFallback>
                                {userInitials(user.firstName, user.lastName)}
                              </AvatarFallback>
                            </Avatar>
                          </TooltipTrigger>
                          <TooltipContent>Profile Settings</TooltipContent>
                        </Tooltip>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {userNavigation.map((setting) => (
                          <DropdownMenuItem key={setting.href}>
                            <NavLink
                              className="flex h-full w-full select-none flex-col justify-end rounded-md text-primary bg-white p-3 no-underline outline-none focus:shadow-md"
                              key={setting.href}
                              to={setting.href}
                              // prefetch="intent"
                            >
                              <div className="text-center">{setting.name}</div>
                            </NavLink>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {/* Second Bar */}
                {subMenu && subMenu.length > 0 && (
                  <div>
                    <div className="hidden md:flex flex-col mt-px">
                      <div className="ml-auto mr-auto bg-header pt-px">
                        <ul className="flex flex-row gap-0 md:gap-1 shadow-md rounded-md rounded-t-none p-1 py-[2px]">
                          {subMenu.map((subMenu) => (
                            <li key={subMenu.path} className="flex shrink ">
                              <SubMenu
                                subMenu={subMenu as Path}
                                permissions={user.roles}
                              />
                              <SubSubMenuOuter
                                subMenu={subMenu as Path}
                                permissions={user.roles}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div
          className={`w-full  ${
            subMenu && subMenu.length > 0
              ? "md:h-max-[2em] md:h-min-[2em] md:h-[2em]"
              : "h-max-0 h-min-0 h-0"
          }`}
        ></div>
      </div>
    </>
  );
};
export default Header;
