// import { useLoaderData } from "@remix-run/react";
// import { useCallback, useState } from "react";

// import type { loader } from "../route.tsx";

interface MemberFilterProps {
  myMembers: any;
  setMyMembers: any;
}

const MemberFilter = ({ myMembers, setMyMembers }: MemberFilterProps) => {
  // const { selectedUsers } = useLoaderData<typeof loader>();
  console.log("myMembers ", myMembers);
  //myMembers are the resources from the schedule
  // const [participants, setParticipants] = useState({
  //   myMembers,
  // });

  // const filter = useCallback(
  //   (ev: any) => {
  //     participants[+ev.target.value] = ev.target.checked;
  //     setParticipants({ ...participants });
  //     setMyMembers(selectedUsers.filter((r) => participants[r.id]));
  //   },
  //   [participants, selectedUsers, setMyMembers],
  // );

  return (
    <div>
      {/* <Autocomplete
        size={"small"}
        sx={[
          {
            margin: "2px",
            marginTop: "2px !important",
            width: "200px",

            "& .MuiAutocomplete-inputRoot": {
              pt: "2px !important",
              pb: "1px !important",
            },
          },
        ]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant={"outlined"}
            label={"Members"}
            InputLabelProps={{
              shrink: true,
            }}
          />
        )}
        //value={participants}
        onChange={(event, option) => {
          console.log("onChange", option);
          //changeLocation(option?.value);
        }}
        options={selectedUsers}
        isOptionEqualToValue={(option, value) =>
          option.id + "" === value.id + ""
        }
        getOptionLabel={(option) => {
          if (!option) {
            return "";
          }
          return option.name;
        }}
        multiple={true}
      /> */}
    </div>
  );
};

export default MemberFilter;
