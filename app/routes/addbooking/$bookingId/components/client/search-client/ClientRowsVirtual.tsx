import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import type { ClientsItemType, ClientsItemsType } from "~/models/client.server";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import type { action, loader } from "../../../route";
import { serialize } from "object-to-formdata";
import { addUpdateBookingIntent } from "../../../addUpdateBookingSchema";
import { Button } from "~/components/ui/button";

const ClientRowsVirtual = ({ clients }: { clients: ClientsItemsType }) => {
  const { booking } = useLoaderData<typeof loader>();
  const parentRef = useRef<HTMLDivElement | null>(null);
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate();

  const rowVirtualizer = useVirtualizer({
    count: clients.length,
    getScrollElement: () => parentRef.current || null,
    estimateSize: (i) => 30,
    overscan: 5,
  });

  const handleClientClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    client: ClientsItemType,
  ) => {
    (e.target as HTMLButtonElement).focus();
    // console.log("booking.id", booking.id);
    fetcher.submit(
      serialize({
        intent:
          booking.id === "new"
            ? addUpdateBookingIntent.ADDBOOKING
            : addUpdateBookingIntent.UPDATECLIENT,
        id: booking.id,
        clientId: client.id,
      }),
      {
        method: "POST",
      },
    );
  };

  useEffect(() => {
    if (fetcher.data?.status === 200 && booking.id === "new") {
      navigate(`/addbooking/${fetcher.data.data?.id}`);
    }
  }, [booking.id, fetcher, navigate]);

  return (
    <>
      <div
        ref={parentRef}
        className="absolute h-full flex w-full overflow-y-auto"
      >
        <div
          className="w-full"
          style={{
            height: `${clients.length * 45}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => (
            <div
              key={virtualRow.index}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `30px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div className="p-1">
                <Button
                  onClick={(e) =>
                    handleClientClick(e, clients[virtualRow.index])
                  }
                  className="flex h-7 shadow-none justify-normal font-normal w-full bg-gray-50 text-black select-none columns-2 cursor-pointer border-[1px] border-primary-2 rounded-md p-2 text-sm hover:bg-primary-6 focus:bg-primary focus:text-white focus-visible:bg-primary"
                >
                  <div className="flex-1 text-left">
                    {clients[virtualRow.index].firstName}
                  </div>
                  <div className="flex-1 text-left">
                    {clients[virtualRow.index].lastName}
                  </div>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ClientRowsVirtual;
