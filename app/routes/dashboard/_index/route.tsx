import { Outlet } from "@remix-run/react";
import SectionPage from "~/layouts/page-layouts/SectionPage.tsx";
import Header from "./components/DashboardHeader";
import Filters from "./components/Filters";
import DBClients from "./components/DBClients";
import DBBookings from "./components/DBBookings";
import DBTop10ClientBookings from "./components/DBTop10ClientBookings";
import DBTop10BookingServices from "./components/DBTop10BookingServices";

//runs when you navigate to dashboard
const DashboardIndex = () => {
  return (
    <>
      <SectionPage
        id="dashboard-background"
        hideUI={false}
        breadcrumbOnly={true}
      >
        <div className="flex flex-col gap-3">
          <Header />
          <Filters />
          <div className="flex w-full gap-3">
            <DBClients />
            <DBBookings />
          </div>
          <div className="flex flex-col w-full gap-3">
            <DBTop10ClientBookings />
            <DBTop10BookingServices />
          </div>
        </div>
        <Outlet />
      </SectionPage>
    </>
  );
};
export default DashboardIndex;
