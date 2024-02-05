import { Form, useSubmit } from "@remix-run/react";
import { type Position } from "css-box-model";
import { useCallback, useContext, useEffect, useRef } from "react";
import type {
  BeforeCapture,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import {
  DragDropContext,
  Droppable,
  useMouseSensor,
  useTouchSensor,
} from "react-beautiful-dnd";
import { ClientOnly } from "remix-utils/client-only";
import { formEditorIntent } from "~/routes/dashboard.settings.records/forms/$formId/updateFormDefinitionSchema.ts";
import { cn } from "~/utils/shadcn.utils.ts";

import PlaceHolder from "./FormPlaceHolder.tsx";
import bindEvents from "./draggable-field/bind-event.ts";
import DraggableRowOuter from "./draggable-row/DraggableRow.tsx";
import { onDragEnd, processFormDefinition } from "./formUtils.ts";
import PropertiesToolbarOuter from "./properties-toolbar/ToolbarOuter.tsx";
import { DraggableFormContext } from "./store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "./store/draggableFormReducer.ts";
import ToolbarsOuter from "./fields-toolbar/ToolbarsOuter.tsx";
import type {
  FieldDefinition,
  FormRowDefinition,
  LoaderFormType,
} from "./types.ts";
import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type { AnyZodObject, Schema, ZodTypeAny } from "zod";

interface DraggableFormEditorProp {
  formData: LoaderFormType;
  areaFields: FieldDefinition[];
  areaCustomFields: FieldDefinition[];
  dataSchema: Schema extends ZodTypeAny ? AnyZodObject : null;
}

const DraggableFormEditor = ({
  formData,
  areaFields,
  areaCustomFields,
  dataSchema,
}: DraggableFormEditorProp) => {
  const submit = useSubmit();
  const { state, dispatch } = useContext(DraggableFormContext);
  const formRef = useRef<HTMLFormElement>(null);
  const formDefinitionInputRef = useRef<HTMLInputElement>(null);
  const clientSelectionRef = useRef<Position>({ x: 0, y: 0 });

  //Loads the form definition into the state
  useEffect(() => {
    if (formData && formData.formDefinition)
      dispatch({
        type: DraggableFormStateTypes.formDefinition,
        payload: {
          formDefinition: formData.formDefinition,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const [form] = useForm({
    id: "draggable-form-editor",
    constraint: getZodConstraint(dataSchema),

    // lastSubmission:
    //   actionData?.status === "error" ? actionData.submission : undefined,
    // shouldValidate: "onBlur",
    onValidate({ formData }) {
      const parsed = parseWithZod(formData, {
        schema: dataSchema,
      });
      if (parsed.status !== "success")
        console.log("onValidate: formData.error", parsed.error);
      return parsed;
    },
  });

  // console.log("areaFields: ", areaFields);
  // console.log("areaCustomFields: ", areaCustomFields);

  //Send changed data to our the action
  useEffect(() => {
    console.log("useEffect: ", state.formState.formModified);
    if (!state.formState.formModified) return;

    formDefinitionInputRef.current!.value =
      processFormDefinition(state.formState.formDefinition) || "";
    submit(formRef.current);

    dispatch({
      type: DraggableFormStateTypes.formModified,
      payload: {
        formModified: false,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, submit, state.formState.formModified]);

  const handleFormClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    dispatch({
      type: DraggableFormStateTypes.clearSelections,
      payload: {},
    });
  };

  function isMouseMoveEvent(event: Event): event is MouseEvent {
    return "clientX" in event;
  }

  const handleMouseMove = (event: Event) => {
    //typeGuard https://stackoverflow.com/questions/47166369/argument-of-type-e-customevent-void-is-not-assignable-to-parameter-of-ty
    if (!isMouseMoveEvent(event)) throw new Error("not a custom event");

    const current: Position = {
      x: event.clientX,
      y: event.clientY,
    };
    clientSelectionRef.current = current;
  };

  const unsubscribe = useCallback(() => {
    bindEvents(window, [
      {
        eventName: "mousemove",
        fn: handleMouseMove,
        options: { passive: true },
      },
    ]);
    // return true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    unsubscribe();
  }, [unsubscribe]);

  //  const onBeforeCapture = (before: any) => {
  //   console.log("onBeforeCapture: ", before);
  //  };

  // const onDragStart = (start: any) => {
  //   //console.log("onDragStart: ", start);
  // };

  // const onDragUpdate = (update: any) => {
  //   if (update.destination === null) return;
  //   //find destination element
  //   const objectId = `[data-rbd-droppable-id="${update.destination.droppableId}"]`;
  //   const control = document.querySelector(objectId);
  //   if (!control) return;
  //   //go through each child and set flex to
  //   // control.childNodes.forEach((child: any) => {
  //   //   if (child.nodeName === "DIV") {
  //   //     console.log("child: ", child);
  //   //     child.style.flex = "1 1 0";
  //   //   }
  //   // });
  // };

  // const onBeforeDragStart = (start: any) => {
  //   //console.log("onBeforeDragStart: ", start);
  // };

  if (!formData) return null;
  return (
    <FormProvider context={form.context}>
      <Form
        ref={formRef}
        // id="formData"
        method="POST"
        encType="multipart/form-data"
        className="w-full flex-1 flex "
        {...getFormProps(form)}
      >
        <ClientOnly>
          {() => (
            <>
              <DragDropContext
                onBeforeCapture={(before: BeforeCapture) => {
                  // console.log("onBeforeCapture: ", before);

                  window.dispatchEvent(
                    new CustomEvent("onBeforeCapture", {
                      detail: {
                        before,
                        clientSelection: clientSelectionRef.current,
                      },
                    }),
                  );

                  //get control with draggableId before.draggableId
                  const control = document.getElementById(
                    `draggable-formField-outer-${before.draggableId}`,
                  );
                  control?.setAttribute("style", "width: 100px !important;");
                  //console.log("control: ", control);
                }}
                onBeforeDragStart={(start: any) => {
                  // console.log("onBeforeDragStart: ", start);
                }}
                onDragEnd={(result: any) => {
                  onDragEnd(
                    result,
                    state,
                    dispatch,
                    areaFields,
                    areaCustomFields,
                  );
                }}
                // onDragStart={onDragStart}
                // onDragUpdate={onDragUpdate}
                enableDefaultSensors={false}
                sensors={[useMouseSensor, useTouchSensor]}
              >
                <input type="hidden" name="id" value={formData.id} />
                <input
                  type="hidden"
                  name="intent"
                  value={formEditorIntent.UPDATE}
                />
                <input
                  ref={formDefinitionInputRef}
                  type="hidden"
                  name="formDefinition"
                />
                <div className="relative flex w-full flex-row overflow-hidden">
                  <ToolbarsOuter
                    // fields={fields}
                    area={formData.area}
                    formDefinition={state.formState.formDefinition}
                    areaFields={areaFields}
                    areaCustomFields={areaCustomFields}
                  />
                  <div className="p-2 flex flex-col w-full h-full overflow-hidden">
                    <Droppable
                      droppableId="formCanvas"
                      type="DraggableRowOuter"
                      direction="vertical"
                    >
                      {(
                        provided: DroppableProvided,
                        snapshot: DroppableStateSnapshot,
                      ) => (
                        <div
                          id="draggable-form-outer"
                          onClick={handleFormClick}
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={cn(
                            "flex flex-col w-full h-full",
                            "overflow-clip",
                            "rounded-md shadow-card bg-white",
                            snapshot.isDraggingOver ? "bg-green-100" : "",
                          )}
                        >
                          <div
                            className={cn(
                              "relative flex flex-col flex-1 overflow-auto ml-3",
                              // !snapshot.isDraggingOver && "overflow-auto",
                            )}
                          >
                            <div
                              className={cn(
                                "absolute top-0 bottom-0 left-0 right-0 pr-3",
                              )}
                            >
                              {state.formState.formDefinition &&
                                state.formState.formDefinition.rows.map(
                                  (row: FormRowDefinition, index: number) => (
                                    <DraggableRowOuter
                                      id={row.id}
                                      key={row.id}
                                      sortOrder={row.sortOrder}
                                      controls={row.controls}
                                      // fields={fields}
                                      // formRef={formRef}
                                    />
                                  ),
                                )}
                            </div>
                            {provided.placeholder}
                          </div>
                          <PlaceHolder />
                        </div>
                      )}
                    </Droppable>
                  </div>
                  <PropertiesToolbarOuter />
                </div>
              </DragDropContext>
            </>
          )}
        </ClientOnly>
      </Form>
    </FormProvider>
  );
};
export default DraggableFormEditor;
