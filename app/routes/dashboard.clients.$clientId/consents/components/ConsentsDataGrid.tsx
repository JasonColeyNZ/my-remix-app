import { useLoaderData } from "@remix-run/react";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";
import type { loader } from "../route";
import { useMemo, useState } from "react";
import { ConsentsColumns } from "./columns/columns";
import ConsentEditor from "~/routes/resources/consenteditor/route";
import AddConsent from "./AddConsent";

const ConsentsDataGrid = () => {
  const { consents, clientId } = useLoaderData<typeof loader>();
  const [consentId, setConsentId] = useState<string>("");
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const columns = useMemo(() => ConsentsColumns(), []);

  // console.log("consents: ", consents);

  const handleViewClick = (consentId: string) => {
    setConsentId(consentId);
    setShowEditor(!showEditor);
  };

  const toolbarClickHandler = (args: any) => {
    if (args.item.id === "add-consent") {
      //don't do anything as the button opens the sheet
    }
  };

  return (
    <>
      <DataGrid
        data={consents}
        columns={columns}
        toolbarClickHandler={toolbarClickHandler}
        headerButtons={[
          { text: "Print", tooltipText: "Print", prefixIcon: "e-print" },
          {
            text: "Add Consent",
            id: "add-consent",
            align: "Right",
            type: "Input",
            template: () => {
              return <AddConsent />;
            },
          },
          {
            text: "Search",
            tooltipText: "Search",
            prefixIcon: "e-search",
            align: "Right",
          },
        ]}
        recordClick={(args: any) => {
          // console.log("recordClick", args.rowData);
          handleViewClick(args.rowData.id);
        }}
      />
      {showEditor && (
        <ConsentEditor
          consentId={consentId}
          clientId={clientId}
          setShowEditor={setShowEditor}
        />
      )}
    </>
  );
};

export default ConsentsDataGrid;
