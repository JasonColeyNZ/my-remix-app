import { useEffect, useState } from "react";
import { cn } from "~/utils/shadcn.utils.ts";

import {
  FieldType,
  type FieldDefinition,
  type FormDefinition,
  type FormFieldDefinition,
} from "../types.ts";
import ControlToolbar from "./ControlToolbar.tsx";
import { toolboxControls } from "./controls.tsx";

interface ToolbarsOuterProps {
  area: string;
  formDefinition: FormDefinition | null;
  areaFields: FieldDefinition[];
  areaCustomFields: FieldDefinition[];
}

const ToolbarsOuter = ({
  area,
  formDefinition,
  areaFields,
  areaCustomFields,
}: ToolbarsOuterProps) => {
  const [toolbarSectionFields, setToolbarSectionFields] = useState<
    FormFieldDefinition[]
  >([]);
  const [toolbarCustomFields, setToolbarCustomFields] = useState<
    FormFieldDefinition[]
  >([]);

  useEffect(() => {
    const fieldsUsed =
      (formDefinition &&
        formDefinition.rows.reduce(
          (acc: string[], row) => [
            ...acc,
            ...row.controls.map((control) => control.id),
          ],
          [],
        )) ||
      [];

    //console.log("useEffect, formDefinition.fieldsUsed: ", form.fieldsUsed);
    const toolbarSectionFields = areaFields.reduce(
      (acc: FormFieldDefinition[], field: FieldDefinition) => {
        if (!fieldsUsed.includes(field.id)) {
          acc.push({
            id: field.id,
            sortOrder: 0,
            colSpan: 0,
            field: { ...field },
          });
        }
        return acc;
      },
      [],
    );
    // console.log("areaCustomFields: ", areaCustomFields);
    const toolbarCustomFields = areaCustomFields.reduce(
      (acc: FormFieldDefinition[], field: FieldDefinition) => {
        if (!fieldsUsed.includes(field.id)) {
          const toolBoxControl = toolboxControls.find(
            (control) => control.field.fieldType === field.fieldType,
          );

          acc.push({
            id: field.id,
            sortOrder: 0,
            colSpan: 0,
            field: { ...field },
            icon:
              toolBoxControl && toolBoxControl.icon
                ? toolBoxControl.icon
                : FieldType.NULL,
          });
        }
        return acc;
      },
      [],
    );

    //console.log("toolbarSectionFields: ", toolbarSectionFields);
    //console.log("toolbarCustomFields: ", toolbarCustomFields);

    setToolbarSectionFields(toolbarSectionFields);
    setToolbarCustomFields(toolbarCustomFields);
  }, [formDefinition, areaFields, areaCustomFields]);

  return (
    <div
      className={cn(
        "flex flex-[0_0_220px] xl:flex-[0_0_300px] h-full p-2",
        "overflow-y-auto overflow-x-hidden",
      )}
      id="toolbar-outer"
    >
      <div className="flex flex-col w-full bg-white rounded-md shadow-card p-2">
        <ControlToolbar
          // fields={fields}
          area={area}
          sectionFields={toolbarSectionFields}
          customFields={toolbarCustomFields}
        />
      </div>
    </div>
  );
};
export default ToolbarsOuter;
