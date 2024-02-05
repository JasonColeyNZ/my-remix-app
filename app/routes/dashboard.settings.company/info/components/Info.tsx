import { useLoaderData } from "@remix-run/react";
import { useMemo } from "react";
import FormViewerWithFetcher from "~/components/form-viewer/FormViewerWithFetcher.tsx";

import { entitySchema } from "../entitySchema.ts";
import { companyInfoFormDefinition } from "./company-info-form-definition.ts";
import type { loader } from "../route.tsx";

const Info = () => {
  const { entity } = useLoaderData<typeof loader>();
  const formDefinition = useMemo(() => {
    return companyInfoFormDefinition();
  }, []);

  return (
    <>
      <FormViewerWithFetcher
        title=""
        buttonsTop={false}
        formDefinition={formDefinition}
        dataSchema={entitySchema}
        defaultValues={entity}
        actionUrl={""}
        objectName="Company"
      />
    </>
  );
};
export default Info;
