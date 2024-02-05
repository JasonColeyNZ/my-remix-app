import { Outlet } from "@remix-run/react";

const PublicIndex = () => {
  return (
    <div id="public-index" className="ml-auto mr-auto">
      <Outlet />
    </div>
  );
};
export default PublicIndex;
