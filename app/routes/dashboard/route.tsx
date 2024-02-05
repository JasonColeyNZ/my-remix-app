import type { ShouldRevalidateFunction } from "@remix-run/react";
import { Outlet, useNavigation } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { ClipLoader } from "react-spinners";
import { useSpinDelay } from "spin-delay";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "~/components/ui/dialog.tsx";
import { getLocations } from "~/models/location.server.ts";
import { setLocationDefault } from "~/models/user.default.server.ts";
import { AppProvider } from "~/store/appContext.tsx";
import { safeRedirect } from "~/utils.server.ts";
import { createUserSession, getUser } from "~/utils/auth.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { UserOnboarding } from "~/utils/types.ts";

import Header from "./components/header/AppHeader.tsx";
import { findSubmenu } from "./components/header/find-submenu.ts";
import { locationSchema } from "./components/header/locationSchema.ts";
import appInfo from "~/app-info.tsx";
import { parseWithZod } from "@conform-to/zod";

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Dashboard" }];
};

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: locationSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case "change-location": {
      // console.log("change-location");
      await setLocationDefault(sbUser.id, submission.value.locationId, sbUser);
    }
  }

  return json({ status: "ok" });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  // console.log("dashboard loader");
  const {
    user: sbUser,
    response,
    supabase,
  } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const [user, locations] = await Promise.all([
    getUser(request, sbUser, supabase),
    getLocations(sbUser),
  ]);
  // console.log("dashboard loader3");

  // console.log("user", user);
  // console.log("locations", locations);
  if (user.onboardingStatus !== UserOnboarding.COMPLETED) {
    const redirectTo = safeRedirect("/completesignup");

    return createUserSession({
      redirectTo,
      response,
    });
  }

  // console.log("params", params);

  // const lookupLocations = locations.map((location) => {
  //   return {
  //     value: location.id,
  //     text: location.name,
  //   };
  // });

  let locationId = user && user.defaults && user.defaults.locationId;

  //if the user doesn't have a location selected
  //we need to select one here and save it to user defaults
  locationId =
    locations.find((l) => l.id === locationId)?.id || locations[0].id;

  const path = new URL(request.url).pathname;
  // console.log("path", path);
  const { clientId, memberId, serviceId } = params;
  const { subMenu, subSubMenu } = findSubmenu(
    path,
    clientId,
    memberId,
    serviceId,
  );

  const location = locations.find((loc) => loc.id === locationId);
  const selectedLocation = location ? location.name : "";

  return json(
    {
      status: "ok",
      user,
      locationId,
      locations,
      selectedLocation,
      subMenu,
      subSubMenu,
    },
    {
      headers: response.headers,
    },
  );
}

export default function Dashboard() {
  const navigation = useNavigation();
  const isLoading = useSpinDelay(
    navigation.state === "loading" || navigation.state === "submitting",
    {
      delay: 900,
      minDuration: 400,
    },
  );

  return (
    <>
      <AppProvider>
        <div
          id="dashboard"
          className="flex flex-col w-full bg-background flex-1 min-h-[calc(100dvh)]"
        >
          <Header />
          <div className="flex flex-col h-full w-full mx-auto">
            <Outlet />
          </div>
          {isLoading && (
            <>
              <Dialog open={true}>
                <DialogPortal>
                  <DialogOverlay className="flex items-center bg-primary-1/60 backdrop-blur-none">
                    <div className="mx-auto my-auto h-20 w-20">
                      <ClipLoader
                        // className="text-primary-9"
                        color={"purple"}
                        loading={true}
                        size={150}
                        speedMultiplier={0.8}
                      />
                    </div>
                  </DialogOverlay>
                </DialogPortal>
              </Dialog>
            </>
          )}
        </div>
      </AppProvider>
    </>
  );
}
