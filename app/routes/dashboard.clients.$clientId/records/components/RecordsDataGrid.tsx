import { useLoaderData, useNavigate } from "@remix-run/react";
import { useMemo } from "react";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";
import type { loader } from "../route";
import { recordsColumns } from "./columns/columns";

const RecordsDataGrid = () => {
  const { records, clientId } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const columns = useMemo(() => recordsColumns(), []);

  return (
    <DataGrid
      data={records}
      columns={columns}
      recordClick={(args: any) => {
        if (!args.data) return;
        navigate(`/dashboard/clients/${clientId}/records/${args.data.id}`);
        // console.log("recordClick", args.data);
      }}
    />
  );
};

export default RecordsDataGrid;
