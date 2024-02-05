import { Link } from "@remix-run/react";
import { cn } from "~/utils/shadcn.utils.ts";

type Props = {
  appearance?: "list-item" | "button";
  children: string;
  href: string;
};

export function NavbarItem({
  appearance = "list-item",
  children,
  href,
}: Props) {
  const isButton = appearance === "button";

  return (
    <li>
      <Link
        className={cn(
          "block text-center uppercase tracking-[0.2em] text-white transition-colors md:text-[0.76rem] md:tracking-[0.125rem]",
          {
            "border-b border-gray-500 py-4 first:border-t hover:text-secondary-4 focus:outline-none focus-visible:text-secondary-4 md:border-0 md:text-neutral-800 md:first:border-0":
              !isButton,
            "mt-5 rounded border-2 border-white py-3 font-medium md:mt-0":
              isButton,
            "md:border-primary-10 md:text-black md:bg-white md:px-4": isButton,
            "md:py-2 md:shadow-lg md:hover:bg-primary md:hover:text-white":
              isButton,
            "md:focus:outline-none md:focus-visible:bg-primary ": isButton,
            "md:focus-visible:text-primary-4 xl:py-[0.55rem] xl:px-[1.9rem]":
              isButton,
          },
        )}
        to={href}
      >
        {children}
      </Link>
    </li>
  );
}
