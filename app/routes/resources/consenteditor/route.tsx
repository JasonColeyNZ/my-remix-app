import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
import { format } from "date-fns";
import FormViewer from "~/components/form-viewer/FormViewer";
import { formViewerSchema } from "~/components/form-viewer/formViewerSchema.ts";
// import SignatureModal from "~/components/signature-modal/SignatureModal.tsx";
import { Card } from "~/components/ui/card.tsx";
import {
  Dialog,
  DialogOverlay,
  DialogPortal,
} from "~/components/ui/dialog.tsx";
// import { useRHF } from "~/hooks/useRHF";
import type { ConsentType } from "~/models/clientconsent.server.ts";
import {
  getClientConsentById,
  processConsentFormData, // signClientConsent,
} from "~/models/clientconsent.server.ts";
import { getProcessedFormDefinitionById } from "~/models/form.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";
import { useDataEditor } from "~/utils/useDataEditor.ts";

// import { addSignatureValidator } from "./addSignatureValidator.ts";

// export async function action({ request, params }: ActionFunctionArgs) {
//   // if the user isn't authenticated, this will redirect to login
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   const consentId = params.consentId;
//   invariantResponse(consentId, "consentId is required");

//   let formData = await request.formData();

//   switch (formData.get("intent")) {
//     case "signature": {
//       // const result = await withZod(addSignatureValidator).validate(formData);

//       // if (result.error) {
//       //   console.log("result.error: ", result.error);
//       //   return json({
//       //     error: validationError(result.error),
//       //     formId: "consent-form",
//       //   });
//       // }
//       // const data = { ...result.data };
//       //console.log(data);
//       // const consent = await signClientConsent(data, sbUser);
//       // if (!consent)
//       return json({
//         status: 404,
//         data: null,
//         error: "Consent not signed",
//       });
//       // return json({ status: 200, data: consent });
//       // const session = await getSession(request);
//       // session.set("NEW_CONSENT", newConsent.id);
//     }
//   }
// }

export async function loader({ request, params }: LoaderFunctionArgs) {
  console.log("consenteditor:loader ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const url = new URL(request.url);
  const query = url.searchParams.get("query");

  const consentId = query;

  invariantResponse(consentId, "consentId is required");
  const [rawConsent] = await Promise.all([
    getClientConsentById({ id: consentId }, sbUser),
    // getAreaDefaultForm({ area: "ClientConsent" }, sbUser),
  ]);

  invariantResponse(rawConsent, "consent is required");

  if (!rawConsent)
    throw new Response("Consent not found", {
      status: 404,
    });

  // if (rawConsent.formId === "") {
  //   rawConsent.formId = form.id;
  // }
  const formDefinition = await getProcessedFormDefinitionById(
    {
      id: rawConsent.formId,
      form: rawConsent.form,
    },
    sbUser,
  );

  const { consent } = await processConsentFormData(
    rawConsent,
    formDefinition,
    sbUser,
  );

  return json({
    status: "ok",
    data: consent,
    formDefinition,
  });
}

const ConsentEditor = ({
  consentId,
  clientId,
  setShowEditor,
}: {
  consentId: string | undefined;
  clientId: string | undefined;
  setShowEditor: (show: boolean) => void;
}) => {
  // const [signature, setSignature] = useState<any>(null);

  const {
    form,
    fields,
    formDefinition,
    data: consent,
    onSave,
    onBackClick,
    dataSubmitFetcher,
  } = useDataEditor<ConsentType>(
    consentId,
    "/resources/consenteditor",
    setShowEditor,
  );
  if (!consent) return null;
  console.log("consent: ", consent);
  //console.log("consent: ", consent);

  // useEffect(() => {
  //   if (signature && !consent.signedDateTime) {
  //     setValue("signature", signature);

  //     console.log("signature updated");
  //     submitForm();

  //     setSignature(null);
  //   }
  // }, [consent.signedDateTime, setValue, signature, submitForm]);

  return (
    <>
      {/* <SignatureModal
        title="Sign Letter of Consent"
        saveData={signature}
        setSaveData={setSignature}
      /> */}

      <Dialog open={true}>
        <DialogPortal>
          <DialogOverlay className="flex items-center bg-gray-500/10 backdrop-blur-none py-8">
            <Card className="flex flex-col mx-auto xs:w-full sm:w-max-lg sm:h-full ">
              <FormViewer
                title={`Client Consent - ${consent.consentTitle}`}
                subtitle={`created ${format(
                  new Date(consent.createdAt),
                  "PP",
                )} by ${consent.creator}`}
                // topSummary={
                //   <div className="overflow-clip flex flex-1 flex-col m-1 mb-2 border-primary-8 border-2  ">
                //     <div className="h-full overflow-hidden flex flex-col flex-1">
                //       {/* <div className="flex-[0_0_20px] bg-primary-4">&nbsp;</div> */}
                //       <div className="flex-auto overflow-y-scroll">
                //         <div
                //           className="p-2"
                //           dangerouslySetInnerHTML={{
                //             __html: consent.consentText,
                //           }}
                //         ></div>
                //       </div>
                //       {/* <div className="flex-[0_0_20px] bg-primary-4">&nbsp;</div> */}
                //     </div>
                //   </div>
                // }
                buttonsTop={true}
                onSave={onSave}
                backButtonLabel="Close"
                onBackClick={onBackClick}
                formDefinition={formDefinition}
                form={form}
                fields={fields}
                dataSchema={formViewerSchema(formDefinition)}
                fullHeight={true}
                clientId={clientId}
                fetcher={dataSubmitFetcher}
              />
            </Card>
          </DialogOverlay>
        </DialogPortal>
      </Dialog>
    </>
  );
};
export default ConsentEditor;
