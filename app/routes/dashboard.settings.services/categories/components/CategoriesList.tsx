import { NavLink, useLoaderData } from "@remix-run/react";

import type { loader } from "../route.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import ServiceBadge from "~/components/ui/service-badge.tsx";
import { Card, CardContent } from "~/components/ui/card.tsx";

const CategoriesList = () => {
  //console.log("CategoriesList Render");
  const { categories } = useLoaderData<typeof loader>();

  return (
    <div className="flex px-2">
      <Card
        className={cn(
          "flex p-0 ",
          "rounded-none lg:rounded-md shadow-card",
          "w-[180px] min-w-[180px] ",
          "overflow-hidden ",
          "flex-col my-2 md:w-[240px] md:min-w-[240px]",
        )}
      >
        <CardContent className="w-full h-full p-2 pt-1">
          {categories.length === 0 && (
            <div className="flex justify-center w-full h-full">
              <div className="text-center">
                <h2 className="text-foreground font-light">
                  No Categories found
                </h2>
              </div>
            </div>
          )}
          {categories &&
            categories.map((category) => (
              <NavLink
                key={category.id}
                className="rounded-lg"
                to={category.id}
                end
                replace={true}

                // preventScrollReset={true}
              >
                {({ isActive }) => (
                  <div
                    className={cn(
                      "flex items-center rounded-lg my-1 cursor-pointer",
                      isActive ? "bg-primary-8" : "bg-white",
                      "hover:bg-primary-9 overflow-hidden",
                    )}
                  >
                    <ServiceBadge
                      key={category.name}
                      name={category.name}
                      color={category.color}
                      textColor={category.textColor}
                      className={"w-full py-1 px-2 font-light text-base"}
                    />
                  </div>
                )}
              </NavLink>
            ))}
        </CardContent>
      </Card>
    </div>
  );
};
export default CategoriesList;
