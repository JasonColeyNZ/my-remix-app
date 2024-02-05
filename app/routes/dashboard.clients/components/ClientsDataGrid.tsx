import { useMemo } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { loader } from "../route";
import { clientColumns } from "./columns/columns";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";

const ClientsDataGrid = () => {
  const { clients } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  // const [pageSettings, setPageSettings] = useState<PageSettingsModel>();

  const columns = useMemo(() => {
    return clientColumns;
  }, []);

  return (
    <DataGrid
      data={clients}
      columns={columns}
      recordClick={(args: any) => {
        if (!args.rowData) return; //cell click has no data object
        navigate(`/dashboard/clients/${args.rowData.id}`);
      }}
    />
  );
};

export default ClientsDataGrid;
