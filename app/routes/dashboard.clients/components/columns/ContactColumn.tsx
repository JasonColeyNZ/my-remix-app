import { MdOutlineContentCopy } from "react-icons/md/index.js";
import { Button } from "~/components/ui/button";
import type { ClientsItemType } from "~/models/client.server";

const ContactColumn = ({ props }: { props: ClientsItemType }) => {
  return (
    <div className="flex flex-col">
      <div className="text-xs">{props.mobileNumber}</div>
      <div className="text-xs text-primary-8 whitespace-nowrap items-center">
        {props.email}
        <Button
          className="h-4 w-4 p-0 mt-1"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(props.email);
          }}
        >
          <MdOutlineContentCopy />
        </Button>
      </div>
    </div>
  );
};

export default ContactColumn;
