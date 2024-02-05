import {
  useLoaderData,
  type MetaFunction,
  type ShouldRevalidateFunction,
  Form,
} from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import appInfo from "~/app-info";
import { SETTINGS_SECURITY_SELECTED_TAB, SETTINGS_SELECTED_TAB } from "~/const";
import { getUsers, updateUserRole } from "~/models/user.server";
import { getSession, sessionStorage } from "~/services/session.server";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import Member from "./components/Member";
import { getRoles } from "~/models/role.server";
import { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/components/ui/sheet";
import VList from "~/components/vertical-list/VList";
import VListItemButton from "~/components/vertical-list/VListItemButton";
import { Button } from "~/components/ui/button";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema";
import { memberRoleSchema } from "./memberRoleSchema";
import { parseWithZod } from "@conform-to/zod";

export const shouldRevalidate: ShouldRevalidateFunction = () => {
  return true;
};

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Settings - Member Permissions" }];
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: memberRoleSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const role = await updateUserRole(submission.value, sbUser);
      invariantResponse(role, "Member Role not updated");
      return json({ status: 200, data: role });
    }
  }

  return json({});
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log("services:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const [users, roles] = await Promise.all([
    getUsers(sbUser),
    getRoles(sbUser),
  ]);

  // console.log("Security.Members.setCookie");
  const session = await getSession(request);
  session.set(
    SETTINGS_SELECTED_TAB,
    SETTINGS_SECURITY_SELECTED_TAB + "/members",
  );
  return json(
    { users, roles },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Members = () => {
  const { users, roles } = useLoaderData<typeof loader>();
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  const [member, setMember] = useState<any>({});

  const handleClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (id: string) => {
    setSelectedRoleId(id);
  };

  const handleRoleClick = (id: string) => {
    const member = users.find((user) => user.id === id);
    setMember(member);
    setSelectedRoleId(member?.role?.id ?? "");
    setOpen(true);
  };

  return (
    <div className="w-full p-4">
      <div className="flex flex-col">
        <div className="text-2xl text-foreground">Member Permissions</div>
        <div className="text-sm text-secondary-foreground">
          Assign Roles to Team Members
        </div>
      </div>
      <div className="grid py-4 gap-4 grid-cols-2 xl:grid-cols-3">
        {users.map((member) => (
          <Member key={member.id} member={member} roleClick={handleRoleClick} />
        ))}
      </div>
      <Sheet
        open={open}
        onOpenChange={(open) => {
          // console.log("onOpenChange: ", open);
          if (open) return;
          // navigate("..");
        }}
      >
        <SheetContent className="flex flex-col">
          <Form method="POST" className="flex flex-col h-full">
            <input
              type="hidden"
              name="intent"
              value={formViewerIntent.CREATE}
            />
            <input type="hidden" name="roleId" value={selectedRoleId} />
            <input type="hidden" name="userId" value={member.id} />

            <SheetHeader>
              <SheetTitle>Select Role</SheetTitle>
              <SheetDescription>
                Select a role below for {member.firstName} {member.lastName}
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col py-3 flex-1 p-0">
              <VList
                selectedId={selectedRoleId}
                className="h-full w-full p-0 gap-2"
              >
                {roles &&
                  roles.map((role) => (
                    <VListItemButton
                      className="border-[1px] h-14 mb-1 bg-gray-50 border-gray-100 rounded-md"
                      key={role.id}
                      id={role.id}
                      text={role.name}
                      onClick={handleListItemClick}
                    />
                  ))}
              </VList>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button onClick={handleClose} type="submit">
                  Select
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button variant="outline" onClick={handleClose} type="button">
                  Close
                </Button>
              </SheetClose>
            </SheetFooter>
          </Form>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Members;
