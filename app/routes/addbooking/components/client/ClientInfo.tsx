import { useContext } from "react";
import SearchClient from "~/routes/addbooking/$bookingId/components/client/search-client/SearchClient";
import DetailRow from "~/components/data-rows/DetailRow";
import { AddBookingContext } from "../../store/addBookingContext";
import { Button } from "~/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Section from "../Section";

const ClientInfo = () => {
  const { state } = useContext(AddBookingContext);

  // const handleEditContactClick = () => {
  //   setShowEditor(!showEditor);
  // };

  return (
    <Section header="Selected Client">
      <div className="flex justify-center flex-wrap gap-2 pb-3">
        <SearchClient
          clientId={state.addBookingState.activeBooking?.client?.id}
          className="text-xs h-5 px-2"
        />
      </div>

      <div className="px-2">
        {state.addBookingState.activeBooking?.client && (
          <div className="flex items-center">
            <DetailRow
              label="Client"
              value={`${state.addBookingState.activeBooking.client.firstName} ${state.addBookingState.activeBooking.client.lastName}`}
            />
            <Button
              className="p-1 ml-auto w-[25px] h-6 border-[1px] rounded-md border-gray-200 hover:bg-primary-6 hover:border-primary"
              variant="ghost"
              size="sm"
              // onClick={handleEditContactClick}
            >
              <Pencil1Icon />
            </Button>
          </div>
        )}
      </div>
    </Section>
  );
};

export default ClientInfo;
