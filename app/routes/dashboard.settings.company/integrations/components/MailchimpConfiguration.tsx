import { IntegrationsContext } from "../store/integrationsContext";
import { useContext, useEffect, useState } from "react";
import { useFetcher } from "@remix-run/react";
import {
  MailchimpIntent,
  mailchimpSchema,
} from "~/routes/services/mailchimp/selectlist/mailchimpSchema";
import AutoComplete from "~/components/form-controls/auto-complete-headless-ui/AutoComplete.tsx";
import { serialize } from "object-to-formdata";
import { ClipLoader } from "react-spinners";
import { IntegrationsStateTypes } from "../store/integrationsReducer";
import { FormProvider, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

const MailchimpConfiguration = () => {
  const { state, dispatch } = useContext(IntegrationsContext);

  const [listsLoaded, setListsLoaded] = useState(false);
  // const intentRef = useRef<HTMLButtonElement>(null);
  const loaderFetcher = useFetcher();
  const formFetcher = useFetcher();
  // const [selectedListId, setSelectedListId] = useState<string[]>([]);

  useEffect(() => {
    if (!state.integrationsState.activeIntegration || listsLoaded) return;
    setListsLoaded(true);
    loaderFetcher.load("/services/mailchimp/selectlist");
  }, [listsLoaded, loaderFetcher, state.integrationsState.activeIntegration]);

  useEffect(() => {
    if (loaderFetcher.data === undefined) return;
    if ((loaderFetcher.data as any).status === "error") return;
    //update available lists
    console.log("loaderFetcher.data", loaderFetcher.data);
  }, [listsLoaded, loaderFetcher.data]);

  // console.log(state.integrationsState.activeIntegration);

  // const actionData = useActionData<typeof action>();
  // const formRef = useRef<HTMLFormElement | null>(null);

  // const isSaving = useSpinDelay(
  //   formFetcher.state === "loading" || formFetcher.state === "submitting",
  //   {
  //     delay: 800,
  //     minDuration: 600,
  //   },
  // );

  useEffect(() => {
    if (formFetcher.data && (formFetcher.data as any).status !== "error") {
      if (
        (formFetcher.data as any).submission?.payload?.intent === "select-list"
      ) {
        if (!state.integrationsState.activeIntegration) return;
        //for some reason just setting the primaryListId in the activeIntegration
        //didn't update the form, if you clicked to account and back to configuration
        //the list was still empty, so we need to update the form
        dispatch({
          type: IntegrationsStateTypes.activeIntegration,
          payload: {
            activeIntegration: {
              ...state.integrationsState.activeIntegration,
            },
          },
        });
        formFetcher.data = undefined;
      }
    }
  }, [
    dispatch,
    formFetcher,
    formFetcher.data,
    state.integrationsState.activeIntegration,
  ]);

  const handleListChange = (value: any) => {
    formFetcher.submit(
      serialize({
        listId: value,
        id: state.integrationsState.activeIntegration?.id,
        intent: MailchimpIntent.SELECTLIST,
      }),
      {
        method: "POST",
        action: "/services/mailchimp/selectlist",
      },
    );
  };

  const [form] = useForm({
    //   id: "tag-form",  //   ref: formRef,
    defaultValue: state.integrationsState.activeIntegration || {},
    constraint: getZodConstraint(mailchimpSchema),
    //   lastSubmission:
    //     actionData?.submission &&
    //     actionData?.submission.payload.intent === MailchimpIntent.SELECTLIST
    //       ? actionData?.submission
    //       : undefined,
    //   onSubmit: (event, { formData }) => {
    //     console.log("onSubmit: formData");
    //     if (formData.get(conform.INTENT) === MailchimpIntent.VALIDATE) {
    //       console.log("onSubmit: preventDefault");
    //       event.preventDefault();
    //       return;
    //     }
    //   },
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: mailchimpSchema,
      });
    },
  });

  return (
    <div className="flex flex-col gap-2">
      <div>
        Mailchimp uses Audiences (Lists) to contain the list of contacts.
        <br />
        Easy MedSpa can only work with a single list, please select a list from
        below.
      </div>
      <div className="flex flex-col w-full gap-2">
        <FormProvider context={form.context}>
          <formFetcher.Form tabIndex={-1} method="POST">
            {/* <button
            ref={intentRef}
            hidden
            name={conform.INTENT}
            value={MailchimpIntent.VALIDATE}
          /> */}
            <div className="flex flex-row w-1/2 items-center">
              <AutoComplete
                labelProps={{ children: "Audience List Id" }}
                valueName="id"
                labelName="listName"
                onChange={handleListChange}
                fieldName={"selectedListId"}
                // inputProps={{
                //   value: selectedListId,
                //   autoFocus: true,
                //   disabled: !listsLoaded,
                // }}
                // errors={fields.primaryListId.errors}
                options={
                  state.integrationsState.activeIntegration &&
                  state.integrationsState.activeIntegration.lists
                    ? state.integrationsState.activeIntegration.lists
                    : []
                }
                hideError={false}
              />
              <div className="w-5">
                <ClipLoader
                  className="ml-1"
                  color={"purple"}
                  loading={!listsLoaded}
                  size={15}
                  speedMultiplier={0.6}
                />
              </div>
            </div>
          </formFetcher.Form>
        </FormProvider>
      </div>
    </div>
  );
};

export default MailchimpConfiguration;
