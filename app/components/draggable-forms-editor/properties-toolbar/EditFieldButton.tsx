import { useFetcher } from "@remix-run/react";
import { serialize } from "object-to-formdata";
import { useContext, useMemo } from "react";
import { Button } from "~/components/ui/button";

import { processFormDefinition } from "../formUtils";
import { DraggableFormStateTypes } from "../store/draggableFormReducer";
import { isUUid } from "~/utils/strings";
import { DraggableFormContext } from "../store/draggableFormContext";

// interface EditFieldButtonProps {
//   submitForm?: () => void;
// }

const EditFieldButton = () => {
  const { state, dispatch } = useContext(DraggableFormContext);
  const saveFieldFetcher = useFetcher();

  const fieldOnForm = useMemo(() => {
    if (!state.formState.selectedControl) return true;
    const field = state.formState.formDefinition?.rows?.find(
      (row) =>
        row.controls?.find(
          (control) => control.id === state.formState.selectedControl?.id,
        ),
    );
    return field === undefined;
  }, [state.formState.formDefinition?.rows, state.formState.selectedControl]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditFieldClick = () => {
    if (state.formState.editMode) {
      if (isUUid(state.formState?.selectedControl?.field.id || "")) {
        const data = {
          formDefinition: processFormDefinition(state.formState.formDefinition),
          formId: state.formState.selectedForm?.id,
          field: state.formState.selectedControl,
          area: state.formState.selectedForm?.area,
          action: "edit-field",
        };
        //console.log("Edit Field: ", data);
        saveFieldFetcher.submit(serialize(data, { indices: true }), {
          method: "post",
          action: `/dashboard/settings/records/fields`,
        });
        dispatch({
          type: DraggableFormStateTypes.controlModified,
          payload: {
            controlModified: false,
          },
        });
      } else {
        //update form definition
        dispatch({
          type: DraggableFormStateTypes.formModified,
          payload: {
            formModified: true,
          },
        });
      }

      // if (state.formState.selectedControl?.controlSource === 'custom') {
      //   submitForm && submitForm();
      // }

      // dispatch({
      //   type: DraggableFormStateTypes.saveSelectedControlToForm,
      //   payload: {},
      // });
    } else {
      dispatch({
        type: DraggableFormStateTypes.editMode,
        payload: {
          editMode: true,
        },
      });
    }
  };

  return (
    <>
      <Button
        // boxSx={{ ml: "auto", mr: "7px", mb: "2px" }}
        // sx={{ py: "0", px: "5px", fontSize: "11px" }}
        // labelDefault={state.formState.editMode ? "Save" : "Edit"}
        // variant={
        //   state.formState.editMode && state.formState.controlModified
        //     ? "contained"
        //     : "outlined"
        // }
        // color={state.formState.editMode ? "success" : "primary"}
        variant="secondary"
        disabled={fieldOnForm}
        className="ml-auto text-xs h-5 px-2"
        // url={null}
        // fullWidth={false}
        // size="small"
        onClick={handleEditFieldClick}
      >
        {state.formState.editMode ? "Save" : "Edit"}
      </Button>
    </>
  );
};
export default EditFieldButton;
