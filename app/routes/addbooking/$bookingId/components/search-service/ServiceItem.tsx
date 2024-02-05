import { cn } from "~/utils/shadcn.utils";

export type ServicesType = {
  id: string;
  name: string;
  color: string;
  textColor: string;
  selected: boolean;
};

const ServiceItem = ({
  service,
  handleItemClick,
}: {
  service: ServicesType;
  handleItemClick: (id: string) => void;
}) => {
  return (
    <div
      key={service.id}
      className={cn(
        "flex select-none cursor-pointer items-center justify-between px-2 py-1 rounded-md",
        "border-[1px] border-gray-100 hover:bg-primary-6 hover:border-primary-8",
        service.selected && "bg-primary-6 border-primary-8",
      )}
      onClick={() => handleItemClick(service.id)}
    >
      <div className="flex flex-col">
        <div className="text-xs font-medium">{service.name}</div>
      </div>
    </div>
  );
};

export default ServiceItem;
