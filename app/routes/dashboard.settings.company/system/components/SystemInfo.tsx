import { FormProvider, getFormProps, useForm } from "@conform-to/react";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";

import type { action, loader } from "../route.tsx";
import { dateFormats } from "./date-formats.ts";
import { updateSystemSchema } from "./updateSystemSchema.ts";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import AutoComplete from "~/components/form-controls/auto-complete-headless-ui/AutoComplete.tsx";

const SystemInfo = () => {
  const { systemInfo } = useLoaderData<typeof loader>();
  console.log("systemInfo: ", systemInfo);
  const actionData = useActionData<typeof action>();

  const currencyUnit = [
    { value: "$", label: "$" },
    { value: "€", label: "€" },
    { value: "kr", label: "kr" },
    { value: "£", label: "£" },
  ];

  const [form] = useForm({
    id: "system-info-editor",
    constraint: getZodConstraint(updateSystemSchema),
    defaultValue: systemInfo,
    lastResult: actionData,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: updateSystemSchema });
    },
    // onSubmit(event) {
    //   if (!isDirty) {
    //     event.preventDefault();
    //   }
    // },
  });

  return (
    <SettingsRightCard>
      <FormProvider context={form.context}>
        <Form
          method="POST"
          {...getFormProps(form)}
          style={{
            display: "flex",
            flex: "1 1 0",
            flexDirection: "column",
            height: "100%",
          }}
          tabIndex={-1}
          autoFocus={true}
          // style={{
          //   display: "flex",
          //   flex: "1 1 0",
          //   flexDirection: "column",
          //   height: "100%",
          // }}
        >
          <input type="hidden" name="intent" value="update-system" />
          <input type="hidden" name="entityId" value="new" />
          <div className="grid gap-3 grid-cols-2 p-4 pl-8">
            <div>
              <AutoComplete
                fieldName={"unit"}
                // inputProps={{ ...getInputProps(fields.unit, {type: ''}), autoFocus: true }}
                labelProps={{ children: "Unit" }}
                options={currencyUnit}
                // labelName="label"
                hideError={false}
              />
            </div>
            <div>
              <AutoComplete
                // inputProps={{ ...conform.input(fields.language) }}
                labelProps={{ children: "Language" }}
                fieldName="language"
                hideError={false}
                options={[{ value: "English", label: "English" }]}
                labelName="label"
              />
            </div>
            <div>
              <AutoComplete
                // inputProps={{ ...conform.input(fields.theme) }}
                labelProps={{ children: "Theme" }}
                fieldName="theme"
                hideError={false}
                options={[{ value: "Light", label: "Light" }]}
                labelName="label"
              />
            </div>
            <div></div>
            <div>
              <AutoComplete
                // inputProps={{ ...conform.input(fields.dateFormat) }}
                labelProps={{ children: "Date Format" }}
                fieldName="dateFormat"
                hideError={false}
                options={dateFormats}
                labelName="label"
              />
            </div>
            <div>
              <AutoComplete
                // inputProps={{ ...conform.input(fields.timeFormat) }}
                labelProps={{ children: "Time Format" }}
                fieldName="timeFormat"
                hideError={false}
                options={[
                  { value: "12", label: "12 Hours" },
                  { value: "24", label: "24 Hours" },
                ]}
                labelName="label"
              />
            </div>
            <div>
              {/* <Autocomplete
              options={timeZones}
              //This is important to stop errors
              sx={{ width: "400px" }}
              disableClearable={timeZone !== null}
              getOptionLabel={(option) => {
                if (!option) return "";
                return option.label;
              }}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              value={timeZone}
              onChange={(e, v) => console.log(v)}
              renderInput={(params) => (
                <TextField {...params} label={"Time Zone"} />
              )}
            /> */}
              {/* <FormControl fullWidth={true}>
            <InputLabel id="test-select-label" shrink={true}>
              Time Zone
            </InputLabel>
            <Select
              name="timeZone"
              label="Time Zone"
              size="small"
              required
              variant="outlined"
              defaultValue={"24"}
            >
              {timeZones.map((timeZone) => (
                <MenuItem key={timeZone.value} value={timeZone.value}>
                  {timeZone.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
            </div>
          </div>
        </Form>
      </FormProvider>
    </SettingsRightCard>
  );
};
export default SystemInfo;
