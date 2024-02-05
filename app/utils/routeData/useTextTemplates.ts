import type { TextTemplateItemsType } from "~/models/textTemplate.server.ts";
import { useMatchesData } from "./route-matches";

function isTextTemplate(
  textTemplates: any,
): textTemplates is TextTemplateItemsType {
  return textTemplates && Array.isArray(textTemplates);
}

export function useOptionalTextTemplates(): TextTemplateItemsType | null {
  let result = null;
  // let data = useMatchesData<{ textTemplates: RecordItemsType }>(
  //   "routes/dashboard.textTemplates"
  // );
  // if (data && isTextTemplate(data.textTemplates)) {
  //   result = data.textTemplates;
  // }
  const data = useMatchesData<{ textTemplates: TextTemplateItemsType }>(
    "routes/dashboard.client.$clientId.textTemplates",
  );
  if (data && isTextTemplate(data.textTemplates)) {
    result = data.textTemplates;
  }

  return result;
}

export function useTextTemplates(): TextTemplateItemsType | null {
  const maybeClient = useOptionalTextTemplates();
  //  if (!maybeClient) {
  //    throw new Error(
  //      "No Text Templates found in loaders, but Text Templates is required by useClient"
  //    );
  //  }
  return maybeClient;
}
