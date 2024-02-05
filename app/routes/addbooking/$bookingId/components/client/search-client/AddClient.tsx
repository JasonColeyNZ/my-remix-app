import { Button } from "~/components/ui/button";
import type { addUpdateClientItemType } from "~/models/client.server";
import ClientEdit from "~/routes/resources/clienteditor/route";

const AddClient = ({
  showEditor,
  setShowEditor,
}: {
  showEditor: boolean;
  setShowEditor: (showEditor: boolean) => void;
}) => {
  const handleSetClient = (client: addUpdateClientItemType) => {
    setShowEditor(false);
    // dispatch({
    //   type: AddBookingStateTypes.selectClient,
    //   payload: { selectClient: client },
    // });
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
          clientId={"new"}
          setShowEditor={setShowEditor}
          setClient={handleSetClient}
        />
      )}
    </>
  );
};

export default AddClient;
