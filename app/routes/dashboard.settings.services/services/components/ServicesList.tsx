import { NavLink, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

import type { loader as serviceIdLoader } from "../$serviceId/route.tsx";
import type { loader } from "../route.tsx";
import AccordionList from "~/components/accordion-list/AccordionList.tsx";
import ServiceBadge from "~/components/ui/service-badge.tsx";

interface ServicesListProps {
  navigateToSelectedId: (id: string) => void;
}

const ServicesList = ({ navigateToSelectedId }: ServicesListProps) => {
  //console.log("ServicesList Render");
  const { categories } = useLoaderData<typeof loader>();
  // console.log("services: ", services);
  const serviceIdLoaderData = useRouteLoaderData<typeof serviceIdLoader>(
    "routes/dashboard.settings.services/services/$serviceId/route",
  );

  const serviceId = serviceIdLoaderData?.service.id;
  // console.log("serviceId: ", serviceId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string[]>([]);

  useEffect(() => {
    // if (!serviceId) return;
    // console.log("serviceId: ", serviceId);
    // console.log("categories: ", categories);
    const category = categories.find((c) =>
      c.services.find((s) => {
        // console.log("s.id: ", s.id);
        return s.id === serviceId;
      }),
    );
    // console.log("category: ", category);
    setSelectedCategoryId(category ? [category.id] : []);
  }, [categories, serviceId]);

  return (
    <AccordionList
      selectedId={selectedCategoryId}
      setSelectedId={setSelectedCategoryId}
    >
      {categories.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <div className="text-center">
            <h2 className="text-foreground font-light">No Services found</h2>
          </div>
        </div>
      )}

      {categories &&
        categories.map((category) => (
          <div key={category.id}>
            <AccordionItem
              value={category.id}
              className="select-none"
              style={{
                borderColor: category.color,
                borderBottomWidth: 0,
              }}
            >
              <AccordionTrigger
                className="rounded-md font-light text-base py-1 px-2 m-1 mb-0 w-full border mr-1 shadow-sm"
                style={{
                  backgroundColor: category.color,
                  color: category.textColor,
                  borderColor: category.color,
                }}
              >
                <div>{category.name}</div>
                {/* <span>{category.name}</span> */}
              </AccordionTrigger>
              <AccordionContent
                className="mx-2 mt-[-1px] mb-0 p-0 pt-0 pb-0 overflow-hidden border-[1px] border-t-0 rounded-md rounded-t-none"
                style={{ borderColor: category.color }}
              >
                {category.services &&
                  category.services.map((service) => (
                    <NavLink
                      key={service.id}
                      className="focus-visible:border-none focus:bg-primary-6 focus-visible:outline-none"
                      to={`/dashboard/settings/services/services/${service.id}`}
                      end
                      replace={true}
                    >
                      {({ isActive }) => (
                        <div
                          className={cn(
                            "flex items-center gap-2 p-1 hover:bg-primary-6 cursor-pointer",
                            isActive ? "bg-primary-4" : "bg-transparent",
                            // "focus-visible:bg-primary-6",
                          )}
                        >
                          <ServiceBadge
                            key={service.name}
                            name={service.name}
                            color={
                              service.color ? service.color : category.color
                            }
                            textColor={
                              service.textColor
                                ? service.textColor
                                : category.textColor
                            }
                          />
                        </div>
                      )}
                    </NavLink>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </div>
        ))}
    </AccordionList>
  );
};
export default ServicesList;
