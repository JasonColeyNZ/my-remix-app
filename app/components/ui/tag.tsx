import { MdOutlineLink } from "react-icons/md/index.js";
import type { TagItemType } from "~/models/tag.server";
const Tag = ({ tag }: { tag: TagItemType }) => {
  return (
    <>
      <div className="flex items-start">
        <div
          className="text-xs rounded-xl px-2 py-[2px]"
          style={{
            backgroundColor: tag.color,
            color: tag.textColor,
          }}
        >
          {tag.name}
        </div>
        {tag.integrationTagId && (
          <MdOutlineLink className="animate-pulse h-5 pt-0  text-primary" />
        )}
      </div>
    </>
  );
};

export default Tag;
