import {
  type MetaFunction,
  useLoaderData,
  Outlet,
  useNavigate,
  // type ShouldRevalidateFunction,
} from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import { SETTINGS_SECURITY_SELECTED_TAB, SETTINGS_SELECTED_TAB } from "~/const";
import { getRoles } from "~/models/role.server";
// import { getModules } from "~/models/role.server";
import { getSession, sessionStorage } from "~/services/session.server";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import Role from "./components/Role";
import { Card } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import pose from "~/assets/pose_m1.png";
// export const shouldRevalidate: ShouldRevalidateFunction = ({
//   currentParams,
//   nextParams,
// }) => {
//   // if (currentParams.serviceId !== nextParams.serviceId) return true;
//   return true;
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Roles" }];
};

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const [roles] = await Promise.all([getRoles(sbUser)]);

  // console.log("Security.Roles.setCookie");
  const session = await getSession(request);
  session.set(SETTINGS_SELECTED_TAB, SETTINGS_SECURITY_SELECTED_TAB + "/roles");
  return json(
    {
      roles,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Roles = () => {
  const { roles } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  const handleAddRole = () => {
    navigate("/dashboard/settings/security/roles/new");
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Roles List</div>
        <div className="text-sm font-light text-secondary-foreground">
          A role provides access to predefined menus and features within Easy
          MedSpa
        </div>
      </div>
      <div className="grid py-4 gap-4 grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <Role key={role.id} role={role} />
        ))}
        <Card className="h-36">
          <div className="flex h-full">
            <div className="relative mt-auto ml-12">
              <img width={65} src={pose} alt="add-role" />
            </div>
            <div className="flex p-4 pt-6 flex-1 flex-col">
              <Button className="ml-auto px-5 py-4" onClick={handleAddRole}>
                Add Role
              </Button>
              <div className="text-right py-2 text-foreground font-light">
                Add role, if it doesn't exist.
              </div>
            </div>
          </div>
        </Card>
      </div>
      <Outlet />
    </div>
  );
};

export default Roles;
