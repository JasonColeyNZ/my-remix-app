import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import appInfo from "~/app-info.tsx";
import AppIcon from "~/assets/app.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import { type loader } from "../../route.tsx";
import { ContentContainer } from "../ContentContainer.tsx";
import { NavbarItem } from "./navbar-item.tsx";
import { Navbar } from "./navbar.tsx";
import { FacebookIcon } from "../icons/facebook-icon.tsx";
import { TwitterIcon } from "../icons/twitter-icon.tsx";

export function Header() {
  const [isScrollOnPageTop, setIsScrollOnPageTop] = useState(true);
  const { user } = useLoaderData<typeof loader>();

  useEffect(() => {
    setIsScrollOnPageTop(window.scrollY === 0);

    const onScroll = () => {
      setIsScrollOnPageTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn("fixed top-0 right-0 left-0 z-10 bg-white", {
        "shadow-lg": !isScrollOnPageTop,
      })}
    >
      <ContentContainer
        className={cn(
          "xl:mx-aut flex items-center justify-between px-8 transition-[height] xl:pl-[5.6rem] xl:pr-[5.25rem] 2xl:pl-[7.25rem] 2xl:pr-[6.8rem]",
          {
            "h-header xl:h-header-xl": isScrollOnPageTop,
            "h-16": !isScrollOnPageTop,
          },
        )}
      >
        <h1
          className={cn(
            " text-primary col-span-2 align-top text-center text-3xl font-medium leading-snug lg:text-left lg:text-4xl xl:col-span-3 xl:pt-20 xl:text-5xl xl:leading-[1.1]",
            {
              " xl:text-3xl xl:pt-0": !isScrollOnPageTop,
            },
          )}
        >
          <span>
            <AppIcon
              className={cn("mt-1 pb-1 mr-3", {
                "mt-0": !isScrollOnPageTop,
              })}
            ></AppIcon>
          </span>
          {appInfo.title}
        </h1>
        <Navbar shrinkHeader={!isScrollOnPageTop}>
          <ul className="flex flex-1 flex-col md:flex-row md:items-center md:gap-8 xl:gap-[2.85rem]">
            <NavbarItem href="#">Features</NavbarItem>
            <NavbarItem href="#">Pricing</NavbarItem>
            <NavbarItem href="#">Contact</NavbarItem>

            {user ? (
              <>
                <NavbarItem appearance="button" href="/dashboard">
                  Dashboard
                </NavbarItem>
                <NavbarItem appearance="button" href="/logout">
                  Logout
                </NavbarItem>
              </>
            ) : (
              <>
                <NavbarItem appearance="button" href="/signup">
                  Sign Up
                </NavbarItem>
                <NavbarItem appearance="button" href="/login">
                  Login
                </NavbarItem>
              </>
            )}
          </ul>

          <div className="mt-3 flex items-center gap-8 self-center md:hidden">
            <Link to="#">
              <FacebookIcon
                idSuffix="header"
                className="w-5 fill-white"
                aria-hidden
              />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link to="#">
              <TwitterIcon
                idSuffix="header"
                className="w-5 fill-white"
                aria-hidden
              />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </Navbar>
      </ContentContainer>
    </header>
  );
}
