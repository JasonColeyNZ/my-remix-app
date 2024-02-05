import {
  type MetaFunction,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import {
  demoDataInstall,
  // entityModulePermissions,
  getEntity,
  updateEntity,
} from "~/models/entity.server.ts";
import {
  getLocationById,
  getLocations,
  updateLocation,
} from "~/models/location.server.ts";
import { addUpdateUser, getUserById } from "~/models/user.server.ts";
import { validateCSRF } from "~/utils/csrf.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { UserOnboarding } from "~/utils/types.ts";

import {
  CompleteSignupStepIntent,
  completeSignupSchema,
} from "./completeSignupSchema.ts";
import CompleteSignupForm from "./components/CompleteSignupForm.tsx";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { parseWithZod } from "@conform-to/zod";

export async function loader({ request }: LoaderFunctionArgs) {
  // const response = new Response();

  const { user: sbUser } = await requireUserSession(request, true);

  if (!sbUser) return redirect("/");

  // console.log("sbUser", sbUser.app_metadata);

  //get user from database
  const [user, entity, locations] = await Promise.all([
    getUserById(sbUser.id, sbUser),
    getEntity(sbUser),
    getLocations(sbUser),
  ]);
  // console.log("user", user);
  return json({
    onboardingStatus: user.onboardingStatus,
    user: {
      intent: CompleteSignupStepIntent.PERSONAL,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      homeNumber: user.homeNumber,
      workNumber: user.workNumber,
      mobileNumber: user.mobileNumber,
      dateOfBirth: user.dateOfBirth,
    },
    company: {
      intent: CompleteSignupStepIntent.COMPANY,
      company: entity.name,
      location: locations[0].name,
      //need this for the action
      locationId: locations[0].id,
    },
    demo: {
      intent: CompleteSignupStepIntent.DEMO,
      installDemo: entity.demoDataInstalled ? "on" : undefined,
    },
    legal: {
      intent: CompleteSignupStepIntent.LEGAL,
      agreeToTerms: false,
      agreeToPrivacy: false,
    },
  });
}

export async function action({ request }: ActionFunctionArgs) {
  console.log("action");
  const { user: sbUser } = await requireUserSession(request, true);
  invariantResponse(sbUser, "User not found");
  const formData = await request.formData();
  await validateCSRF(formData, request.headers);
  const submission = parseWithZod(formData, { schema: completeSignupSchema });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }
  switch (submission.value.intent) {
    case CompleteSignupStepIntent.PERSONAL: {
      //save user details and return next step
      const existingUser = await getUserById(sbUser.id, sbUser);

      const user = await addUpdateUser(
        {
          ...existingUser,
          ...submission.value,
          onboardingStatus: UserOnboarding.PERSONAL_COMPLETED,
        },
        sbUser,
        null,
      );

      invariantResponse(user, "User not updated");
      return json(submission.reply());
    }
    case CompleteSignupStepIntent.COMPANY: {
      //save company and location details and return next step
      const [existingUser, existingEntity, existingLocation] =
        await Promise.all([
          getUserById(sbUser.id, sbUser),
          getEntity(sbUser),
          getLocationById(submission.value.locationId, sbUser),
        ]);

      await updateEntity(
        {
          ...existingEntity,
          name: submission.value.company,
        },
        sbUser,
      );
      await updateLocation(
        {
          ...existingLocation,
          name: submission.value.location,
          address: undefined,
        },
        sbUser,
      );

      await addUpdateUser(
        {
          ...existingUser,
          onboardingStatus: UserOnboarding.COMPANY_COMPLETED,
        },
        sbUser,
        null,
      );
      return json(submission.reply());
    }
    case CompleteSignupStepIntent.DEMO: {
      //save company and location details and return next step
      const [existingUser] = await Promise.all([
        getUserById(sbUser.id, sbUser),
      ]);

      await demoDataInstall(submission.value.installDemo, sbUser, request);

      await addUpdateUser(
        {
          ...existingUser,
          onboardingStatus: UserOnboarding.DEMO_COMPLETED,
        },
        sbUser,
        null,
      );
      return json(submission.reply());
    }
    case CompleteSignupStepIntent.LEGAL: {
      //save legal details and return next step
      const existingUser = await getUserById(sbUser.id, sbUser);

      await addUpdateUser(
        {
          ...existingUser,
          onboardingStatus: UserOnboarding.COMPLETED,
        },
        sbUser,
        null,
      );
      return json(submission.reply());
    }
    default: {
      return json(submission.reply());
    }
  }
}

export const meta: MetaFunction = () => [{ title: "Complete Sign Up" }];

export default function Join() {
  return (
    <div id="complete-signup-route" className="flex grow flex-col items-center">
      <CompleteSignupForm />
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        400: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>{isRouteErrorResponse(error) ? error.data : "unknown"}</p>
            </div>
          );
        },
        404: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>Page not found</p>
            </div>
          );
        },
      }}
    />
  );
}
