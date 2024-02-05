import type { TagItemType } from "~/models/tag.server";
import ClientTags from "~/routes/dashboard.clients.$clientId/components/ClientTags";
import Tag from "../ui/tag";

const TagRow = ({ tags }: { tags: TagItemType[] | null }) => {
  return (
    <div className="flex flex-row gap-2 items-baseline min-h-2">
      <div className="flex items-center w-1/3 text-xs text-slate-500">
        Tags
        <ClientTags />
      </div>
      <div className="flex w-2/3 gap-1 flex-wrap">
        {tags && tags.map((tag) => <Tag key={tag.id} tag={tag} />)}
      </div>
    </div>
  );
};

export default TagRow;
