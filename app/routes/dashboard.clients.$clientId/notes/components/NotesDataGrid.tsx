import { useLoaderData } from "@remix-run/react";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";
import type { loader } from "../route";
import { useMemo, useState } from "react";
import { NotesColumns } from "./columns/columns";
import NoteEditor from "~/routes/resources/noteeditor/route";

const NotesDataGrid = () => {
  const { notes, clientId } = useLoaderData<typeof loader>();
  const [noteId, setNoteId] = useState<string>("");
  // const locales = useLocales();
  const [showEditor, setShowEditor] = useState<boolean>(false);
  const columns = useMemo(() => NotesColumns(), []);

  const handleViewClick = (noteId: string) => {
    setNoteId(noteId);
    setShowEditor(!showEditor);
  };

  const toolbarClickHandler = (args: any) => {
    if (args.item.id === "add-note") {
      setNoteId("new");
      setShowEditor(!showEditor);
    }
  };

  return (
    <>
      <DataGrid
        data={notes}
        columns={columns}
        toolbarClickHandler={toolbarClickHandler}
        headerButtons={[
          { text: "Print", tooltipText: "Print", prefixIcon: "e-print" },
          {
            text: "Add Note",
            tooltipText: "Add new note to client",
            prefixIcon: "e-notes",
            id: "add-note",
            align: "Right",
          },
          {
            text: "Search",
            tooltipText: "Search",
            prefixIcon: "e-search",
            align: "Right",
          },
        ]}
        recordClick={(args: any) => {
          // console.log("recordClick", args);
          if (!args.rowData) return;
          handleViewClick(args.rowData.id);
        }}
      />
      {showEditor && (
        <NoteEditor
          noteId={noteId}
          clientId={clientId}
          setShowEditor={setShowEditor}
        />
      )}
    </>
  );
};

export default NotesDataGrid;
