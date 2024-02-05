import { useFetcher } from "@remix-run/react";
import { serialize } from "object-to-formdata";
import { useContext, useMemo } from "react";
import { Button } from "~/components/ui/button.tsx";

import { DraggableFormStateTypes } from "../store/draggableFormReducer.ts";
import { isUUid } from "~/utils/strings.tsx";
import { DraggableFormContext } from "../store/draggableFormContext.tsx";

const DeleteFieldButton = () => {
  const { state, dispatch } = useContext(DraggableFormContext);
  const customField = isUUid(state.formState.selectedControl?.field?.id || "");
  const deleteFieldFetcher = useFetcher();

  const fieldOnForm = useMemo(
    () =>
      state.formState.formDefinition?.rows?.find(
        (row) =>
          row.controls?.find(
            (control) => control.id === state.formState.selectedControl?.id,
          ),
      ),
    [state.formState.formDefinition?.rows, state.formState.selectedControl?.id],
  ); // eslint-disable-line react-hooks/exhaustive-deps

  const fieldLabel = useMemo(() => {
    if (fieldOnForm) {
      return "Remove from Form";
    } else if (customField) return "Delete Field";
    return "";
  }, [customField, fieldOnForm]);

  const handleDelete = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    //console.log("delete");
    if (fieldOnForm) {
      dispatch({
        type: DraggableFormStateTypes.deleteSelectedControl,
        payload: {},
      });
    } else if (customField) {
      const data = {
        id: state.formState.selectedControl?.id,
        action: "delete-field",
      };
      deleteFieldFetcher.submit(serialize(data), {
        method: "post",
        action: `/dashboard/settings/records/fields`,
      });
      // dispatch({
      //   type: DraggableFormStateTypes.clearSelections,
      //   payload: {},
      // });
    }
  };

  if (!fieldLabel) return null;
  return (
    <Button
      className="mx-auto text-xs h-6 px-2"
      variant="secondary"
      disabled={!state.formState.selectedControl}
      onClick={handleDelete}
    >
      {fieldLabel}
    </Button>
  );
};
export default DeleteFieldButton;
