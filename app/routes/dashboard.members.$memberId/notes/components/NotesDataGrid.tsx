import { useState } from "react";
import DataGrid from "~/components/syncfusion/data-grid/DataGrid";
import { notesColumns } from "./columns/columns";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "../route";
import NoteEditor from "~/routes/resources/noteeditor/route";

const NotesDataGrid = () => {
  const { notes, memberId } = useLoaderData<typeof loader>();
  const columns = notesColumns();
  const [noteId, setNoteId] = useState<string>("");
  const [showEditor, setShowEditor] = useState<boolean>(false);

  const handleViewClick = (noteId: string) => {
    setNoteId(noteId);
    setShowEditor(!showEditor);
  };

  return (
    <>
      <DataGrid
        data={notes}
        columns={columns}
        recordClick={(args: any) => {
          //     // console.log("recordClick", args);
          if (!args.rowData) return; //cell click has no data object
          handleViewClick(args.data.id);
        }}
      />
      {showEditor && (
        <NoteEditor
          noteId={noteId}
          clientId={memberId}
          setShowEditor={setShowEditor}
        />
      )}
    </>
  );
};

export default NotesDataGrid;
