import { useContext } from "react";
import { AddBookingContext } from "../../store/addBookingContext";
import DetailRow from "~/components/data-rows/DetailRow";
import SearchService from "~/routes/addbooking/$bookingId/components/search-service/SearchService";
import Section from "../Section";

const ServiceInfo = () => {
  const { state } = useContext(AddBookingContext);

  if (!state.addBookingState.activeBooking?.client) {
    return null;
  }
  return (
    <Section>
      <div className="flex justify-center flex-wrap gap-2 pb-3">
        <SearchService className="text-xs h-5 px-2" />
      </div>

      <div className="px-2">
        {state.addBookingState.activeBooking?.services?.map((service) => {
          return (
            <DetailRow key={service.id} label="Service" value={service.name} />
          );
        })}
      </div>
    </Section>
  );
};

export default ServiceInfo;
