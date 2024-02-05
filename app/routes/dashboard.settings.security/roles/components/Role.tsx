import { Link } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { userInitials } from "~/utils/strings";

const Role = ({ role }: { role: any }) => {
  return (
    <Card className=" p-4 h-36">
      <CardContent className="p-4 pt-0">
        <div className="flex">
          <div className="flex flex-col flex-1">
            <div className="flex h-12 items-center">
              <div className="text-secondary-foreground text-sm">
                Total {role.users.length} user{role.users.length > 1 ? "s" : ""}
              </div>
            </div>
            <div className="flex">
              <div className="flex flex-col">
                <div className="text-xl text-foreground">{role.name}</div>
                <Link
                  className="text-sm font-light text-primary"
                  to={`/dashboard/settings/security/roles/${role.id}`}
                >
                  Edit Role
                </Link>
              </div>
            </div>
          </div>
          <div className="flex mt-1">
            {role.users.length > 0 &&
              role.users.map((member: any) => (
                <div
                  key={member.id}
                  className="relative flex border-white border-2 rounded-full ml-[-8px] w-9 h-9"
                >
                  <Avatar className="rounded-2xl aspect-square w-8 h-8">
                    {member.avatarData?.publicUrl && (
                      <AvatarImage
                        alt={`${member?.firstName} ${member?.lastName}`}
                        src={member.avatarData.publicUrl ?? ""}
                      />
                    )}
                    <AvatarFallback className="rounded-2xl">
                      {userInitials(member?.firstName ?? "", member?.lastName)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Role;
