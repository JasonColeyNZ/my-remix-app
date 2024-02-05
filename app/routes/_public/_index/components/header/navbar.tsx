import { useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
import appInfo from "~/app-info.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import { MobileMenu } from "./mobile-menu.tsx";

type Props = {
  children: React.ReactNode;
  shrinkHeader?: boolean;
};

export function Navbar({ children, shrinkHeader }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center">
      <nav className="hidden md:block">{children}</nav>

      <button
        onClick={() => setIsOpen((isOpen) => !isOpen)}
        className={cn(
          "rounded-sm focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-800 md:hidden",
          { "opacity-0": isOpen },
        )}
      >
        <img src="/images/icon-hamburger.svg" alt="Open menu" />
      </button>

      <ClientOnly>
        {() => (
          <MobileMenu open={isOpen} onClose={() => setIsOpen(false)}>
            <div
              className={cn("flex items-center justify-between", {
                "h-header": !shrinkHeader,
                "h-16": shrinkHeader,
              })}
            >
              {appInfo.title}
              {/* <img
                src="/images/logo-bookmark-all-white.svg"
                alt="Home"
                className="grayscale filter"
              /> */}
              <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
                <img src="/images/icon-close.svg" alt="Close menu" />
              </button>
            </div>
            <nav
              className={cn("flex flex-1 flex-col justify-between", {
                hidden: !isOpen,
                block: isOpen,
              })}
              aria-label="Header navigation"
            >
              {children}
            </nav>
          </MobileMenu>
        )}
      </ClientOnly>
    </div>
  );
}
