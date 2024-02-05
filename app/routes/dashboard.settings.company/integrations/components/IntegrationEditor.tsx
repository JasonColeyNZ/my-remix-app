import { Form } from "@remix-run/react";
import { DialogComponent } from "@syncfusion/ej2-react-popups/src/dialog/dialog.component";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { cn } from "~/utils/shadcn.utils";
import { IntegrationsContext } from "../store/integrationsContext";
import { useContext } from "react";
import { MdOutlineClose } from "react-icons/md/index.js";
import { IntegrationsStateTypes } from "../store/integrationsReducer";
import MailchimpConfiguration from "./MailchimpConfiguration";
import MailchimpInfo from "./MailchimpInfo";
import SendGridInfo from "./SendGridInfo";
import { IntegrationType } from "~/utils/types";

const IntegrationEditor = () => {
  const { state, dispatch } = useContext(IntegrationsContext);

  if (state.integrationsState.activeIntegration === null) return null;

  // console.log(state.integrationsState.activeIntegration);

  const handleClose = () => {
    dispatch({
      type: IntegrationsStateTypes.activeIntegration,
      payload: {
        activeIntegration: null,
      },
    });
  };

  return (
    <DialogComponent
      isModal={true}
      // width="75%"
      className={cn(
        "notWide:!w-[800px] border-0 shadow-none [&_.e-dlg-content]:p-0",
        "[&_.e-dlg-content]:bg-transparent [&_.e-dlg-content]:shadow-none",
        "[&_.e-dlg-content]:overflow-visible",
      )}
    >
      <Card
        className={cn(
          "flex flex-col w-full border-0 shadow-none " +
            " notWide:m-auto notWide:align-center notWide:shadow-md wide:flex-1",
        )}
      >
        <CardHeader
          tabIndex={-1}
          className="flex-shrink text-xl font-medium bg-primary text-white"
        >
          <div className="absolute right-1 top-1">
            <Button className="flex gap-1" onClick={handleClose}>
              Close
              <MdOutlineClose />
            </Button>
          </div>
          <div className="flex items-center">
            <div className="w-1/5">
              <img
                src={state.integrationsState.activeIntegration.logo}
                alt=""
                className="h-20  rounded-md aspect-auto"
              />
            </div>
            <div className="flex flex-col p-3 w-3/5">
              <div>{state.integrationsState.activeIntegration.name}</div>
              <div className="text-sm">
                {state.integrationsState.activeIntegration.shortDescription}
              </div>
            </div>
            <Form method="POST" className="flex flex-1 flex-col w-1/5">
              <input type="hidden" name="intent" value="connect" />
              <input type="hidden" name="integration" value="mailchimp" />
              <div className="flex flex-col">
                <Button type="submit" className="ml-auto" variant="secondary">
                  {state.integrationsState.activeIntegration.id
                    ? "Disconnect"
                    : "Connect"}
                </Button>
              </div>
            </Form>
          </div>
        </CardHeader>
        <CardContent
          tabIndex={-1}
          className={"grow flex flex-col flex-1 p-6 min-h-20"}
        >
          <Tabs defaultValue="overview" className="">
            <TabsList className="grid w-full grid-cols-2 bg-transparent">
              <TabsTrigger className="bg-primary-2" value="overview">
                Account
              </TabsTrigger>
              <TabsTrigger
                disabled={!state.integrationsState.activeIntegration.id}
                className=""
                value="configuration"
              >
                Configuration
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              {state.integrationsState.activeIntegration.integrationType ===
                IntegrationType.MAILCHIMP + "" && <MailchimpInfo />}
              {state.integrationsState.activeIntegration.integrationType ===
                IntegrationType.SENDGRID && <SendGridInfo />}
            </TabsContent>
            <TabsContent value="configuration">
              {state.integrationsState.activeIntegration.integrationType ===
                IntegrationType.MAILCHIMP + "" && <MailchimpConfiguration />}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </DialogComponent>
  );
};

export default IntegrationEditor;
