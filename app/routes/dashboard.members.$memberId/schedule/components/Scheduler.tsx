// import { TrashIcon } from "@radix-ui/react-icons";
// import type {
//   MbscCalendarEventData,
//   MbscEventClickEvent,
//   MbscEventCreateEvent,
//   MbscEventCreateFailedEvent,
//   MbscEventDeleteEvent,
//   MbscEventUpdateFailedEvent,
//   MbscEventUpdatedEvent, // MbscEventcalendarView,
// } from "@mobiscroll/react";
// import pkg from "@mobiscroll/react";
// import { useFetcher, useLoaderData } from "@remix-run/react";
// import { serialize } from "object-to-formdata";
// import { useCallback, useState } from "react";
// import { useLocales } from "remix-utils/locales/react";
// import { invariantResponse } from "~/utils/misc.tsx";

// import type { loader } from "../route.tsx";

// const { Eventcalendar, Toast } = pkg;

// import type { LocationClosedHourItemType } from "~/models/location.server";
// import type { UserHourItemsType } from "~/models/user.server";

const Scheduler = () => {
  // const { locationClosedHours, memberId, locationId } =
  //   useLoaderData<typeof loader>();
  // const locales = useLocales();
  // const [isToastOpen, setToastOpen] = useState<boolean>(false);
  // const [toastText, setToastText] = useState<string>();
  // const fetcher = useFetcher();

  // console.log("userHours", userHours);

  // const closeToast = useCallback(() => {
  //   setToastOpen(false);
  // }, []);

  // const onEventClick = useCallback((event: MbscEventClickEvent) => {
  //   console.log("onEventClick", event);
  //   setToastText(event.event.title);
  //   setToastOpen(true);
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

  // const onEventCreate = useCallback(
  //   (args: MbscEventCreateEvent) => {
  //     if (args.originEvent && args.originEvent.recurring) {
  //       return false;
  //     }
  //     args.event.recurring = { repeat: "weekly" };
  //     //create event using fetcher
  //     console.log("onEventCreate", args.event);

  //     fetcher.submit(
  //       serialize({
  //         intent: "add-event",
  //         memberId,
  //         locationId,
  //         start:
  //           args.event.start && args.event.start instanceof Date
  //             ? args.event.start.getHours().toString().padStart(2, "0") +
  //               ":" +
  //               args.event.start.getMinutes().toString().padEnd(2, "0")
  //             : "",
  //         end:
  //           args.event.end && args.event.end instanceof Date
  //             ? args.event.end.getHours().toString().padStart(2, "0") +
  //               ":" +
  //               args.event.end.getMinutes().toString().padEnd(2, "0")
  //             : "",
  //         dayOfWeek:
  //           args.event.start && args.event.start instanceof Date
  //             ? args.event.start
  //                 .toLocaleDateString(locales, { weekday: "long" })
  //                 .substring(0, 2)
  //                 .toUpperCase()
  //             : "",
  //       }),
  //       {
  //         method: "post",
  //       },
  //     );
  //   },
  //   [fetcher, locationId, memberId],
  // );

  // const onEventUpdated = useCallback(
  //   (args: MbscEventUpdatedEvent) => {
  //     //create event using fetcher
  //     console.log("onEventUpdated", args);
  //     fetcher.submit(
  //       serialize({
  //         intent: "update-event",
  //         id: args.event.id,
  //         start: args.event.start,
  //         end: args.event.end,
  //         dayOfWeek:
  //           args.event.recurring && typeof args.event.recurring === "object"
  //             ? args.event.recurring.weekDays
  //             : "",
  //       }),
  //       {
  //         method: "post",
  //       },
  //     );
  //   },
  //   [fetcher],
  // );

  // const renderScheduleEvent = useCallback<(data: MbscCalendarEventData) => any>(
  //   (data) => {
  //     const handleDeleteEvent = (event: React.MouseEvent<HTMLElement>) => {
  //       event.preventDefault();
  //       event.stopPropagation();
  //       //console.log("handleDeleteEvent", event);
  //       fetcher.submit(serialize({ id: data.id, intent: "delete-event" }), {
  //         method: "post",
  //       });
  //     };
  //     if (data.allDay) {
  //       return <div className="md-custom-event-allday-title">{data.title}</div>;
  //     } else {
  //       return (
  //         <div
  //           sx={{
  //             display: "flex",
  //             background: "#26c57d",
  //             color: "white",
  //           }}
  //           className="mbsc-schedule-event-background mbsc-material mbsc-schedule-event mbsc-material mbsc-ltr mbsc-schedule-event-start mbsc-schedule-event-end"
  //         >
  //           <div
  //             sx={{ display: "flex", flexDirection: "column", flex: "1 1 0" }}
  //           >
  //             <div
  //               sx={{ display: "flex", flexDirection: "column", flex: "1 1 0" }}
  //               className="mbsc-schedule-event-inner mbsc-material"
  //             >
  //               <div className="mbsc-schedule-event-title mbsc-material">
  //                 {data.title}
  //               </div>
  //               <div className="mbsc-schedule-event-range mbsc-material">
  //                 {data.start} - {data.end}
  //               </div>
  //             </div>
  //           </div>
  //           <div
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
  //               icon={<DeleteIcon.default />}
  //               onClick={handleDeleteEvent}
  //             />
  //           </div>
  //         </div>
  //       );
  //     }
  //   },
  //   [fetcher],
  // );

  return (
    <div className="flex-1">
      {/* <Eventcalendar
        theme="material"
        themeVariant="light"
        clickToCreate={true}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        dragTo
        eventDelete={true}
        groupBy="date"
        //colors={colors}
        data={userHours}
        view={view}
        onEventClick={onEventClick}
        onEventCreate={onEventCreate}
        onEventDelete={onEventDelete}
        onEventUpdated={onEventUpdated}
        onEventCreateFailed={onEventCreateFailed}
        onEventUpdateFailed={onEventUpdateFailed}
        invalid={locationClosedHours}
        renderScheduleEvent={renderScheduleEvent}
        renderDay={renderDay}
        showControls={false}
        extendDefaultEvent={extendDefaultEvent}
        returnFormat="jsdate"
      />

      <Toast
        theme="ios"
        themeVariant="light"
        message={toastText}
        isOpen={isToastOpen}
        onClose={closeToast}
      /> */}
    </div>
  );
};

export default Scheduler;
