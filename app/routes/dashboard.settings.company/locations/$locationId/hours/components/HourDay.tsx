// import * as mobiscroll from "@mobiscroll/react";
import { useFetcher } from "@remix-run/react";
import { serialize } from "object-to-formdata";
import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md/index.js";
import type { LocationHourItemType } from "~/models/location.server.ts";

import { LocationHourFormIntent } from "../locationHoursSchema.ts";
import type { action } from "../route.tsx";

interface HourDayProps {
  dayName: string;
  dayId: string;
  hourData: LocationHourItemType | undefined;
}

const HourDay = ({ dayName, dayId, hourData }: HourDayProps) => {
  const hourFetcher = useFetcher<typeof action>();
  const [data, setData] = useState<LocationHourItemType | undefined>(hourData);
  // const [start, startRef] = useState<mobiscroll.Input | null>(null);
  // const [end, endRef] = useState<mobiscroll.Input | null>(null);
  // const refDatePicker = useRef<mobiscroll.Datepicker | null>(null);

  useEffect(() => {
    setData(hourData);
  }, [hourData]);

  const onHourChange = (event: any) => {
    if (event.value.length !== 2 || !event.value[0] || !event.value[1]) return;

    // console.log("onHourChange ", refDatePicker?.current);
    hourFetcher.submit(
      serialize({
        intent: data?.id
          ? LocationHourFormIntent.UPDATE
          : LocationHourFormIntent.ADD,
        id: data?.id || null,
        dayOfWeek: dayId,
        start: event.value[0],
        end: event.value[1],
      }),
      {
        method: "post",
      },
    );
  };

  const onHourDelete = (id: string) => {
    // console.log("onHourDelete ", id);
    hourFetcher.submit(
      serialize({
        intent: LocationHourFormIntent.DELETE,
        id,
      }),
      {
        method: "post",
      },
    );
  };

  // useEffect(() => {
  //   if (!hourFetcher.data || !refDatePicker || !refDatePicker.current) return;
  //   console.log("actionData ", hourFetcher.data);
  //   switch (hourFetcher.data.submission.intent) {
  //     // case LocationHourFormIntent.ADD:
  //     //   if (hourFetcher.data) {
  //     //     console.log("hourFetcher.data ", hourFetcher.data);
  //     //     setData(hourFetcher.data as LocationHourItemType);
  //     //   }
  //     //   break;
  //     // case LocationHourFormIntent.UPDATE:
  //     //   if (hourFetcher.data) {
  //     //     console.log("hourFetcher.data ", hourFetcher.data);
  //     //     setData(hourFetcher.data as LocationHourItemType);
  //     //   }
  //     //   break;
  //     case LocationHourFormIntent.DELETE:
  //       if (hourFetcher.data) {
  //         if (!data) return;
  //         const newData = { ...data };
  //         newData.id = "new";
  //         setData(newData);
  //         refDatePicker.current.setVal([]);
  //       }
  //       break;
  //   }
  // }, [hourFetcher.data]);

  const getValue = useCallback(() => {
    if (data) {
      // console.log("hourData ", hourData);
      return [data.start, data.end];
    }
  }, [data]);

  return (
    <div className="flex flex-row">
      <div className="flex w-[200px]">
        {dayName}
        {/* {data?.start} - {data?.end} */}
      </div>
      {/* <mobiscroll.Datepicker
        ref={refDatePicker}
        controls={["timegrid"]}
        select="range"
        stepMinute={15}
        theme="material"
        value={getValue()}
        startInput={start}
        endInput={end}
        returnFormat="iso8601"
        onChange={onHourChange}
      />
      <mobiscroll.Input
        ref={startRef}
        theme="material"
        label="Start"
        inputStyle="outline"
        placeholder="Please Select..."
        labelStyle="stacked"
        inputClass="mobiscroll-input-override"
      ></mobiscroll.Input>
      <mobiscroll.Input
        theme="material"
        ref={endRef}
        label="End"
        inputStyle="outline"
        placeholder="Please Select..."
        labelStyle="stacked"
        inputClass="mobiscroll-input-override"
      ></mobiscroll.Input> */}
      {/* <IconButton
        aria-label="delete"
        onClick={() => data && onHourDelete(data.id)}
        color="error"
      >
        <MdOutlineClose />
      </IconButton> */}
    </div>
  );
};

export default HourDay;
