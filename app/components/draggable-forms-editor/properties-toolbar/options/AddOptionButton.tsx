import { useContext } from "react";
import { Button } from "~/components/ui/button";

import { DraggableFormStateTypes } from "../../store/draggableFormReducer";
import { DraggableFormContext } from "../../store/draggableFormContext";

const AddOptionButton = () => {
  const { state, dispatch } = useContext(DraggableFormContext);

  const handleAddOptionClick = () => {
    dispatch({
      type: DraggableFormStateTypes.addFieldOption,
      payload: {},
    });
  };

  return (
    <Button
      // boxSx={{ ml: "auto", mr: "7px", mb: "2px" }}
      // sx={{ py: "0", px: "5px", fontSize: "11px" }}
      // labelDefault={"Add Option"}
      // variant={"outlined"}
      // color={"success"}
      disabled={!state.formState.selectedControl}
      // url={null}
      // fullWidth={false}
      // size="small"
      onClick={handleAddOptionClick}
    >
      Add Option
    </Button>
  );
};
export default AddOptionButton;
