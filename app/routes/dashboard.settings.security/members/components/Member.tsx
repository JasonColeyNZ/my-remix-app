import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { userInitials } from "~/utils/strings";

interface MemberProps {
  member: any;
  roleClick: (id: string) => void;
}

const Member = ({ member, roleClick }: MemberProps) => {
  // console.log("Member: ", member);
  return (
    <Card className="p-4 pl-1 h-32">
      <CardContent className="flex p-4 pt-0">
        <div className="flex items-center">
          <Avatar className="rounded-sm aspect-square h-24 w-24">
            {member.avatarData.publicUrl && (
              <AvatarImage
                alt={`${member?.firstName} ${member?.lastName}`}
                src={member.avatarData.publicUrl ?? ""}
              />
            )}
            <AvatarFallback className="rounded-sm text-3xl">
              {userInitials(member?.firstName ?? "", member?.lastName)}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-1">
          <div className="flex flex-1 flex-col">
            <div className="ml-auto text-xl text-foreground">
              {member.firstName} {member.lastName}
            </div>
            <div
              className="ml-auto mt-4 mr-[-2px] text-primary font-light cursor-pointer"
              onClick={() => roleClick(member.id)}
            >
              Role
            </div>
            <div className="ml-auto font-light">
              {member.role ? member.role.name : "No Role Assigned"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Member;
