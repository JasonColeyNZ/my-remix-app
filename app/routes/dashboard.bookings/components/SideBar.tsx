// import * as mobiscroll from "@mobiscroll/react";
// import { useLoaderData, useSearchParams } from "@remix-run/react";
// import { ClientOnly } from "remix-utils/client-only";
import { Card, CardContent } from "~/components/ui/card.tsx";

// import type { loader } from "../route.tsx";
// import SchedulerDisplay from "./SchedulerDisplay.tsx";
import Team from "./Team.tsx";

// const { Datepicker } = pkg;

const SideBar = () => {
  // const { view, dateFrom, openDays } = useLoaderData<typeof loader>();
  // const [searchParams, setSearchParams] = useSearchParams();
  // console.log("openDays", openDays);

  // const getDefaultValue = () => {
  //   //useCallback(() => {
  //   // console.log("getDefaultValue", searchParams, view.schedule?.type);
  //   const from = searchParams.get("from");
  //   const to = searchParams.get("to");
  //   if (from && to) {
  //     return [new Date(from), new Date(to)];
  //   } else if (from) {
  //     return new Date(from);
  //   } else {
  //     return new Date();
  //   }
  // }; //, [searchParams]);

  return (
    <div className={"flex flex-col gap2 min-w-s xl:min-w-m"}>
      {/* <Grid
      item
      xs={12}
      md={4}
      lg={3}
      xl={2}
      sx={{ minWidth: "250px !important" }}
    > */}

      <Card>
        {/* <CardHeader className="flex flex-col items-center">
          <LocationAutoComplete />
        </CardHeader> */}
        <CardContent>
          {/* <SchedulerDisplay /> */}
          <></>
          {/* <mobiscroll.Datepicker
                 controls={["calendar"]}
                 valid={[
                   {
                    recurring: {
                      repeat: "weekly",
                      weekDays: openDays.join(","),
                    },
                  },
                ]}
                select={
                  view.schedule?.type === "week" ? "preset-range" : "date"
                }
                // value={getDefaultValue()}
                firstSelectDay={0}
                selectSize={view.schedule?.type === "week" ? 7 : 1}
                calendarType="month"
                pages={1}
                display="inline"
                touchUi={true}
                onChange={(event, inst) => {
                  if (Array.isArray(event.value) && event.value.length > 1) {
                    if (event.value[1] !== null)
                      setSearchParams((prev) => {
                        prev.set("from", event.value[0].toISOString());
                        prev.set("to", event.value[1].toISOString());
                        return prev;
                      });
                  } else {
                    setSearchParams((prev) => {
                      prev.set("from", event.value.toISOString());
                      prev.delete("to");
                      return prev;
                    });
                  }

                  console.log("onChange", event.value);
                  setSearchParams((prev) => {
                    prev.set("from", event.value[0].toISOString());
                    return prev;
                  });
                  setSearchParams({
                    from: event.value[0].toISOString(),
                    to: event.value[1].toISOString(),
                  });
                  console.log("onChange", event.value);
                }}
              > */}
        </CardContent>
        <CardContent>
          <Team />
        </CardContent>
      </Card>
    </div>
  );
};

export default SideBar;
