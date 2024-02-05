import { Pencil1Icon } from "@radix-ui/react-icons";
import { useLoaderData } from "@remix-run/react";
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
import { userInitials } from "~/utils/strings.tsx";
import type { loader } from "../route";
import MemberEdit from "~/routes/resources/membereditor/route";

const MemberInfo = () => {
  const { member } = useLoaderData<typeof loader>();
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const editContactClick = () => {
    setShowEditor(!showEditor);
    // console.log("editContactClick");
  };

  if (!member) return null;

  return (
    <div className="col-span-12 md:col-span-5 lg:col-span-4">
      <div className="gap-3 sm:gap-0">
        <div className="">
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-2 pt-5 gap-2">
              <Avatar className="rounded-md aspect-square w-32 h-32">
                {member.avatarData?.publicUrl && (
                  <AvatarImage
                    alt={`${member?.firstName} ${member?.lastName}`}
                    src={member.avatarData.publicUrl ?? ""}
                  />
                )}
                <AvatarFallback className="rounded-md">
                  {userInitials(member?.firstName ?? "", member?.lastName)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-row text-xl font-medium">
                <div className="w-[40px] h-full mr-2"> </div>
                {member?.firstName} {member?.lastName}
                <Button
                  className="ml-2 w-[40px]"
                  variant="ghost"
                  size="sm"
                  onClick={editContactClick}
                >
                  <Pencil1Icon />
                </Button>
                {showEditor && (
                  <MemberEdit
                    memberId={member?.id}
                    setShowEditor={setShowEditor}
                  />
                )}
              </div>
              <Badge className="bg-destructive">
                {member.role ? member.role?.name : "NO ROLE ASSIGNED"}
              </Badge>
            </CardContent>
            <CardContent>
              <div className="text-xl mb-2">Details</div>
              <Separator />
              <div className="mt-3 flex flex-col gap-2">
                <DetailRow label="Email" value={member.email} />
                <DetailRow label="Mobile" value={member.mobileNumber} />
                <DetailRow label="Home" value={member.homeNumber} />
                <DetailRow label="Work" value={member.workNumber} />
                <DetailRow label="Birthday" value={member.dateOfBirth} />
                <DetailRow
                  label="Marital Status"
                  value={member.maritalStatus}
                />
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

const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | null;
}) => {
  if (!value) return null;
  return (
    <div className="flex flex-row gap-2 items-baseline h-6">
      <div className="w-1/3 text-xs text-slate-500">{label}</div>
      <div className="w-2/3">{value}</div>
    </div>
  );
};

export default MemberInfo;
