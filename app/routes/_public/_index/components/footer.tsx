import type { ComponentProps } from "react";
import { cn } from "~/utils/shadcn.utils.ts";

import { ContentContainer } from "./ContentContainer.tsx";
import { FacebookIcon } from "./icons/facebook-icon.tsx";
import { TwitterIcon } from "./icons/twitter-icon.tsx";

function Link({ children, className, ...props }: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "transition-colors hover:text-secondary-400 focus:outline-none focus-visible:text-secondary-400",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function Footer() {
  return (
    <footer className="bg-neutral-800">
      <ContentContainer className="flex flex-col items-center py-10 text-white md:flex-row md:py-8 md:px-[2rem] xl:px-[6.9rem]">
        <nav
          aria-label="Footer navigation"
          className="mt-[2.35rem] flex flex-col items-center gap-[1.75rem] text-[0.875rem] uppercase tracking-[0.175em] md:mt-0 md:flex-1 md:flex-row md:pl-[2rem] md:text-xs lg:gap-[2.6rem] lg:pl-[4rem]"
        >
          <Link href="#">Features</Link>
          <Link href="#">Pricing</Link>
          <Link href="#">Contact</Link>

          <span className="hidden md:inline md:flex-1" />

          <div className="mt-4 flex items-center gap-10 md:mt-0">
            <Link
              href="#"
              className="fill-white hover:fill-secondary-400 focus-visible:fill-secondary-400"
            >
              <FacebookIcon idSuffix="footer" className="w-6" aria-hidden />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="#"
              className="fill-white hover:fill-secondary-400 focus-visible:fill-secondary-400"
            >
              <TwitterIcon idSuffix="footer" className="w-6" aria-hidden />
              <span className="sr-only">Twitter</span>
            </Link>
          </div>
        </nav>
      </ContentContainer>
    </footer>
  );
}
