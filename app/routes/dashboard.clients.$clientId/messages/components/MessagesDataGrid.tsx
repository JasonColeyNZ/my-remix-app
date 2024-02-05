import { useLoaderData } from "@remix-run/react";
import type { loader } from "../route";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";
import { useMemo } from "react";
import { messagesColumns } from "./columns/columns";

const MessagesDataGrid = () => {
  const { messages } = useLoaderData<typeof loader>();

  const columns = useMemo(() => messagesColumns(), []);

  return (
    <DataGrid
      data={messages}
      columns={columns}
      recordClick={(args: any) => {
        if (!args.data) return;
        // console.log("recordClick", args.data);
        //     // setGridRefresh(false);
        //     // navigate(`/dashboard/clients/${args.data.id}`);
        //     // args.data
      }}
    />
  );
};

export default MessagesDataGrid;
