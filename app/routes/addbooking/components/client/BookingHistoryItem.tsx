import DetailRow from "~/components/data-rows/DetailRow";
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
    <div className="m-1 border-[1px] rounded-md p-1">
      <DetailRow
        label="Date"
        value={getDateString(booking.startDate, {
          weekday: "short",
          month: "short",
          day: "numeric",
        })}
      />
      <DetailRow
        label="Duration"
        value={appointmentDuration(booking.startDate, booking.endDate)}
      />
      <div className="flex gap-2">
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
