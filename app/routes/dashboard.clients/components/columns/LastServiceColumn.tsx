import { useLocales } from "remix-utils/locales/react";
import ServiceBadge from "~/components/ui/service-badge";

const LastServicesColumn = ({ service }: { service: string | null }) => {
  const locales = useLocales();
  if (!service) return <div></div>;
  const tempServices = service.split("||")[1].split(",");
  const startDate = service.split("||")[0];
  const processedServices = tempServices.map((service) => {
    const [name, color] = service.split("|");
    return { name, color };
  });

  // console.log("processedServices", processedServices);
  return (
    <div className="flex gap-2">
      <div className="text-xs self-center">
        {new Date(startDate).toLocaleDateString(locales)}
      </div>
      {processedServices.map((service) => (
        <ServiceBadge
          key={service.name}
          name={service.name}
          color={service.color}
        />
      ))}
    </div>
  );
};

export default LastServicesColumn;
