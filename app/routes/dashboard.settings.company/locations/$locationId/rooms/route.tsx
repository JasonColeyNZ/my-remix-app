import { Outlet } from "@remix-run/react";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";

export interface RoomType {
  name: string;
  id: string;
  location: string;
}

const Rooms = () => {
  return (
    <SettingsRightCard>
      <Outlet />
    </SettingsRightCard>
  );
};
export default Rooms;
