import LocationAutoComplete from "~/components/location-autocomplete/LocationAutoComplete.tsx";
import MemberFilter from "./MemberFilter.tsx";

interface HeaderProps {
  myMembers: any;
  setMyMembers: any;
}

const Header = ({ myMembers, setMyMembers }: HeaderProps) => {
  //console.log("Render: Header");
  return (
    <>
      <div className="flex flex-row ml-auto px-2">
        <MemberFilter myMembers={myMembers} setMyMembers={setMyMembers} />
        <LocationAutoComplete rootUrl="/dashboard/teamschedule" />
      </div>
    </>
  );
};
export default Header;
