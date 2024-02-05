import DetailRow from "~/components/data-rows/DetailRow";
import { Button } from "~/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Section from "../Section";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "../../route";
import SearchClient from "./search-client/SearchClient";

const ClientInfo = () => {
  const { booking } = useLoaderData<typeof loader>();
  // const handleEditContactClick = () => {
  //   setShowEditor(!showEditor);
  // };

  return (
    <Section header="Selected Client">
      {!booking.client ||
        (booking.services.length === 0 && (
          <div className="flex justify-center flex-wrap gap-2 pb-3">
            <SearchClient
              clientId={booking.client?.id}
              className="text-xs h-5 px-2"
            />
          </div>
        ))}

      <div className="px-2">
        {booking.client && (
          <div className="flex items-center">
            <DetailRow
              label="Client"
              value={`${booking.client.firstName} ${booking.client.lastName}`}
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
