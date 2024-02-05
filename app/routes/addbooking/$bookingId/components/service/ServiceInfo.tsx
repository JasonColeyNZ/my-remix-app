import DetailRow from "~/components/data-rows/DetailRow";
import SearchService from "~/routes/addbooking/$bookingId/components/search-service/SearchService";
import Section from "../Section";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "../../route";

const ServiceInfo = () => {
  const { booking } = useLoaderData<typeof loader>();

  if (!booking.client) {
    return null;
  }
  return (
    <Section header="Selected Services">
      <div className="flex justify-center flex-wrap gap-2 pb-3">
        <SearchService className="text-xs h-5 px-2" />
      </div>

      <div className="flex flex-col gap-2">
        {booking.services?.map((service) => {
          return (
            <div
              key={service.id}
              className="flex py-1 px-2 font-semibold rounded-md border-[1px] border-gray-500 bg-gray-100"
            >
              <div className="text-xs text-gray-600">{service.name}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default ServiceInfo;
