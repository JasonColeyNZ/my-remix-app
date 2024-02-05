import { useLoaderData } from "@remix-run/react";
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import { daysOfWeek } from "~/utils/scheduler/utils.ts";

import type { loader } from "../route.tsx";
import HourDay from "./HourDay.tsx";

// interface LocationsHoursProps {
//   hours: LocationHourItemType[];
// }

const LocationsHours = () => {
  const { dayNames, locationHours: hours } = useLoaderData<typeof loader>();
  const [days, setDays] = useState<ReactElement[]>([]);
  // console.log("dayNames ", dayNames);

  useEffect(() => {
    // console.log("hours ", hours);

    setDays([]);
    //console.log("hours ", hours);
    const getDayHours = (day: string) => {
      const dayHours = hours.find((hour) => hour.dayOfWeek === day);
      //console.log("dayHours ", dayHours);
      return dayHours;
    };

    const newDays = daysOfWeek.map((day, index) => {
      return (
        <HourDay
          key={day}
          dayName={dayNames[index]}
          dayId={day}
          hourData={getDayHours(day)}
        />
      );
    });
    //console.log("newDays ", newDays);
    setDays(newDays);
  }, [hours]);

  return <div>{days}</div>;
};

export default LocationsHours;
