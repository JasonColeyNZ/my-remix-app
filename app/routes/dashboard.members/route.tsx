import {
  Outlet,
  // useLoaderData,
  useLocation,
  // useNavigate,
} from "@remix-run/react";
import type {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
// import { useMemo } from "react";
// import DataTable from "~/components/ui/tanstack/data-table.tsx";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard.tsx";
import SectionPage from "~/layouts/page-layouts/SectionPage.tsx";
import { getTableDefault } from "~/models/user.default.server.ts";
import { getUsers } from "~/models/user.server.ts";
import { getUser } from "~/utils/auth.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { TableTypes } from "~/utils/types.ts";

// import { usersColumns } from "./columns.tsx";
import MembersDataGrid from "./MembersDataGrid.tsx";
import appInfo from "~/app-info.tsx";

// VITE Imports
import "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// import reactgrids from "~/../node_modules/@syncfusion/ej2-react-grids/styles/tailwind.css";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: reactgrids }];
// };

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Team" }];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser, supabase } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const user = await getUser(request, sbUser, supabase);
  invariantResponse(user, "User should be defined");
  const [users, tableDefaults] = await Promise.all([
    getUsers(sbUser),
    getTableDefault(TableTypes.MEMBERS, sbUser),
  ]);
  return json({ users, tableDefaults });
}

const Members = () => {
  // const { users, tableDefaults } = useLoaderData<typeof loader>();
  // console.log("users", users);
  // const navigate = useNavigate();
  const location = useLocation();

  // const columns = useMemo(() => usersColumns(navigate), [navigate]);

  const regExpMembers = new RegExp(`/dashboard/members\\s`);
  const membersForm = regExpMembers.test(location.pathname + " ");

  // const handleAddClick = () => {
  //   navigate(`/dashboard/member/new/details`);
  // };
  return (
    <>
      <SectionPage id="clients-background" hideUI={false} breadcrumbOnly={true}>
        {!membersForm && <Outlet />}
        {membersForm && (
          <FullScreenCardLayout>
            <div className="w-full flex flex-1 min-h-0">
              {/* removed this sm:notWide:mb-2 */}
              <div className="w-full min-h-0 notWide:sm:rounded-md">
                <MembersDataGrid />
              </div>
              <Outlet />
            </div>
          </FullScreenCardLayout>
        )}
      </SectionPage>
    </>
  );
};
export default Members;
