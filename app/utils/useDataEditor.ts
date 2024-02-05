import { useForm } from "@conform-to/react";
// import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";
import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";

import type { FormDefinition } from "./../components/draggable-forms-editor/types.ts";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

type LoaderType = {
  data: any;
  formDefinition: FormDefinition;
  state: string;
};

type ActionType = {
  status: number | string;
  submission: any;
  data: any;
};

export function useDataEditor<T>(
  dataId: string | undefined,
  url: string,
  setShowEditor: (show: boolean) => void,
  onSuccess?: (data: T) => void,
): {
  data: T | null;
  form: any;
  fields: any;
  formDefinition: any;
  onSave: (formData: FormData) => Promise<void>;
  onBackClick: () => void;
  dataSubmitFetcher: any;
} {
  const dataLoadFetcher = useFetcher<LoaderType>();
  const dataSubmitFetcher = useFetcher<ActionType>();

  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [formDefinition, setFormDefinition] = useState<any>(null);

  //load from fetcher on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (dataId === undefined) return;
    if (dataLoaded) return;
    if (dataLoadFetcher.state !== "idle") return;
    dataLoadFetcher.submit(
      { query: dataId ?? "" },
      {
        method: "get",
        action: url,
      },
    );
    setDataLoaded(true);
  });

  useEffect(() => {
    if (!dataLoadFetcher.data) return;
    if (dataLoadFetcher.data.data) {
      setData(dataLoadFetcher.data.data);
      setFormDefinition(dataLoadFetcher.data.formDefinition);
    }
  }, [dataLoadFetcher]);

  //close the form after successful submit
  useEffect(() => {
    if (!dataSubmitFetcher.data) return;
    if (
      dataSubmitFetcher.state === "idle" &&
      dataSubmitFetcher.data.status === 200
    ) {
      onSuccess && onSuccess(dataSubmitFetcher.data.data);
      setData(dataSubmitFetcher.data.data);
      setShowEditor(false);
    }
  }, [dataSubmitFetcher, onSuccess, setShowEditor]);

  const [form, fields] = useForm({
    constraint: getZodConstraint(formViewerSchema(formDefinition)),
    defaultValue: data ?? undefined,
    lastSubmission: dataSubmitFetcher.data,
    // dataSubmitFetcher.data?.status === "error"
    //   ? dataSubmitFetcher.data.submission
    //   : undefined,
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      const parsed = parseWithZod(formData, {
        schema: formViewerSchema(formDefinition),
      });
      if (parsed.status !== "success")
        console.log("onValidate: formData.error", parsed.error);
      return parsed;
    },
  });

  const onSave = async (formData: FormData) => {
    //we need to send data via a fetcher! otherwise a redirect happens
    console.log("useDataEditor.onSave: formData", formData, url);

    dataSubmitFetcher.submit(formData, {
      method: "post",
      action: url,
      encType: "multipart/form-data",
    });
  };

  const onBackClick = () => {
    setData(null);
    setShowEditor(false);
  };

  return {
    data,
    form,
    fields,
    formDefinition,
    onSave,
    onBackClick,
    dataSubmitFetcher,
  };
}
