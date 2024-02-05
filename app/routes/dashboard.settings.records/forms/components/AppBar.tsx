import { useLoaderData, useParams } from "@remix-run/react";
import { useCallback, useContext, useEffect } from "react";
import { DraggableFormContext } from "~/components/draggable-forms-editor/store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "~/components/draggable-forms-editor/store/draggableFormReducer.ts";
import type { FormType } from "~/components/draggable-forms-editor/types.ts";
import { Label } from "~/components/ui/label.tsx";
import { Switch } from "~/components/ui/switch.tsx";
import { AppContext } from "~/store/appContext";
import { FormStateTypes } from "~/store/formReducer";
import { cn } from "~/utils/shadcn.utils.ts";

import AddForm from "./AddForm";
import FormList from "./FormList";
import type { loader } from "../route";

// import FormSelect from "./FormSelect.tsx";

const AppBar = () => {
  const { areas } = useLoaderData<typeof loader>();
  const { formId } = useParams();
  const { state, dispatch } = useContext(DraggableFormContext);
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);

  useEffect(() => {
    //find form from areas
    let form = null;
    for (const area of areas) {
      form = area.forms.find((f) => f.id === formId);
      if (form) break;
    }
    if (form) {
      // console.log("form: ", form);
      dispatch({
        type: DraggableFormStateTypes.selectedForm,
        payload: {
          selectedForm: form as unknown as FormType,
        },
      });
    }
  }, [formId, areas, dispatch]);

  const handlePreviewChange = useCallback(() => {
    appDispatch({
      type: FormStateTypes.preview,
      payload: {
        preview: !appState.formState.preview,
      },
    });
    // setPreview(!preview);
  }, [appDispatch, appState.formState.preview]);

  return (
    <div
      className={cn(
        "static flex flex-row pr-0 pl-0 bg-gray-100",
        // appState.formState.preview ? "border-b border-gray-300" : "",
      )}
    >
      {/* {!appState.formState.preview && ( */}
      <div
        className={cn("flex flex-[0_0_220px] xl:flex-[0_0_300px] pr-2 py-1")}
      >
        <FormList selectedFormName={state.formState.selectedForm?.name ?? ""} />
        <AddForm />
      </div>
      {/* )} */}

      <div className={cn("flex-1 pt-1 mx-2")}>
        {state.formState.selectedForm && (
          <>
            {/* {appState.formState.preview && (
              <div className="flex items-center pl-4 text-md font-weight-700 font-semibold text-primary-10">
                {state.formState.selectedForm.name}
              </div>
            )} */}
            <div className="flex items-center pl-4 text-primary-10 font-medium text-sm">
              {state.formState.selectedForm.description}
            </div>
            <div className="flex items-center pl-4 pt-1 text-gray-600 text-xs">
              (
              {state.formState.selectedForm.area
                .replace(/([A-Z])/g, " $1")
                .trim()}
              )
            </div>
          </>
        )}
      </div>

      <div
        className={cn(
          "flex flex-[0_0_220px]",
          "justify-center px-1 py-1 items-center space-x-2",
          !appState.formState.preview ? "bl" : "",
        )}
      >
        {/* !preview && {
            borderLeft: "1px solid #c7c9d1",
            backgroundColor: "#fff",
          }, */}

        <Switch
          id="preview-switch"
          name="preview-switch"
          color="warning"
          checked={appState.formState.preview}
          onCheckedChange={handlePreviewChange}
        />
        <Label htmlFor="preview-switch">Preview</Label>
      </div>
    </div>
  );
};
export default AppBar;
