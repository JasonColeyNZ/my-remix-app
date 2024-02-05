// import { useFetcher } from "@remix-run/react";
// import { useState } from "react";
// import type { LocationHourItemType } from "~/models/location.server";
// import { daysOfWeek } from "~/utils/scheduler/utils";

// interface cellData {
//   startDate: Date;
//   endDate: Date;
//   groups: any;
//   allDay: boolean;
//   groupIndex: number;
// }

// export const useSelectedCellData = (
//   locationId: string,
//   hours: LocationHourItemType[]
// ) => {
//   const locationHourFetcher = useFetcher();
//   const [selectedCellData, setSelectedCellData] = useState<cellData[] | null>(
//     null
//   );

//   const addHours = (operation: string) => {
//     // if (!schedulerRef.current) return;
//     // const scheduler = schedulerRef.current.instance as dxScheduler;

//     //selectedCellData is an array of cellData objects in a group
//     if (!selectedCellData) return;
//     //make an array of days and their hours from the selectedCellData
//     const newDays: { dayOfWeek: string; start: number; to: number }[] = [];
//     selectedCellData.forEach((cellData) => {
//       const dayOfWeek = daysOfWeek[cellData.startDate.getDay()];
//       //get day from days array
//       const day = newDays.find((d) => d.dayOfWeek === dayOfWeek);
//       //if day is not in days array, add it
//       //console.log("cellData: ", cellData);
//       if (!day) {
//         newDays.push({
//           dayOfWeek: dayOfWeek,
//           start:
//             cellData.startDate.getHours() +
//             cellData.startDate.getMinutes() / 60,
//           to: cellData.endDate.getHours() + cellData.endDate.getMinutes() / 60,
//         });
//       } else {
//         //if day is in days array, add the hours to the day
//         day.to =
//           cellData.endDate.getHours() + cellData.endDate.getMinutes() / 60;
//       }
//     });
//     //console.log(days);

//     //go through hours array and add check for each day
//     let newHours = [...hours];
//     newDays.forEach((newDay) => {
//       const daySpans = newHours.filter((h) => h.dayOfWeek === newDay.dayOfWeek);
//       if (daySpans.length === 0) {
//         //add a new day
//         if (operation !== "addOpen") return true;
//         newHours.push({
//           id: "",
//           dayOfWeek: newDay.dayOfWeek,
//           start: newDay.from,
//           to: newDay.to,
//           include: true,
//         });
//       } else {
//         //update an existing day or create a new day span
//         //const hour = newHours[daySpans];
//         if (operation === "addOpen") {
//           //console.log("addOpen");
//           //console.log("hour: ", hour);
//           //console.log("day: ", day);

//           //Find if we need to create a new span in same day
//           const existingSpan = daySpans.find(
//             (span) =>
//               (newDay.from >= span.from && newDay.from <= span.to) ||
//               (newDay.to >= span.from && newDay.to <= span.to)
//           );
//           //console.log("span: ", existingSpan);
//           if (!existingSpan) {
//             newHours.push({
//               id: "",
//               dayOfWeek: newDay.dayOfWeek,
//               from: newDay.from,
//               to: newDay.to,
//               include: true,
//             });
//           } else {
//             //extend an existing span
//             if (existingSpan.from > newDay.from)
//               existingSpan.from = newDay.from;
//             if (existingSpan.to < newDay.to) existingSpan.to = newDay.to;
//           }
//         } else {
//           //remove time from day
//           //console.log("addClosed");
//           //console.log("hour: ", hour);
//           //console.log("newDay: ", newDay);

//           const overlapHour = {
//             ...newHours.find(
//               (h) =>
//                 h.dayOfWeek === newDay.dayOfWeek &&
//                 ((newDay.from <= h.from && newDay.to >= h.from) ||
//                   (newDay.from <= h.to && newDay.to >= h.to) ||
//                   (newDay.from >= h.from && newDay.to <= h.to))
//             ),
//           } as LocationHourItemType;
//           newHours = [
//             ...newHours.filter(
//               (h) =>
//                 !(
//                   h.dayOfWeek === newDay.dayOfWeek &&
//                   ((newDay.from <= h.from && newDay.to >= h.from) ||
//                     (newDay.from <= h.to && newDay.to >= h.to) ||
//                     (newDay.from >= h.from && newDay.to <= h.to))
//                 )
//             ),
//           ];

//           if (overlapHour) {
//             //console.log("overlapHour: ", overlapHour);
//             if (
//               newDay.from >= overlapHour.from &&
//               newDay.to <= overlapHour.to
//             ) {
//               //we need to make another span maybe depending on start and finish
//               //console.log("newDay is inside overlapHour");
//               if (newDay.from === overlapHour.from) {
//                 //console.log("newDay.from === overlapHour[0].from");
//                 overlapHour.from = newDay.to;
//               } else if (newDay.to === overlapHour.to) {
//                 //console.log("newDay.to === overlapHour[0].to");
//                 overlapHour.to = newDay.from;
//               } else {
//                 //console.log("newDay is inside overlapHour");
//                 newHours.push({
//                   id: "",
//                   dayOfWeek: newDay.dayOfWeek,
//                   from: newDay.to,
//                   to: overlapHour.to,
//                   include: true,
//                 });
//                 overlapHour.to = newDay.from;
//               }
//             } else {
//               if (parseInt(overlapHour.start) < newDay.start) overlapHour.end = newDay.start;
//               else overlapHour.from = newDay.to;
//             }
//             newHours.push(overlapHour);
//           }
//         }
//         //   const hour = hours[index];
//         //   hour.from = day.start;
//         //   hour.to = day.to;
//         //   hour.include = operation === "addOpen";
//       }
//     });
//     //console.log("newHours: ", newHours);

//     //merge adjacent spans
//     let newArray = newHours.map((hour) => {
//       const daySpans = newHours.filter(
//         (h) => h.dayOfWeek === hour.dayOfWeek && h !== hour
//       );
//       if (daySpans.length === 0) return hour;

//       const adjacentSpan = daySpans.find(
//         (span) =>
//           (span.start >= hour.start && span.start <= hour.end) ||
//           (span.end >= hour.start && span.end <= hour.end)
//       );

//       if (adjacentSpan) {
//         //console.log("adjacentSpan: ", adjacentSpan);
//         if (adjacentSpan.start < hour.start) hour.start = adjacentSpan.start;
//         if (adjacentSpan.end > hour.end) hour.end = adjacentSpan.end;
//         newHours = [
//           ...newHours.filter(
//             (h) => h.dayOfWeek !== hour.dayOfWeek || h !== adjacentSpan
//           ),
//         ];
//         if (hour.start !== adjacentSpan.start || hour.end !== adjacentSpan.end)
//           return hour;
//         else return { ...hour, dayOfWeek: "" };
//       } else return hour;
//     });

//     //filter out nulls

//     newArray = newArray.filter((hour) => hour.dayOfWeek !== "");
//     //console.log("newArray: ", newArray);
//     const data = { locationId, hours: JSON.stringify(newArray) };
//     locationHourFetcher.submit(data, {
//       method: "post",
//       action: `/dashboard/settings/company/locations/${locationId}/hours`,
//     });

//     return null;
//   };
//   return { addHours, selectedCellData, setSelectedCellData };
// };
