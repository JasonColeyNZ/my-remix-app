import { Form, useLoaderData } from "@remix-run/react";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import {
  getClientConsentById, // signClientConsent,
} from "~/models/clientconsent.server.ts";
import { getSession, sessionStorage } from "~/services/session.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

// import { addSignatureValidator } from "./addSignatureValidator.ts";

export async function action({ request, params }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const consentId = params.consentId;
  invariantResponse(consentId, "consentId is required");

  let formData = await request.formData();

  switch (formData.get("intent")) {
    case "signature": {
      // const result = await withZod(addSignatureValidator).validate(formData);

      // if (result.error) {
      //   console.log("result.error: ", result.error);
      //   return json({
      //     error: validationError(result.error),
      //     formId: "consent-form",
      //   });
      // }
      // const data = { ...result.data };
      //console.log(data);
      // const consent = await signClientConsent(data, sbUser);
      // if (!consent)
      return json({
        status: 404,
        data: null,
        error: "Consent not signed",
      });
      // return json({ status: 200, data: consent });
      // const session = await getSession(request);
      // session.set("NEW_CONSENT", newConsent.id);
    }
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const newConsentId = session.get("NEW_CONSENT");
  session.unset("NEW_CONSENT");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { consentId, clientId } = params;
  invariantResponse(consentId, "consentId is required");
  const [consent] = await Promise.all([
    getClientConsentById({ id: consentId }, sbUser),
  ]);

  return json(
    {
      status: "ok",
      consent,
      newConsent: newConsentId === consentId ? true : false,
      clientId,
    },
    {
      headers: {
        "Set-Cookie": await sessionStorage.commitSession(session),
      },
    },
  );
}

const Consent = () => {
  const { consent, clientId, newConsent } = useLoaderData<typeof loader>();
  return <></>;
  // const [signature, setSignature] = useState<any>(null);
  //console.log("consent: ", consent);

  // const { formContext, register, setValue, formRef, submitForm } = useRHF(
  //   "signature",
  //   addSignatureValidator,
  //   consent,
  // );

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
      {/* <FormProvider {...formContext}> */}
      <Form
        id="signature"
        // ref={formRef}
        method="POST"
        style={{
          display: "none",
        }}
      >
        <input type="hidden" name="intent" value="signature" />
        <input type="hidden" name="id" value={consent.id} />
        <input type="hidden" name="clientId" value={clientId} />
        {/* <input type="hidden" {...register("signature")} /> */}
      </Form>
      {/* </FormProvider> */}
      {/* <SignatureModal
        title="Sign Letter of Consent"
        saveData={signature}
        setSaveData={setSignature}
      /> */}
      {/* <Box
        sx={{
          p: 0,
          display: "flex",
          flexDirection: "row",
          flex: "1 1 0",
          height: "100%",
          overflowY: "hidden",
          overflowX: "hidden",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          flex="1 1 0"
          height="100%"
        >
          <Box
            sx={{
              p: 1,
              pt: 0,
              display: "flex",
              flexDirection: "column",
              flex: "1 1 0",
              height: "100%",
              overflowX: "hidden",
            }}
          >
            <Paper
              elevation={3}
              square={true}
              sx={{
                m: 4,

                p: 5,
                mt: 0,
                display: "flex",
                flexDirection: "column",
                flex: "1 1 0",
                height: "100%",
                overflowX: "hidden",
              }}
              dangerouslySetInnerHTML={{ __html: consent.consentText }}
            ></Paper>

          </Box>
        </Box>
      </Box> */}
    </>
  );
};
export default Consent;
