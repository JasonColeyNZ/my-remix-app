import { useContext } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar.tsx";
import { Checkbox } from "~/components/ui/checkbox.tsx";
import { AppContext } from "~/store/appContext";
import { SchedulerStateTypes } from "~/store/schedulerReducer";
import { userInitials } from "~/utils/strings.tsx";

const Team = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      <div className="font-medium mb-2 text-center text-primary">
        Team Members
      </div>
      <div className="flex flex-col gap-2">
        {state.schedulerState.teamMembers.map((user) => {
          return (
            <div className="flex items-center gap-2" key={user.id}>
              <Avatar>
                <AvatarImage alt={`${user.firstName}`} src={user.img ?? ""} />
                <AvatarFallback>
                  {userInitials(user.firstName, user.lastName)}
                </AvatarFallback>
              </Avatar>
              <Checkbox
                className=""
                key={user.id}
                id={user.id}
                checked={user.checked}
                onCheckedChange={(checked) => {
                  if (typeof checked !== "boolean") return;
                  dispatch({
                    type: SchedulerStateTypes.teamMembers,
                    payload: {
                      teamMembers: state.schedulerState.teamMembers.map(
                        (member) => {
                          if (member.id === user.id) {
                            return {
                              ...member,
                              checked: checked,
                            };
                          } else {
                            return member;
                          }
                        },
                      ),
                    },
                  });
                }}
              />
              <label className="text-sm" htmlFor={user.id}>
                {user.firstName} {user.lastName}
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Team;
