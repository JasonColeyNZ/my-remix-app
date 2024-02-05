import {
  MdOutlineDeleteOutline,
  MdOutlineAddCircle,
} from "react-icons/md/index.js";
import { Form, NavLink, useLocation, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { useLocations } from "~/utils/routeData/useLocations.ts";
import { cn } from "~/utils/shadcn.utils";
import { RoomAndLocationIntent } from "../RoomAndLocationSchema";
import AccordionList from "~/components/accordion-list/AccordionList";
import IconButton from "~/components/icon-button/IconButton";

const LocationsList = () => {
  const { locationId } = useParams();
  const [selectedLocationId, setSelectedLocationId] = useState<string[]>(
    locationId ? [locationId] : [],
  );
  const locations = useLocations();
  const location = useLocation();

  useEffect(() => {
    if (!locationId) return;
    setSelectedLocationId([locationId]);
  }, [location.pathname, locationId]);

  return (
    <>
      <AccordionList
        selectedId={selectedLocationId}
        setSelectedId={setSelectedLocationId}
      >
        {locations &&
          locations.map((location) => (
            <div key={location.id}>
              <AccordionItem value={location.id} className="select-none">
                <AccordionTrigger className=" px-2 py-2">
                  {location.name}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col flex-1 w-full pb-0">
                  <NavLink
                    className=""
                    to={`${location.id}/details`}
                    end
                    replace={true}
                  >
                    {({ isActive }) => (
                      <div
                        className={cn(
                          "flex items-center p-2 pl-6 hover:bg-primary-6 cursor-pointer",
                          isActive ? "bg-primary-4" : "bg-white",
                        )}
                      >
                        Details
                      </div>
                    )}
                  </NavLink>
                  <NavLink
                    className=""
                    to={`${location.id}/hours`}
                    end
                    replace={true}
                  >
                    {({ isActive }) => (
                      <div
                        className={cn(
                          "flex items-center p-2 pl-6 hover:bg-primary-6 cursor-pointer",
                          isActive ? "bg-primary-4" : "bg-white",
                        )}
                      >
                        Hours
                      </div>
                    )}
                  </NavLink>
                  <div className="flex flex-row items-center font-medium text-primary-9 p-2 pl-6">
                    <div className="flex-1">Rooms</div>
                    <Form method="post">
                      <input type="hidden" name="intent" value="room-add" />
                      <input
                        type="hidden"
                        name="locationId"
                        value={location.id}
                      />
                      <IconButton
                        size="small"
                        icon={<MdOutlineAddCircle />}
                        url={null}
                        title="Add Room"
                      />
                    </Form>
                  </div>
                  {location.rooms &&
                    location.rooms.map((room, index) => (
                      <NavLink
                        className="text-sm font-normal text-slate-600"
                        key={room.id}
                        to={`${location.id}/rooms/${room.id}`}
                        end
                        replace={true}
                      >
                        {({ isActive }) => (
                          <div
                            className={cn(
                              "flex items-center p-2 pl-10 hover:bg-primary-6 cursor-pointer",
                              isActive ? "bg-primary-4" : "bg-white",
                            )}
                          >
                            <div className="flex-1">{room.name}</div>
                            {index > 0 && (
                              <Form method="post">
                                <input
                                  type="hidden"
                                  name="intent"
                                  value={RoomAndLocationIntent.DELETEROOM}
                                />
                                <input
                                  type="hidden"
                                  name="id"
                                  value={room.id}
                                />
                                <IconButton
                                  size="small"
                                  icon={<MdOutlineDeleteOutline />}
                                  url={null}
                                  title="Delete Room"
                                />
                              </Form>
                            )}
                          </div>
                        )}
                      </NavLink>
                    ))}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
      </AccordionList>
    </>
  );
};
export default LocationsList;
