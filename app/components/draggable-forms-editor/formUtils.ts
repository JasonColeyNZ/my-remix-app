import type { DraggableStateSnapshot } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

import { ClientConsentFields } from "./application-areas/area-fields-client-consent.ts";
import { ClientDetailFields } from "./application-areas/area-fields-client-detail.ts";
import { ClientNoteFields } from "./application-areas/area-fields-client-note.ts";
import { ClientQuestionnaireFields } from "./application-areas/area-fields-client-quesitonnaire.ts";
import { ClientRecordFields } from "./application-areas/area-fields-client-record.ts";
import { MemberDetailFields } from "./application-areas/area-fields-member-details.ts";
import { MemberNoteFields } from "./application-areas/area-fields-member-note.ts";
import type { DraggableFormInitialStateType } from "./store/draggableFormContext.tsx";
import { DraggableFormStateTypes } from "./store/draggableFormReducer.ts";
import { toolboxControls } from "./fields-toolbar/controls.tsx";
import type {
  FieldDefinition,
  FormDefinition,
  FormFieldDefinition,
} from "./types.ts";
import { AreaType, FieldType } from "./types.ts";
import type { SavedFieldDefinition } from "./schemas/field-schema.ts";
import { savedFieldSchema } from "./schemas/field-schema.ts";
import { formToSavedSchema } from "./schemas/form-to-saved-schema.ts";
import { savedToForm } from "./schemas/saved-to-form-schema.ts";
import type { SavedFormDefinition } from "./schemas/saved-form-schema.ts";

const modifyForm = (dispatch: any, formDefinition: FormDefinition) => {
  //console.log("modifyForm: ", formDefinition);
  dispatch({
    type: DraggableFormStateTypes.formDefinition,
    payload: {
      formDefinition: formDefinition,
    },
  });
  dispatch({
    type: DraggableFormStateTypes.formModified,
    payload: {
      formModified: true,
    },
  });
};

export const onDragEnd = (
  result: any,
  state: DraggableFormInitialStateType,
  dispatch: any,
  areaFields: FieldDefinition[],
  areaCustomFields: FieldDefinition[],
) => {
  const { destination, source, type, draggableId } = result;
  if (!destination) {
    return;
  }
  //Control dropped onto the form placeholder
  // if (destination.droppableId === "placeholder") {
  //   console.log("control dropped onto the form placeholder");
  //   return;
  // }

  if (state.formState.formDefinition === null) return;
  const newForm = { ...state.formState.formDefinition };

  //Reordering Rows
  if (
    type === "DraggableRowOuter" &&
    destination.droppableId === "formCanvas" &&
    source.droppableId === "formCanvas"
  ) {
    const newRows = [...newForm.rows];
    const oldObject = newRows[source.index];
    newRows.splice(source.index, 1);
    newRows.splice(destination.index, 0, oldObject);
    newRows.forEach((row, index) => {
      row.sortOrder = index;
    });
    newForm.rows = newRows;

    modifyForm(dispatch, newForm);
    return;
  }

  //Moving from Row to Placeholder
  if (
    source.droppableId.indexOf("droppable-row-") !== -1 &&
    destination.droppableId === "placeholder"
  ) {
    //console.log("moving control from row to placeholder");
    //find row
    const row = newForm.rows.find(
      (row) => `droppable-row-${row.id}` === source.droppableId,
    );
    if (row) {
      //find control
      const control = row.controls.find(
        (control) => control.id === draggableId,
      );
      if (control) {
        //remove control from row
        row.controls = row.controls.filter(
          (control) => control.id !== draggableId,
        );
        row.controls.forEach((control, index) => {
          control.sortOrder = index;
        });

        newForm.rows.push({
          id: `droppable-row-${newForm.rows.length + 1}`,
          sortOrder: newForm.rows.length,
          controls: [{ ...control, sortOrder: 0 }],
        });

        modifyForm(dispatch, newForm);
      }
    }
  }

  //From the toolbar
  if (source.droppableId === "control-toolbar") {
    //Added from the toolbar
    //get control from the toolbar
    const control = findToolboxControl(
      areaFields,
      areaCustomFields,
      draggableId,
    );
    if (!control) return;

    //We need to add a unique id to control type fields, as these don't have a unique id
    if (
      control.field.fieldType === FieldType.PARAGRAPH ||
      control.field.fieldType === FieldType.HEADER
    ) {
      control.id = uuidv4();
      control.field.id = control.id;
    }

    if (destination.droppableId === "placeholder") {
      //add new row to form, then add control to form
      //newForm.fieldsUsed.push(control.id);
      newForm.rows.push({
        id: `droppable-row-${newForm.rows.length + 1}`,
        sortOrder: newForm.rows.length,
        controls: [{ ...control }],
      });

      modifyForm(dispatch, newForm);
      return;
    } else if (destination.droppableId.indexOf("droppable-row-") !== -1) {
      //console.log("new control dropped onto a row");
      //find row
      const row = newForm.rows.find(
        (row) => `droppable-row-${row.id}` === destination.droppableId,
      );
      //console.log("row: ", row);
      if (row) {
        const newIndex = destination.index;
        row.controls.splice(newIndex, 0, control);
        row.controls.forEach((control, index) => {
          control.sortOrder = index;
        });
        //newForm.fieldsUsed.push(control.id);
        modifyForm(dispatch, newForm);
      }
      return;
    }
  }

  //moving control
  if (
    type !== "DraggableRowOuter" &&
    destination.droppableId.indexOf("droppable-row-") !== -1 &&
    source.droppableId.indexOf("droppable-row-") !== -1
  ) {
    if (source.droppableId !== destination.droppableId) {
      //console.log("moving control from one row to another");
      //find source row
      const sourceRow = newForm.rows.find(
        (row) => `droppable-row-${row.id}` === source.droppableId,
      );
      //find destination row
      const destinationRow = newForm.rows.find(
        (row) => `droppable-row-${row.id}` === destination.droppableId,
      );
      if (sourceRow && destinationRow) {
        //find control
        const control = sourceRow.controls.find(
          (control) => control.id === draggableId,
        );
        if (control) {
          const newIndex = destination.index;

          //remove control from source row
          sourceRow.controls = sourceRow.controls.filter(
            (control) => control.id !== draggableId,
          );
          //add control to destination row
          destinationRow.controls.splice(newIndex, 0, control);
          destinationRow.controls.forEach((control, index) => {
            control.sortOrder = index;
          });
          sourceRow.controls.forEach((control, index) => {
            control.sortOrder = index;
          });
          modifyForm(dispatch, newForm);
        }
      }
    } else if (source.droppableId === destination.droppableId) {
      //console.log("moving control within the same row");
      //find row
      const row = newForm.rows.find(
        (row) => `droppable-row-${row.id}` === destination.droppableId,
      );
      if (row) {
        //find control
        const control = row.controls.find(
          (control) => control.id === draggableId,
        );
        if (control) {
          const newIndex = destination.index;
          const oldIndex = source.index;
          //remove control from source row
          row.controls.splice(oldIndex, 1);
          //add control to destination row
          row.controls.splice(newIndex, 0, control);
          //update sortOrder of all controls
          row.controls.forEach((control, index) => {
            control.sortOrder = index;
          });
          modifyForm(dispatch, newForm);
        }
      }
    }
  }

  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  )
    return;
  // if (sortedQuestions === undefined) return;
  // const newSortedQuestions = Array.from(sortedQuestions);
  // const oldObject = newSortedQuestions[source.index];
  // newSortedQuestions.splice(source.index, 1);
  // newSortedQuestions.splice(destination.index, 0, oldObject);
  // setSortedQuestions(newSortedQuestions);
};

export function updateNestedProperty(obj: any, identifier: string, value: any) {
  const keys = identifier.split(".");
  const lastKey = keys.pop();
  if (!lastKey) return obj;

  //check if value is boolean
  if (value === "true") value = true;
  if (value === "false") value = false;

  //go through the keys and look for an array identifier
  //if we find one then we need to update the array
  //otherwise we just update the object
  let arrayIndex = -1;
  let arrayKey = "";
  keys.forEach((key, index) => {
    if (key.indexOf("[") !== -1) {
      arrayIndex = index;
      arrayKey = key.replace(/\[/g, "").replace(/\]/g, "");
    }
  });

  if (arrayIndex !== -1) {
    // console.log("updateNestedProperty.arrayKey", arrayKey);
    // console.log("updateNestedProperty.arrayIndex", arrayIndex);
    // console.log("updateNestedProperty.keys", keys);
    //remove the array identifier from the keys
    keys.splice(arrayIndex, 1);

    const nestedObj = keys.reduce((acc, key) => acc[key], obj);
    // console.log("updateNestedProperty.nestedObj", nestedObj);
    if (nestedObj) nestedObj[arrayKey][lastKey] = value;

    // //console.log("updateNestedProperty.array", array);
    // const arrayItem = array[arrayKey.substring(0, arrayKey.indexOf("["))];
    // //console.log("updateNestedProperty.arrayItem", arrayItem);
    // const arrayItemIndex = arrayKey.substring(
    //   arrayKey.indexOf("[") + 1,
    //   arrayKey.indexOf("]"),
    // );
    // //console.log("updateNestedProperty.arrayItemIndex", arrayItemIndex);
    // const arrayItemKey = keys[arrayIndex + 1];
    // //console.log("updateNestedProperty.arrayItemKey", arrayItemKey);
    // if (arrayItem) {
    //   arrayItem[arrayItemIndex][arrayItemKey] = value;
    // }
    return obj;
  }

  const nestedObj = keys.reduce((acc, key) => acc[key], obj);
  // console.log("updateNestedProperty.obj", obj);
  // console.log("updateNestedProperty.keys", keys);
  // console.log("updateNestedProperty.nestedObj", nestedObj);
  // console.log("updateNestedProperty.lastKey", lastKey);
  // console.log("updateNestedProperty.value", value);
  if (nestedObj) nestedObj[lastKey] = value;
  return obj;
}

export const findToolboxControl = (
  section: FieldDefinition[],
  custom: FieldDefinition[],
  id: string,
) => {
  const sectionFields = [...section];
  const sectionCustomFields = [...custom];
  let controlArea = "";

  //needs to return a FormFieldDefinition, areaFields are FieldDefinition
  //but any control from the toolbox has colSpan and sortOrder = 0

  //Area fields
  let field = sectionFields.find((field) => field.id === id) || null;
  if (field) controlArea = field.area;

  if (!field) {
    //Custom fields
    field = sectionCustomFields.find((field) => field.id === id) || null;
    if (field) controlArea = "custom";
  }

  if (!field) {
    //controls
    const formField = toolboxControls.find((item) => item.id === id) || null;
    //console.log("findToolboxControl", formField);
    if (formField) {
      field = formField.field || null;
      controlArea = formField.field.area; // .controlSource; //TODO: is this used?
      //console.log("findToolboxControl", field);
    }
  }

  if (!field) {
    throw new Error(`Could not find control with id ${id}`);
  }

  return {
    id: field.id,
    sortOrder: 0,
    colSpan: 0,
    area: controlArea,
    // fieldType: field.type,
    field,
  } as FormFieldDefinition;
};

export type FieldLayoutOption = {
  label: string;
  value: number;
};

export const fieldLayoutOptions: FieldLayoutOption[] = [
  {
    label: "Auto",
    value: 0,
  },
  {
    label: "10",
    value: 10,
  },
  {
    label: "20",
    value: 20,
  },
  {
    label: "30",
    value: 30,
  },
  {
    label: "40",
    value: 40,
  },
  {
    label: "50",
    value: 50,
  },
  {
    label: "60",
    value: 60,
  },
  {
    label: "70",
    value: 70,
  },
  {
    label: "80",
    value: 80,
  },
  {
    label: "90",
    value: 90,
  },
  {
    label: "100",
    value: 100,
  },
];

export const getAreaFields = (area: string) => {
  switch (area) {
    case AreaType.CLIENT_RECORD:
      return ClientRecordFields;
    case AreaType.CLIENT_NOTE:
      return ClientNoteFields;
    case AreaType.CLIENT_DETAIL:
      return ClientDetailFields;
    case AreaType.CLIENT_CONSENT:
      return ClientConsentFields;
    case AreaType.CLIENT_QUESTIONNAIRE:
      return ClientQuestionnaireFields;
    case AreaType.MEMBER_DETAIL:
      return MemberDetailFields;
    case AreaType.MEMBER_NOTE:
      return MemberNoteFields;
    default:
      return [];
  }
};

export const processFieldDefinition = (
  fieldDefinition: FieldDefinition | null | undefined,
) => {
  console.log("processFieldDefinition", fieldDefinition);
  try {
    if (!fieldDefinition) {
      console.error("processFieldDefinition: No Field Definition passed");
      return null;
    }

    const newFieldDef = savedFieldSchema.safeParse(fieldDefinition);
    if (!newFieldDef.success) {
      console.error(
        "processFieldDefinition: Error Parsing Field",
        newFieldDef.error,
      );
      return null;
    }
    return JSON.stringify(newFieldDef.data);
  } catch (error) {
    console.error("processFieldDefinition: Error during parse of Field", error);
    return null;
  }
};

export const processFormDefinition = (
  formDefinition: FormDefinition | null | undefined,
) => {
  console.log("processFormDefinition", formDefinition);

  try {
    if (!formDefinition) {
      console.error("processFormDefinition: No Form Definition passed");
      return null;
    }

    const newFormDef = formToSavedSchema.safeParse(formDefinition);
    if (!newFormDef.success) {
      console.error(
        "processFormDefinition: Error parsing Form",
        newFormDef.error,
      );
      return null;
    }
    return JSON.stringify(newFormDef.data);

    // const rowData = formDefinition.rows.map((row) => {
    //   const rowControls = row.controls.map((control: FormFieldDefinition) => {
    //     //console.log("processFormDefinition");
    //     return {
    //       id: control.id,
    //       sortOrder: control.sortOrder,
    //       colSpan: control.colSpan,
    //       // fieldType: control.fieldType,
    //       // controlSource: control.controlSource,
    //       label: control.field.label,
    //       controlType: control.field.controlType,
    //       validation: control.field.validation,
    //       text: control.field.text,
    //       // shortLabel: control.field.shortLabel,
    //       // description: control.field.description,
    //       // area: control.field.area,
    //       // type: control.field.type,
    //     };
    //   });
    //   return {
    //     sortOrder: row.sortOrder,
    //     controls: rowControls,
    //   };
    // });
    // return JSON.stringify({
    //   rows: rowData,
    // });
  } catch (error) {
    console.error("processFormDefinition: Error during parse of Form", error);
    return null;
  }
};

export type formDataObject = { [key: string]: any };

export const getWorkingFormDefinitionFromSaved = (
  formDefinition: SavedFormDefinition,
  areaFields: FieldDefinition[],
  areaCustomFields: SavedFieldDefinition[],
  formId: string,
  area: AreaType,
) => {
  // console.log("getWorkingFormDefinitionFromSaved", formDefinition);
  // console.log(
  //   "getWorkingFormDefinitionFromSaved.formDefinition",
  //   formDefinition,
  // );
  // if (typeof formDefinition === 'string') {
  //   formDefinition = JSON.parse(formDefinition);
  // }

  if (!formDefinition || !formDefinition.rows)
    return {
      id: "",
      area: AreaType.CLIENT_DETAIL,
      name: "",
      rows: [],
      usedFormFields: {},
    };
  // const formFieldData: formDataObject = {};
  // console.log("getWorkingFormDefinitionFromSaved", formDefinition.rows);
  // const parsedFormDefinition =
  const newFormDef = savedToForm(formId, area).safeParse(formDefinition);

  if (!newFormDef.success) {
    console.error(
      "getWorkingFormDefinitionFromSaved: Error parsing Form",
      newFormDef.error,
    );
    return null;
  }
  return newFormDef.data;

  // const rowData = formDefinition.rows.reduce<FormRowDefinition[]>(
  //   (rcc, row, index) => {
  //     // console.log("getWorkingFormDefinitionFromSaved-index: ", index);
  //     const rowControls = row.controls.reduce<FormFieldDefinition[]>(
  //       (ccc, control) => {
  //         // console.log("getWorkingFormDefinitionFromSaved", control);

  //         const toolboxField = staticToolboxControls.find(
  //           (field) => control.fieldType === field.field.fieldType,
  //         );
  //         // console.log("getWorkingFormDefinitionFromSaved", toolboxField);
  //         if (toolboxField) {
  //           toolboxField.id = control.id;
  //           if (toolboxField.field) {
  //             toolboxField.field.id = control.id;
  //             toolboxField.field.label = control.label || ""; //    : toolboxField.field.label;
  //             toolboxField.field.controlType = control.controlType;
  //             toolboxField.field.autoFocus = shouldFocusInput(
  //               control.fieldType,
  //             );
  //             toolboxField.field.text = control.text;
  //           }
  //           return [
  //             ...ccc,
  //             {
  //               ...toolboxField,
  //               field: { ...toolboxField.field } as FieldDefinition,
  //             },
  //           ];
  //         }

  //         const areaField = areaFields.find((field) => field.id === control.id);
  //         if (areaField) {
  //           // console.log("getWorkingFormDefinitionFromSaved", control);
  //           return [
  //             ...ccc,
  //             {
  //               id: areaField.id,
  //               sortOrder: 0, //control.sortOrder,
  //               colSpan: control.colSpan,
  //               // controlSource: control.controlSource,
  //               // fieldType: areaField.type,
  //               field: {
  //                 ...areaField,
  //                 controlType: control.controlType,
  //                 text: control.text,
  //                 autoFocus: shouldFocusInput(areaField.fieldType),
  //                 validation: {
  //                   ...areaField.validation,
  //                   ...control.validation,
  //                 },
  //               },
  //             } as FormFieldDefinition,
  //           ];
  //         }
  //         const areaCustomField = areaCustomFields.find(
  //           (field) => field.id === control.id,
  //         );
  //         if (areaCustomField) {
  //           // if (control.controlSource === "custom") {
  //           //   formFieldData[areaCustomField.id] = "";
  //           // }
  //           //console.log("getWorkingFormDefinitionFromSaved", areaCustomField);
  //           const toolBoxControl = toolboxControls.find(
  //             (control) => control.field.fieldType === areaCustomField.type,
  //           );
  //           return [
  //             ...ccc,
  //             {
  //               id: areaCustomField.id,
  //               sortOrder: 0, //control.sortOrder,
  //               colSpan: control.colSpan,
  //               // controlSource: control.controlSource,
  //               // fieldType: areaCustomField.type,
  //               field: {
  //                 ...areaCustomField,
  //                 autoFocus: shouldFocusInput(areaCustomField.type),
  //                 fieldType: areaCustomField.type,
  //               },
  //               icon:
  //                 toolBoxControl && toolBoxControl.icon
  //                   ? toolBoxControl.icon
  //                   : "",
  //             } as FormFieldDefinition,
  //           ];
  //         }
  //         return ccc;
  //       },
  //       [],
  //     );
  //     return [
  //       ...rcc,
  //       {
  //         ...row,
  //         controls: rowControls,
  //         id: index + 1 + "",
  //         sortOrder: row.sortOrder,
  //       } as unknown as FormRowDefinition,
  //     ];
  //   },
  //   [],
  // );
  // //console.log("getWorkingFormDefinitionFromSaved", rowData[0].controls);
  // //console.log("getWorkingFormDefinitionFromSaved", rowData[1].controls);
  // //console.log("getWorkingFormDefinitionFromSaved", rowData[2].controls);
  // return {
  //   ...formDefinition,
  //   rows: rowData,
  //   usedFormFields: {},
  //   id: formId,

  //   area,
  //   // name: "",
  // } as unknown as FormDefinition;
};

export const getColSpan = (
  controls: FormFieldDefinition[],
  formField: FormFieldDefinition,
  snapshot?: DraggableStateSnapshot | null,
  style: boolean = true,
  draggingOverParent: boolean = false,
  //provided: DraggableProvided,
): string => {
  function returnFlex(width: number) {
    if (width < 0) width = 10;

    // console.log("getColSpan.returnFlex", width);
    //subtract 20% total from controls based on controls count
    let controlSubtract = 0;
    if (draggingOverParent) {
      const controlsCount = controls ? controls.length : 1;
      controlSubtract = Math.trunc(35 / controlsCount);
    }
    // console.log("controlSubtract", width, controlSubtract);

    //truncate to 0 decimal places
    width = Math.trunc(width - controlSubtract);

    return style ? "0 0 " + width + "%" : `flex-${width}`;
  }
  if (snapshot && snapshot.isDragging) {
    //   // console.log("getColSpan", formField.id, snapshot);
    //   //   //   //we are being dragged over, so allow space for the new control
    return style ? "0 0 100px" : "flex-[0_0_100px]";
  }
  // return null;
  //if (formField.id === "firstName") console.log("getColSpan.snapsot", snapshot);

  if (formField.colSpan + "" !== "0") return returnFlex(formField.colSpan);

  //only field then use full width
  if (!controls || (controls && controls.length === 1)) {
    // console.log("getColSpan:100%", formField.id);
    // console.log(returnFlex(100));
    return returnFlex(100);
  }

  //find total colSpan used by other controls
  const totalColSpan = controls
    ? controls
        .filter((control) => control.id !== formField.id)
        .reduce((total, control) => total + Number(control.colSpan), 0)
    : 0;
  // console.log("totalColSpan: ", formField.id, totalColSpan);

  const totalColsWithAuto = controls
    ? controls.filter((control) => control.colSpan === 0).length
    : 0;

  // console.log("totalColsWithAuto: ", formField.id, totalColsWithAuto);

  //if totalColSpan is less than 10 then use remaining space divided by other autos
  if (totalColSpan < 100) {
    if (totalColsWithAuto === 0) return returnFlex(100);

    if (totalColSpan === 0 && totalColsWithAuto === controls.length)
      return "flex-auto";
    // console.log(
    //   "totalColSpan < 100",
    //   totalColsWithAuto,
    //   totalColSpan,
    //   returnFlex(((10 - totalColSpan / 10) / totalColsWithAuto) * 10),
    // );

    return returnFlex(((10 - totalColSpan / 10) / totalColsWithAuto) * 10);
  } else {
    //if totalColSpan is greater than 10 then use remaining space
    //show warning?
    return returnFlex(((10 - totalColSpan / 10) / totalColsWithAuto) * 10);
  }
};
