import { FormProvider, useForm } from "@conform-to/react";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import { locationSchema } from "../locationSchema.ts";
import type { action, loader } from "../route.tsx";
import { locationFormDefinition } from "./location-form-definition.ts";
import FormViewer from "~/components/form-viewer/FormViewer.tsx";
import SettingsRightCard from "~/layouts/section-layouts/SettingsRightCard.tsx";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

const LocationDetails = () => {
  const { location } = useLoaderData<typeof loader>();
  const fetcher = useFetcher<typeof action>();
  //console.log("location: ", location);

  const formDefinition = useMemo(() => {
    return locationFormDefinition();
  }, []);

  const [form] = useForm({
    id: "location-detail-editor",
    constraint: getZodConstraint(locationSchema),
    defaultValue: location,
    lastResult: fetcher.data,
    onValidate({ formData }) {
      const parsed = parseWithZod(formData, { schema: locationSchema });
      if (parsed.status !== "success")
        console.log("onValidate: formData.error", parsed.error);
      return parsed;
    },
  });

  return (
    <SettingsRightCard>
      <FormProvider context={form.context}>
        <FormViewer
          title="Location Details"
          fetcher={fetcher}
          buttonsTop={true}
          // fields={fields}
          formDefinition={formDefinition}
          dataSchema={locationSchema}
        />
      </FormProvider>
    </SettingsRightCard>
  );
};
export default LocationDetails;
