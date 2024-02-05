import {
  Form,
  useActionData,
  useLoaderData,
  // useSubmit,
  useRouteLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";

import type { action, loader } from "../route.tsx";
import type { loader as servicesLoader } from "../../route.tsx";
import { createServiceSchema, updateServiceSchema } from "../serviceSchema.ts";
import ServiceBadge from "~/components/ui/service-badge.tsx";
import {
  FormProvider,
  getFormProps,
  getInputProps,
  getSelectProps,
  useForm,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import FormHeader from "~/components/form-header/FormHeader.tsx";
import { Button } from "~/components/ui/button.tsx";
// import ServiceAddon from "~/components/form-controls/service-addon/ServiceAddon.tsx";
import { cn } from "~/utils/shadcn.utils.ts";
import ProductSelectList from "~/components/form-controls/products-on-service-select/ProductSelectList.tsx";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import TextInput from "~/components/form-controls/text-input/TextInput.tsx";
import AutoComplete from "~/components/form-controls/auto-complete-headless-ui/AutoComplete.tsx";
import ColorPicker from "~/components/form-controls/color-picker/ColorPicker.tsx";
import TimeitSelect from "~/components/form-controls/timeit-select/TimeitSelect.tsx";
import ComboBox from "~/components/form-controls/combobox/ComboBox.tsx";
// import ServiceMembers from "~/components/form-controls/service-members/ServiceMembers.tsx";
import ErrorList from "~/components/form-controls/ErrorList.tsx";
import ServiceAddon from "~/components/form-controls/service-addon/ServiceAddon.tsx";

enum ServiceTabs {
  SERVICE = "Service",
  MEMBERS = "Members",
  Addon = "Addon",
}

const ServiceForm = () => {
  const [activeTab, setActiveTab] = useState<ServiceTabs>(ServiceTabs.SERVICE);
  const lastResult = useActionData<typeof action>();
  // const submit = useSubmit();
  const [saving, setSaving] = useState(false);
  const categoriesAndServices = useRouteLoaderData<typeof servicesLoader>(
    "routes/dashboard.settings.services/services/route",
  );
  //console.log("ServiceForm: Render");
  const {
    service,
    categories,
    // users,
    products,
    locations,
    consents,
    concurrent,
  } = useLoaderData<typeof loader>();
  // console.log("concurrent: ", concurrent);

  // const formRef = useRef<HTMLFormElement | null>(null);
  // console.log(
  //   getFieldsetConstraint(
  //     service.id === "new" ? createServiceSchema : updateServiceSchema,
  //   ),
  // );
  const [form, fields] = useForm({
    id: "services-form",
    // ref: formRef,
    defaultValue: service,
    lastResult: lastResult,
    constraint: getZodConstraint(
      service.id === "new" ? createServiceSchema : updateServiceSchema,
    ),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    // onSubmit: (event, { formData }) => {
    //   if (formData.get('intent') === formViewerIntent.VALIDATE) {
    //     event.preventDefault();
    //     return;
    //   }
    // },
    onValidate({ formData }) {
      // console.log("onValidate: formData", formData);
      const parsed = parseWithZod(formData, {
        schema:
          service.id === "new" ? createServiceSchema : updateServiceSchema,
      });

      if (parsed.status === "error")
        console.log("onValidate: formData.error", parsed.error);
      return parsed;
    },
  });

  //This will reset the form when the defaultValue changes
  //added 30/1/24 to fix issue with ProductList not updating on Service form
  useEffect(() => {
    form.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service]);

  useEffect(() => {
    console.log(form.errors);
  }, [form.errors]);

  // const onSaveClick = useCallback(async () => {
  //   // console.log("onSaveClick event");
  //   // console.log("onSaveClick: intentRef.current", intentRef.current);
  //   // if (intentRef.current === null) return;
  //   // intentRef.current.click();
  //   // //if ok get formData and send back to caller via onSave
  //   // if (form.ref.current === null) return;
  //   if (form.valid) {
  //     // submit(form.)
  //     console.log("onSaveClick: form.valid", form.valid);
  //   }
  //   // form.validate();
  //   // const formData = new FormData(form.ref.current);
  //   // const parsed = parse(formData, { schema: dataSchema });
  //   // if (Object.keys(parsed.error).length > 0) {
  //   //   setSaving(false);
  //   //   return;
  //   // }

  //   // // console.log("onSaveClick: formData", formData);
  //   // // if (!skipPost) {
  //   //   formFetcher.submit(formData, {
  //   //     method: "POST",
  //   //     action: actionUrl,
  //   //   });
  //   // } else {
  //   //   onSuccess && onSuccess(formData);
  //   //   setSaving(false);
  //   // }
  //   // onSave && onSave(formData);
  // }, []);

  const onAddClick = () => {
    //console.log("onAddClick: ");
    // dispatch({ type: NavigationTypes.ADD_CATEGORY });
  };

  return (
    <SettingsRightCard>
      <FormProvider context={form.context}>
        <Form
          method="POST"
          {...getFormProps(form)}
          // id={form.id}
          // ref={formRef}
          className="flex h-full overflow-y-hidden"
        >
          <input
            type="hidden"
            // {...conform.input(fields["intent"])}
            name="intent"
            value={
              service.id === "new"
                ? formViewerIntent.CREATE
                : formViewerIntent.UPDATE
            }
            onChange={() => {}}
            // hidden
            // readOnly
          />
          <input {...getInputProps(fields.id, { type: "hidden" })} />
          <div className="flex w-full flex-col overflow-hidden">
            <FormHeader
              id={service.id}
              // formId={form.id}
              showButtons={true}
              title={null}
              subTitle={
                <div className="flex gap-2">
                  {Object.values(ServiceTabs).map((tab) => (
                    <Button
                      key={tab}
                      type="button"
                      variant={activeTab === tab ? "default" : "link"}
                      className={`border-none font-normal normal-case cursor-pointer hover:no-underline hover:bg-primary-3 hover:text-primary-6
                    ${activeTab === tab ? "" : "text-foreground"}
                    `}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </Button>
                  ))}
                </div>
              }
              // backButtonLabel={backButtonLabel}
              onAddClick={onAddClick}
              // onSaveClick={onSaveClick}
              // onBackClick={onBackClick}
              objectName={"Service"}
              saving={saving}
              setSaving={setSaving}
              // id={defaultValues?.id}
            />
            <div className="flex flex-1 flex-col w-full p-8 pt-2">
              <div
                className={cn(
                  activeTab === ServiceTabs.SERVICE ? "block" : "hidden",
                )}
              >
                <div className="flex text-xs justify-end items-center pb-2">
                  <span className="mr-2">Save changes to see preview:</span>
                  <ServiceBadge
                    key={service.name}
                    name={service.name}
                    color={
                      service.color ? service.color : service.category.color
                    }
                    textColor={
                      service.textColor
                        ? service.textColor
                        : service.category.textColor
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <div className="basis-2/6">
                    <TextInput
                      labelProps={{ children: "Name" }}
                      fieldName={"name"}
                    />
                  </div>
                  <div className="basis-2/6">
                    <AutoComplete
                      options={categories}
                      labelProps={{ children: "Category" }}
                      fieldName={"categoryId"}
                      // inputProps={getAutoCompleteProps(fields.categoryId)}
                      // errors={fields.categoryId.errors}
                      hideError={false}
                    />
                  </div>
                  <div className="basis-1/6">
                    <ColorPicker
                      labelClassName="text-xs"
                      labelProps={{ children: "Color" }}
                      fieldName={"color"}
                    />
                  </div>
                  <div className="basis-1/6">
                    <ColorPicker
                      labelClassName="text-xs"
                      labelProps={{ children: "Text Color" }}
                      fieldName={"textColor"}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="basis-1/6">
                    <TextInput
                      labelProps={{ children: "Price" }}
                      fieldName={"price"}
                      // inputProps={getInputProps(fields.price, { type: "text" })}
                    />
                  </div>
                  <div className="basis-1/6">
                    <TimeitSelect
                      labelProps={{ children: "Duration" }}
                      fieldName={"duration"}
                    />
                  </div>
                  <div className="basis-1/6">
                    <TimeitSelect
                      labelProps={{ children: "Time Margin" }}
                      fieldName={"timeMargin"}
                    />
                  </div>
                  <div className="basis-1/6">
                    <AutoComplete
                      labelClassName="text-xs"
                      options={concurrent}
                      labelProps={{ children: "Max. bookings" }}
                      fieldName={"maximumConcurrentBookings"}
                      // inputProps={getAutoCompleteProps(
                      //   fields.maximumConcurrentBookings,
                      // )}
                      hideError={false}
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="basis-1/2">
                    <ComboBox
                      options={locations}
                      labelProps={{ children: "Locations" }}
                      inputProps={{
                        ...getSelectProps(fields.locations),
                      }}
                    />
                  </div>
                  <div className="basis-1/2">
                    <ComboBox
                      options={consents}
                      labelProps={{ children: "Consents" }}
                      inputProps={{ ...getSelectProps(fields.consents) }}
                    />
                  </div>
                </div>
                <div className="flex gap-2"></div>
                <ProductSelectList
                  options={products}
                  // prop={fields.products.name}
                  labelProps={{ children: "Products Used" }}
                  descriptionProps={{
                    children: `Select products used for this service.
              This will be used to track inventory usage for this service.`,
                  }}
                  fieldName={"products"}
                />
              </div>
              <div
                className={cn(
                  activeTab === ServiceTabs.MEMBERS ? "block" : "hidden",
                )}
              >
                {/* <ServiceMembers
                  // formRef={form.ref}
                  // prop={fields.users}
                  options={users}
                  // options={categoriesAndServices?.categories || []}
                  labelProps={{ children: "Service Members" }}
                  descriptionProps={{
                    children: `Select the service members who can perform this service.`,
                  }}
                /> */}
              </div>

              <div
                className={cn(
                  activeTab === ServiceTabs.Addon ? "block" : "hidden",
                )}
              >
                <ServiceAddon
                  fieldName={"addon"}
                  // formRef={form.ref}
                  // form={form}
                  // prop={fields.addon}
                  // options={undefined}
                  options={categoriesAndServices?.categories || []}
                  labelProps={{ children: "Addon Options" }}
                  descriptionProps={{
                    children: `Specify price and duration and linked services when used as an addon.`,
                  }}
                />
              </div>
            </div>
          </div>
        </Form>
        <ErrorList errors={form.errors} />
      </FormProvider>

      {/* <FormViewerWithFetcher
        title="MedSpa Service"
        topSummary={
          <div className="flex text-xs justify-center items-center">
            <span className="mr-2">Save changes to see preview:</span>
            <ServiceBadge
              key={service.name}
              name={service.name}
              color={service.color ? service.color : service.category.color}
              textColor={
                service.textColor
                  ? service.textColor
                  : service.category.textColor
              }
            />
          </div>
        }
        objectName="Service"
        dataSchema={
          service.id === "new" ? createServiceSchema : updateServiceSchema
        }
        buttonsTop={true}
        actionUrl={`../${service?.id}`}
        onAddClick={onAddClick}
        formDefinition={formDefinition}
        defaultValues={service}
      /> */}
    </SettingsRightCard>
  );
};
export default ServiceForm;
