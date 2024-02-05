import { Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar.tsx";
import { Badge } from "~/components/ui/badge.tsx";
import { Button } from "~/components/ui/button.tsx";
import { Card, CardContent } from "~/components/ui/card.tsx";
import { Separator } from "~/components/ui/separator.tsx";
import ClientEdit from "~/routes/resources/clienteditor/route.tsx";
import { userInitials } from "~/utils/strings.tsx";
import type { loader } from "../route";
import { useLoaderData } from "@remix-run/react";
import DetailRow from "~/components/data-rows/DetailRow";
import TagRow from "~/components/data-rows/TagRow";
import MailingListRow from "~/components/data-rows/MailingListRow";

const ClientInfo = () => {
  const { client } = useLoaderData<typeof loader>();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const editContactClick = () => {
    setShowEditor(!showEditor);
    // console.log("editContactClick");
  };

  // if (!client) return null;

  return (
    <div className="col-span-12 md:col-span-5 lg:col-span-4">
      <div className="gap-3 sm:gap-0">
        <div className="">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-2 pt-5 gap-2">
              <Avatar className="rounded-md aspect-square w-32 h-32">
                {client.avatarData?.publicUrl && (
                  <AvatarImage
                    alt={`${client?.firstName} ${client?.lastName}`}
                    src={client.avatarData.publicUrl ?? ""}
                  />
                )}
                <AvatarFallback className="rounded-md">
                  {userInitials(client?.firstName ?? "", client?.lastName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-row text-xl font-medium">
                <div className="w-[25px] h-full mr-2"> </div>
                {client?.firstName} {client?.lastName}
                <Button
                  className="p-1 ml-2 w-[25px] h-6 border-[1px] rounded-md border-gray-200 hover:bg-primary-6 hover:border-primary"
                  variant="ghost"
                  size="sm"
                  onClick={editContactClick}
                >
                  <Pencil1Icon />
                </Button>
                {showEditor && (
                  <ClientEdit
                    clientId={client?.id}
                    setShowEditor={setShowEditor}
                  />
                )}
              </div>
              <Badge className="bg-destructive">Permissions</Badge>
            </CardContent>
            <CardContent>
              <div className="text-xl mb-2">Details</div>
              <Separator />
              <div className="mt-3 flex flex-col gap-2">
                <DetailRow label="Email" value={client.email} />
                <DetailRow label="Mobile" value={client.mobileNumber} />
                <DetailRow label="Home" value={client.homeNumber} />
                <DetailRow label="Work" value={client.workNumber} />
                <DetailRow label="Birthday" value={client.dateOfBirth} />
                <DetailRow
                  label="Marital Status"
                  value={client.maritalStatus}
                />
                <TagRow tags={client.tags} />
                <MailingListRow tags={client.mailingLists} />
                {/* <DetailRow label="Address" value={client.address} /> */}
                {/* <DetailRow label="Notes" value={client.notes} /> */}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientInfo;
