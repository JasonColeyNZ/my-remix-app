import ServiceBadge from "~/components/ui/service-badge";
import type { ClientBookingItemType } from "~/models/booking.server";
import { appointmentDuration, getDateString } from "~/utils/strings";

const BookingHistoryItem = ({
  booking,
}: {
  booking: ClientBookingItemType;
}) => {
  // console.log("booking: ", booking);
  return (
    <div className="text-xs m-1 border-[1px] rounded-md overflow-hidden border-primary-6">
      <div className="flex justify-center p-1 bg-primary-6 font-semibold">
        {getDateString(booking.startDate, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}{" "}
        <span className="pl-1 font-normal">{`(${appointmentDuration(
          booking.startDate,
          booking.endDate,
        )})`}</span>
      </div>
      <div className="flex gap-2 p-1">
        {booking.services.map((service) => (
          <ServiceBadge
            key={service.name}
            name={service.name}
            color={service.color}
            textColor={service.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingHistoryItem;
