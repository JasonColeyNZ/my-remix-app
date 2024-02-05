// import { useLoaderData } from "@remix-run/react";
import {
  json,
  type LoaderFunctionArgs,
  type ActionFunctionArgs,
  type MetaFunction,
  redirect,
} from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import { addRole, getRoleById, updateRole } from "~/models/role.server";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import RoleForm from "./components/RoleForm";
import { useLoaderData } from "@remix-run/react";
// import type { loader as rolesLoader } from "../route.tsx";
import { roleSchema } from "./roleSchema.ts";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import { parseWithZod } from "@conform-to/zod";

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Roles" }];
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: roleSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const role = await addRole(submission.value, sbUser);
      invariantResponse(role, "Role not created");
      return redirect(`..`);
    }
    case formViewerIntent.UPDATE: {
      const role = await updateRole(submission.value, sbUser);
      invariantResponse(role, "Role not updated");
      return redirect(`..`);
    }
  }

  return json({});
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { roleId } = params;
  invariantResponse(roleId, "roleId should be provided");

  const [role] = await Promise.all([getRoleById(roleId, sbUser)]);

  return json({ role });
}

const Role = () => {
  // const data = useRouteLoaderData<typeof rolesLoader>(
  //   "routes/dashboard.settings.security/roles/route",
  // );

  const { role } = useLoaderData<typeof loader>();
  // console.log("role: ", role);
  return <RoleForm role={role} />;
};

export default Role;
