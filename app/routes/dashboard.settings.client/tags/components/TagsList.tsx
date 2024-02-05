import { NavLink, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";

import type { loader as tagIdLoader } from "../$tagId/route.tsx";
import type { loader } from "../route.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import Tag from "~/components/ui/tag.tsx";
import VList from "~/components/vertical-list/VList.tsx";

const TagsList = () => {
  const { tags } = useLoaderData<typeof loader>();
  const tagIdLoaderData = useRouteLoaderData<typeof tagIdLoader>(
    "routes/dashboard.settings/client/tags/$tagId/route",
  );

  const tagId = tagIdLoaderData?.tag.id;

  const [selectedTagId, setSelectedTagId] = useState<string>(tagId ?? "");

  useEffect(() => {
    if (!tagId) return;
    setSelectedTagId(tagId);
  }, [tagId]);

  return (
    <div className="flex px-2">
      <VList
        selectedId={selectedTagId}
        className="my-2 w-[180px] md:w-[240px] min-w-[180px] md:min-w-[240px]"
      >
        {tags.length === 0 && (
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center">
              <h2 className="text-foreground font-light">No tags found</h2>
            </div>
          </div>
        )}
        {tags &&
          tags.map((tag) => (
            <NavLink key={tag.id} className="" to={tag.id} end replace={true}>
              {({ isActive }) => (
                <div
                  className={cn(
                    "flex items-center p-2 rounded-md border-[1px] hover:bg-primary-6 cursor-pointer mb-1",
                    isActive
                      ? "rounded-md border-[1px] bg-gray-100 border-primary-8"
                      : "bg-white",
                  )}
                >
                  <Tag tag={tag} />
                </div>
              )}
            </NavLink>
          ))}
      </VList>
    </div>
  );
};
export default TagsList;
