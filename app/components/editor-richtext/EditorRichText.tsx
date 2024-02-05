import React, { useContext, useEffect, useMemo, useState } from "react";
import FormViewerWithFetcher from "../form-viewer/FormViewerWithFetcher";
import { formViewerSchema } from "../form-viewer/formViewerSchema";
import { editContentDefinition } from "./content-editor-definition";
import { AppContext } from "~/store/appContext";
import { DraggableFormContext } from "../draggable-forms-editor/store/draggableFormContext";
import { DraggableFormStateTypes } from "../draggable-forms-editor/store/draggableFormReducer";
import { FormStateTypes } from "~/store/formReducer";
import { AreaType, FieldType } from "../draggable-forms-editor/types";
import { EditorTypeEnum } from "~/utils/types";
import { Card, CardContent } from "../ui/card";
import { cn } from "~/utils/shadcn.utils";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { animated, useSpring } from "@react-spring/web";

const EditorRichText = () => {
  const { state, dispatch } = useContext(DraggableFormContext);
  const { state: appState, dispatch: appDispatch } = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(false);
  const [fullScreen, setFullScreen] = useState<boolean>(false);

  useEffect(() => {
    setFullScreen(
      state.formState.selectedControl?.field.fieldType === FieldType.RICHTEXT,
    );
  }, [state.formState.selectedControl?.field.fieldType]);

  const formDefinition = useMemo(() => {
    return editContentDefinition();
  }, []);

  const onSuccessfulSave = (data: any) => {
    console.log("onSuccessfulSave: ", data);

    dispatch({
      type: DraggableFormStateTypes.updateSelectedControlProperty,
      payload: {
        updateSelectedControlProperty: {
          id: "field.text",
          value: data.get("text"),
        },
      },
    });
    dispatch({
      type: DraggableFormStateTypes.formModified,
      payload: {
        formModified: true,
      },
    });

    handleClose();
  };

  const handleClose = () => {
    appDispatch({
      type: FormStateTypes.removeRecordEditor,
      payload: {
        recordEditor: AreaType.CONTENTEDITOR,
      },
    });

    appDispatch({
      type: FormStateTypes.showEditor,
      payload: {
        showEditor: null,
      },
    });
  };
  useEffect(() => {
    setOpen(appState.formState.showEditor === EditorTypeEnum.RICHTEXT);
  }, [appState.formState.showEditor]);

  const { opacity, display } = useSpring({
    from: { opacity: 0, display: "none" },
    to: { opacity: open ? 1 : 0, display: open ? "flex" : "none" },
    delay: 100,
    config: { mass: 1, tension: 170, friction: 26 },
    onResolve: () => {
      if (open)
        appDispatch({
          type: FormStateTypes.refreshRichtextEditor,
          payload: {
            refreshRichtextEditor: true,
          },
        });
    },
  });

  if (fullScreen) {
    return (
      <animated.div
        className={cn(
          "absolute top-0 transform-all left-0 w-full h-full align-top flex-col flex-1 bg-white z-[1000]",
        )}
        style={{ opacity, display }}
      >
        <FormViewerWithFetcher
          title="Edit Text Content"
          objectName="Form"
          dataSchema={formViewerSchema(formDefinition)}
          actionUrl={``}
          buttonsTop={false}
          onSuccess={onSuccessfulSave}
          formDefinition={formDefinition}
          defaultValues={{
            id: state.formState.selectedControl?.id,
            formId: "edit-text",
            text: state.formState.selectedControl?.field.text,
          }}
          backButtonLabel="Cancel"
          onBackClick={handleClose}
          fullHeight={true}
          skipPost={true}
        />
      </animated.div>
    );
  }

  //important, otherwise we get a weird invisible input field going from products to forms?
  if (!open) return null;

  return (
    <DialogComponent
      isModal={true}
      visible={open}
      open={() => {
        appDispatch({
          type: FormStateTypes.refreshRichtextEditor,
          payload: {
            refreshRichtextEditor: true,
          },
        });
        // console.log("open");
      }}
      close={() => handleClose()}
      className={cn(
        "notWide:!w-[800px] border-0 shadow-none [&_.e-dlg-content]:p-0 [&_.e-dlg-content]:bg-transparent [&_.e-dlg-content]:shadow-none",
      )}
    >
      {/* <Dialog open={open}>
      <DialogContent
        className="border-none bg-transparent p-0 shadow-none notWide:w-[800px]"
        hideClose={true}
      > */}
      <Card
        className={cn(
          "flex flex-col w-full border-0 shadow-none " +
            " notWide:m-auto notWide:align-center h-[520px]  notWide:shadow-md notWide:border wide:flex-1",
        )}
      >
        <CardContent className={"grow flex flex-col flex-1 p-0"}>
          <div className="align-top flex flex-col flex-1 wide:min-h-[unset]">
            <FormViewerWithFetcher
              title="Edit Text Content"
              objectName="Form"
              dataSchema={formViewerSchema(formDefinition)}
              actionUrl={``}
              buttonsTop={false}
              onSuccess={onSuccessfulSave}
              formDefinition={formDefinition}
              defaultValues={{
                id: state.formState.selectedControl?.id,
                formId: "edit-text",
                text: state.formState.selectedControl?.field.text,
              }}
              backButtonLabel="Cancel"
              onBackClick={handleClose}
              fullHeight={true}
              skipPost={true}
            />
          </div>
        </CardContent>
      </Card>
      {/* </DialogContent>
    
    </Dialog > */}
    </DialogComponent>
  );
};

export default EditorRichText;
