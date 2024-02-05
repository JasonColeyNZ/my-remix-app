// import type {
//   MbscCalendarEventData,
//   MbscEventClickEvent,
//   MbscEventCreateEvent,
//   MbscEventCreateFailedEvent,
//   MbscEventDeleteEvent,
//   MbscEventUpdateFailedEvent,
//   MbscEventUpdatedEvent,
//   MbscResource,
// } from "@mobiscroll/react";
// import * as mobiscroll from "@mobiscroll/react";
// import { TrashIcon } from "@radix-ui/react-icons";
// import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
// import { serialize } from "object-to-formdata";
// import { useCallback, useState } from "react";
import { ClientOnly } from "remix-utils/client-only";
// import { useLocales } from "remix-utils/locales/react";
// import { Avatar, AvatarImage } from "~/components/ui/avatar.tsx";
import { Card } from "~/components/ui/card.tsx";

// import type { loader } from "../route.tsx";

// import type { LocationClosedHourItemType } from "~/models/location.server";
// import type { UserHourItemsType } from "~/models/user.server";

const Scheduler = () => {
  // const {
  //   // view,
  //   selectedUsers,
  //   locationClosedHours,
  //   // bookings,
  //   dateFrom,
  //   // dateTo,
  // } = useLoaderData<typeof loader>();
  // const locales = useLocales();
  // const [isToastOpen, setToastOpen] = useState<boolean>(false);
  // const [toastText, setToastText] = useState<string>();
  // const fetcher = useFetcher();
  // const navigate = useNavigate();
  // console.log("Scheduler", bookings);
  //console.log("userHours", userHours);

  // const closeToast = useCallback(() => {
  //   setToastOpen(false);
  // }, []);

  // const onEventClick = useCallback((event: MbscEventClickEvent) => {
  //   // navigate(event.event.id);
  //   // console.log("onEventClick", event);
  //   // setToastText(event.event.title);
  //   // setToastOpen(true);
  // }, []);

  // const onEventDelete = useCallback((event: MbscEventDeleteEvent) => {
  //   setToastText(event.event.title + " deleted");
  //   setToastOpen(true);
  // }, []);

  // const onEventCreateFailed = useCallback(
  //   (event: MbscEventCreateFailedEvent) => {
  //     if (event.overlap) {
  //       setToastText("Available hours cannot overlap, please try again");
  //       setToastOpen(true);
  //     } else if (event.invalid) {
  //       setToastText("Member hours must fall within open hours");
  //       setToastOpen(true);
  //     }
  //   },
  //   [],
  // );

  // const onEventUpdateFailed = useCallback(
  //   (event: MbscEventUpdateFailedEvent) => {
  //     console.log("onEventUpdateFailed", event);
  //     if (event.overlap) {
  //       setToastText("Available hours cannot overlap, please try again");
  //       setToastOpen(true);
  //       // return false;
  //     } else if (event.invalid) {
  //       setToastText("Member hours must fall within open hours");
  //       setToastOpen(true);
  //       // return false;
  //     }
  //   },
  //   [],
  // );

  // const extendDefaultEvent = (event: any) => {
  //   return {
  //     ...event,
  //     color: "#26c57d",
  //     textColor: "#fff",
  //     title: "Available",
  //     //recurring: { repeat: "weekly" },
  //   };
  // };

  // const colors: MbscCalendarColor[] = [
  //   {
  //     background: "red",
  //     recurring: {
  //       repeat: "weekly",
  //       weekDays: "SU, MO, TU, WE, TH, FR, SA",
  //     },
  //   },
  // ];

  // [
  //   { date: new Date(2020, 2, 23), background: "pink" },
  //   { date: new Date(2020, 2, 24), background: "green" },
  //   { background: "#ff0000", recurring: { repeat: "weekly", weekDays: "SU" } },
  //   { background: "yellow", recurring: { repeat: "weekly", weekDays: "SA" } },
  // ];

  // const renderDay = (day: any) => {
  //   return (
  //     <div className="day-template-content">
  //       <div className="day-template-date">
  //         {day.date.toLocaleDateString(locales, { weekday: "short" })}
  //       </div>
  //     </div>
  //   );
  // };

  // const onEventCreate = useCallback((args: MbscEventCreateEvent) => {
  //   // if (args.originEvent && args.originEvent.recurring) {
  //   //   return false;
  //   // }
  //   // args.event.recurring = { repeat: "weekly" };
  //   // //create event using fetcher
  //   // console.log("onEventCreate", args.event);
  //   // // args.event.memberId = memberId;
  //   // args.event.locationId = locationId;
  //   // args.event.intent = "add-event";
  //   // fetcher.submit(serialize(args.event), {
  //   //   method: "post",
  //   // });
  // }, []);

  // const onEventUpdated = useCallback((args: MbscEventUpdatedEvent) => {
  //   // if (args.originEvent && args.originEvent.recurring) {
  //   //   return false;
  //   // }
  //   //args.event.recurring = { repeat: "weekly" };
  //   //create event using fetcher
  //   console.log("onEventUpdated", args);
  //   // args.event.dayOfWeek =
  //   //   args.event.recurring && typeof args.event.recurring === "object"
  //   //     ? args.event.recurring.weekDays
  //   //     : "";
  //   // //args.newEvent.id = args.event.id;
  //   // args.event.intent = "update-event";
  //   // fetcher.submit(serialize(args.event), {
  //   //   method: "post",
  //   // });
  // }, []);

  // const renderCustomResource = (resource: MbscResource) => {
  //   return (
  //     <div className="bg-white">
  //       <div className="text-md font-medium text-center p-[0.5em] flex flex-col items-center">
  //         {resource.img && (
  //           <Avatar>
  //             <AvatarImage alt="Avatar" src={resource.img} />
  //             {/* <AvatarFallback>{userInitials(user.name)}</AvatarFallback> */}
  //           </Avatar>
  //         )}
  //         {resource.name}
  //       </div>
  //     </div>
  //   );
  // };

  // const renderScheduleEvent = useCallback<(data: MbscCalendarEventData) => any>(
  //   (data) => {
  //     // const handleDeleteEvent = (event: React.MouseEvent<HTMLElement>) => {
  //     //   event.preventDefault();
  //     //   event.stopPropagation();
  //     //   //console.log("handleDeleteEvent", event);
  //     //   fetcher.submit(serialize({ id: data.id, intent: "delete-event" }), {
  //     //     method: "post",
  //     //   });
  //     // };
  //     if (data.allDay) {
  //       return <div className="md-custom-event-allday-title">{data.title}</div>;
  //     } else {
  //       return (
  //         <div
  //           // sx={{
  //           //   display: "flex",
  //           //   background: data.original?.color,
  //           //   color: "white",
  //           // }}
  //           className="flex text-white mbsc-schedule-event-background mbsc-material mbsc-schedule-event mbsc-material mbsc-ltr mbsc-schedule-event-start mbsc-schedule-event-end"
  //         >
  //           <div className="flex flex-col flex-1">
  //             <div className="flex flex-col flex-1 mbsc-schedule-event-inner mbsc-material">
  //               <div className="mbsc-schedule-event-title mbsc-material">
  //                 {data.title}
  //               </div>
  //               <div className="mbsc-schedule-event-range mbsc-material">
  //                 {data.start} - {data.end}
  //               </div>
  //             </div>
  //           </div>
  //           {/* <div
  //             sx={{
  //               position: "absolute",
  //               top: 0,
  //               right: 0,
  //               zIndex: 10,
  //             }}
  //           >
  //             <IconButton
  //               title="Delete"
  //               url={null}
  //               size="small"
  //               icon={<DeleteIcon />}
  //               onClick={handleDeleteEvent}
  //             />
  //           </div> */}
  //         </div>
  //       );
  //     }
  //   },
  //   [fetcher],
  // );

  return (
    <Card className="flex-1">
      <ClientOnly>
        {() => (
          <></>
          // <mobiscroll.Eventcalendar
          //   selectedDate={dateFrom ? new Date(dateFrom) : undefined}
          //   theme="material"
          //   themeVariant="light"
          //   clickToCreate={true}
          //   dragToCreate={true}
          //   dragToMove={true}
          //   dragToResize={true}
          //   // dragTo
          //   eventDelete={true}
          //   groupBy="date"
          //   //colors={colors}
          //   resources={selectedUsers}
          //   data={bookings}
          //   view={view}
          //   onEventClick={onEventClick}
          //   // onEventCreate={onEventCreate}
          //   onEventDelete={onEventDelete}
          //   // onEventUpdated={onEventUpdated}
          //   onEventCreateFailed={onEventCreateFailed}
          //   onEventUpdateFailed={onEventUpdateFailed}
          //   invalid={locationClosedHours}
          //   renderResource={renderCustomResource}
          //   renderScheduleEvent={renderScheduleEvent}
          //   // renderDay={renderDay}
          //   showControls={false}
          //   extendDefaultEvent={extendDefaultEvent}
          // />
        )}
      </ClientOnly>

      {/* <Toast
        theme="ios"
        themeVariant="light"
        message={toastText}
        isOpen={isToastOpen}
        onClose={closeToast}
      /> */}
    </Card>
  );
};

export default Scheduler;
