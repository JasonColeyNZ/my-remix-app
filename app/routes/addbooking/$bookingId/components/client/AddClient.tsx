import React, { useContext } from "react";
import { Button } from "~/components/ui/button";
import { AddBookingContext } from "../../store/addBookingContext";
import type { addUpdateClientItemType } from "~/models/client.server";
import { AddBookingStateTypes } from "../../store/addBookingReducer";
import ClientEdit from "~/routes/resources/clienteditor/route";

const AddClient = ({
  showEditor,
  setShowEditor,
}: {
  showEditor: boolean;
  setShowEditor: (showEditor: boolean) => void;
}) => {
  const { state, dispatch } = useContext(AddBookingContext);
  // const [showEditor, setShowEditor] = useState<boolean>(false);

  const handleSetClient = (client: addUpdateClientItemType) => {
    setShowEditor(false);
    dispatch({
      type: AddBookingStateTypes.selectClient,
      payload: { selectClient: client },
    });
  };

  const handleAddClick = () => {
    setShowEditor(true);
  };

  return (
    <>
      <Button
        className="h-5 text-xs px-2"
        variant="secondary"
        onClick={handleAddClick}
      >
        Add Client
      </Button>
      {showEditor && (
        <ClientEdit
          clientId={
            state.addBookingState.activeBooking?.client
              ? state.addBookingState.activeBooking?.client.id
              : "new"
          }
          setShowEditor={setShowEditor}
          setClient={handleSetClient}
        />
      )}
    </>
  );
};

export default AddClient;
