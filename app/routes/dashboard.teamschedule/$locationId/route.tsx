// import mobiScroll from "@mobiscroll/react/dist/css/mobiscroll.min.css";
// import type { MbscEventcalendarView } from "@mobiscroll/react/dist/src/core/components/eventcalendar/eventcalendar.types.ts";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { useState } from "react";
import { getClients } from "~/models/client.server.ts";
import { getAllLocationHours, getLocations } from "~/models/location.server.ts";
import { getLocationServices } from "~/models/services.server.ts";
// import { setLocationDefault } from "~/models/user.default.server.ts";
import { getUsers } from "~/models/user.server.ts";
import { getUser } from "~/utils/auth.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
// import {
//   getFirstDay,
//   getFirstStartTime,
//   getLastDay,
//   getLastEndTime,
// } from "~/utils/scheduler/utils.ts";
import { requireUserSession } from "~/utils/session.server.ts";

import Header from "./components/Header.tsx";
import SchedulerView from "./components/SchedulerView.tsx";
import SectionPage from "~/layouts/page-layouts/SectionPage.tsx";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: mobiScroll }];
// };

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser, response } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const user = await getUser(request, sbUser);
  if (!user) return null;

  let formData = await request.formData();
  switch (formData.get("intent")) {
    case "location-select": {
      // const result = await withZod(selectLocationValidation).validate(formData);
      // if (result.error) {
      //   console.log("result.error: ", result.error);
      //   return json({
      //     error: validationError(result.error),
      //     formId: "location-form",
      //   });
      // }
      // if (result.data.locationId)
      //   setLocationDefault(user.id, result.data.locationId, sbUser);
    }
  }

  return json({ result: "success" }, { headers: response.headers });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("MembersSchedule loader");
  const { user: sbUser, response } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");
  const locationIdParam = params.locationId;
  invariantResponse(locationIdParam, "LocationId should be defined");

  const [user, locations] = await Promise.all([
    getUser(request, sbUser),
    getLocations(sbUser),
  ]);

  //get services
  const [services, users, clients, allLocationHours] = await Promise.all([
    getLocationServices(locationIdParam, sbUser),
    getUsers(sbUser),
    getClients(sbUser),
    getAllLocationHours(locationIdParam, sbUser),
  ]);

  const selectedUsers = users.map((user) => {
    //console.log("user ", user);
    return {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      img: (user.avatarData.publicUrl && user.avatarData.publicUrl) || null,
      color: "rgba(191, 191, 191, 0.15)",
      description: "",
      eventOverlap: false,
    };
  });

  // const view: MbscEventcalendarView = {
  //   schedule: {
  //     type: "week",
  //     currentTimeIndicator: false,
  //     allDay: false,
  //     startDay: getFirstDay(allLocationHours.locationHours),
  //     endDay: getLastDay(allLocationHours.locationHours),
  //     startTime: getFirstStartTime(allLocationHours.locationHours),
  //     endTime: getLastEndTime(allLocationHours.locationHours),
  //   },
  // };

  return json(
    {
      user,
      locations,
      locationClosedHours: allLocationHours.closedHours,
      selectedLocationId: locationIdParam,
      services,
      selectedUsers,
      // view,
      clients,
    },
    { headers: response.headers },
  );
}

const MembersSchedule = () => {
  const { selectedUsers } = useLoaderData<typeof loader>();
  const [myMembers, setMyMembers] = useState(selectedUsers);
  console.log("Render: MembersSchedule");
  //  const { locationHours, users } = useLoaderData<typeof loader>();
  //console.log("users ", users);
  // const { dispatch } = useContext(AppContext);

  // useEffect(() => {
  //   //console.log("MembersSchedule useEffect.setPageHeaderObject");
  //   dispatch({
  //     type: NavigationTypes.setPageHeaderObject,
  //     payload: {
  //       object: <Header />,
  //     },
  //   });
  // }, [dispatch]);

  return (
    <>
      {/* <PageHeader breadCrumbOnly={true} /> */}
      <SectionPage hideUI={false} breadcrumbOnly={true}>
        <Header myMembers={myMembers} setMyMembers={setMyMembers} />

        <SchedulerView />
      </SectionPage>
    </>
  );
};
export default MembersSchedule;
