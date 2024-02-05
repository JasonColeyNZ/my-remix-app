import ServiceBadge from "~/components/ui/service-badge";
import type { BookingServiceType } from "~/models/booking.server";

const ServicesColumn = ({ services }: { services: BookingServiceType[] }) => {
  // const processedServices = services.split("||").map((service) => {
  //   const [name, color] = service.split("|");
  //   return { name, color };
  // });
  return (
    <div className="flex gap-2">
      {services.map((service) => (
        <ServiceBadge
          key={service.name}
          name={service.name}
          color={service.color}
          textColor={service.textColor}
        />
      ))}
    </div>
  );
};

export default ServicesColumn;
