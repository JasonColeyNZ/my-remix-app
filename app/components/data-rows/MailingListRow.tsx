import type { TagItemType } from "~/models/tag.server";
import ClientMailingLists from "~/routes/dashboard.clients.$clientId/components/ClientMailingLists";
import Tag from "../ui/tag";

const MailingListRow = ({ tags }: { tags: TagItemType[] | null }) => {
  return (
    <div className="flex flex-row gap-2 items-baseline min-h-2">
      <div className="flex items-center w-1/3 text-xs text-slate-500">
        Mailing Lists
        <ClientMailingLists />
      </div>
      <div className="flex w-2/3 gap-1 flex-wrap">
        {tags && tags.map((tag) => <Tag key={tag.id} tag={tag} />)}
      </div>
    </div>
  );
};

export default MailingListRow;
