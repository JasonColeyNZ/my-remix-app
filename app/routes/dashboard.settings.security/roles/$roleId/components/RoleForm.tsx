import { Card } from "~/components/ui/card.tsx";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "~/components/ui/dialog.tsx";
import { MdOutlineErrorOutline } from "react-icons/md/index.js";
import { Input } from "~/components/ui/input.tsx";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import { Checkbox } from "~/components/ui/checkbox.tsx";
import { Label } from "~/components/ui/label.tsx";
import { useEffect, useState } from "react";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { Form, useActionData, useNavigate } from "@remix-run/react";
import CheckBoxField from "~/components/form-controls/checkbox/CheckBox";
import type { ModulePermissionType, ModuleType } from "../roleSchema";
import { roleSchema } from "../roleSchema";
import type { CheckedState } from "@radix-ui/react-checkbox";
import type { FieldName } from "@conform-to/react";
import {
  FormProvider,
  getInputProps,
  useField,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import type { action } from "../route";
import type { GetRoleType } from "~/models/role.server";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema";

const RoleForm = ({ role }: { role: GetRoleType }) => {
  const [open, setOpen] = useState(false);
  // const formRef = useRef<HTMLFormElement | null>(null);
  const [selectAll, setSelectAll] = useState<CheckedState | undefined>(
    undefined,
  );
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();

  // console.log("role: ", role);

  useEffect(() => {
    if (open) return;
    setOpen(true);
  }, [open]);

  const [form, fields] = useForm({
    id: "role-form",
    defaultValue: role,
    constraint: getZodConstraint(roleSchema),
    lastResult: actionData,
    //   // lastSubmission:
    //   //   actionData?.submission &&
    //   //   actionData?.submission.payload.intent === CompleteSignupStepIntent.COMPANY
    //   //     ? actionData?.submission
    //   //     : undefined,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: roleSchema });
    },
  });

  const modulesList = fields.modules.getFieldList();

  const handleSelectAll = (checked: CheckedState) => {
    setSelectAll(checked);
  };

  const handleCloseClick = () => {
    navigate("..");
  };

  return (
    <Dialog open={open}>
      <DialogPortal>
        <DialogOverlay className="flex items-center backdrop-blur-none overflow-hidden">
          <Card className="flex flex-col h-full my-auto mx-auto md:max-h-md xs:w-full sm:w-max-lg ">
            <div className="p-3 pt-6 flex flex-col">
              <div className="flex justify-center text-2xl text-foreground">
                Edit Role
              </div>
              <div className="flex justify-center text-sm font-light text-secondary-foreground">
                Set Role Permissions
              </div>
            </div>
            <FormProvider context={form.context}>
              <Form
                method="POST"
                id={form.id}
                className="flex h-full overflow-y-hidden"
              >
                <div className="flex flex-col flex-1 px-20 p-6">
                  <input
                    type="hidden"
                    // {...conform.input(fields["intent"])}
                    name="intent"
                    value={
                      // customDataForm
                      // ? formIdValue
                      getInputProps(fields["id"], { type: "text" })
                        .defaultValue === "new"
                        ? formViewerIntent.CREATE
                        : formViewerIntent.UPDATE
                    }
                    onChange={() => {}}
                    // hidden
                    // readOnly
                  />
                  {/* <input
                    {...getInputProps(fields.intent, { type: "hidden" })}
                  /> */}
                  <input {...getInputProps(fields.id, { type: "hidden" })} />
                  <Input
                    placeholder="Role Name"
                    {...getInputProps(fields.name, { type: "text" })}
                    className="py-6 px-4 mb-3 text-md font-light"
                    autoFocus={true}
                  />
                  <div className="py-3 text-xl text-foreground">
                    Role Permissions
                  </div>
                  <div className="flex flex-col overflow-y-auto border rounded-md overflow-hidden">
                    <div className="flex">
                      <div className="flex flex-col flex-1">
                        <div className="flex flex-1">
                          <div className="flex pl-2 gap-1 h-12 items-center text-sm text-foreground font-semibold min-w-s">
                            Administrator Access
                            <Tooltip delayDuration={200}>
                              <TooltipTrigger>
                                <MdOutlineErrorOutline />
                              </TooltipTrigger>
                              <TooltipContent>
                                Allows full access to the system
                              </TooltipContent>
                            </Tooltip>
                          </div>
                          <div className="flex flex-1 justify-between px-16">
                            <div className="flex gap-2 items-center p-2 ml-1">
                              <Checkbox
                                id="select-all"
                                checked={selectAll}
                                onCheckedChange={handleSelectAll}
                              />
                              <Label
                                htmlFor="select-all"
                                className="font-light text-base"
                              >
                                Select All
                              </Label>
                            </div>
                          </div>
                        </div>
                        <Separator />
                      </div>
                    </div>
                    {modulesList &&
                      modulesList.map((module, i) => {
                        return (
                          <RoleRow
                            key={module.id}
                            prop={module.name}
                            selectAll={selectAll}
                            last={modulesList.length === i + 1}
                          />
                        );
                      })}
                  </div>
                  <div className="flex justify-center gap-4 mt-2">
                    <Button type="submit" className="px-6 py-5">
                      Submit
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="px-6 py-5"
                      onClick={handleCloseClick}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </Form>
            </FormProvider>
          </Card>
        </DialogOverlay>
      </DialogPortal>
    </Dialog>
  );
};

export default RoleForm;

const RoleLabel = ({
  label,
  className,
}: {
  label: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "pl-2 min-w-s text-sm font-semibold text-foreground",
        className,
      )}
    >
      {label}
    </div>
  );
};

const RoleRow = ({
  prop,
  selectAll,
  last,
}: {
  prop: FieldName<ModuleType>;
  selectAll?: CheckedState;
  last: boolean;
}) => {
  const [metaModule] = useField(prop);

  const module = metaModule.getFieldset();
  const permissionsList = module.modulePermissions.getFieldList();
  // console.log("module: ", module);
  return (
    <fieldset className="flex flex-col">
      <div className="flex h-12 items-center">
        <input {...getInputProps(module.id, { type: "hidden" })} />
        <input {...getInputProps(module.name, { type: "hidden" })} />
        <RoleLabel label={module.name.initialValue || ""} />
        <div className="flex flex-1 justify-between px-16">
          <></>
          {permissionsList.map((permission) => (
            <div key={permission.key}>
              <ModulePermissions prop={permission.name} selectAll={selectAll} />
            </div>
          ))}
        </div>
      </div>
      {last ? null : <Separator />}
    </fieldset>
  );
};

const ModulePermissions = ({
  prop,
  selectAll,
}: {
  prop: FieldName<ModulePermissionType>;
  selectAll?: CheckedState;
}) => {
  const [metaPermission] = useField(prop);
  const permission = metaPermission.getFieldset();
  // console.log("permission: ", permission.rolePermissionId.initialValue);
  // permission.checked. .defaultValue = selectAll as boolean;
  // console.log("permission.checked: ", permission.checked.defaultValue);

  return (
    <div className="flex gap-2 items-center">
      <input {...getInputProps(permission.id, { type: "hidden" })} />
      <input {...getInputProps(permission.name, { type: "hidden" })} />
      <input
        {...getInputProps(permission.rolePermissionId, { type: "hidden" })}
      />
      <CheckBoxField
        labelProps={{ children: permission.name.initialValue }}
        // inputProps={{
        //   ...conform.input(permission.checked, { type: "checkbox" }),
        // }}
        hideError={false}
        labelClassName="font-light text-base"
        autoValue={selectAll as boolean}
        fieldName={"checked"}
      />
    </div>
  );
};
