import { useContext, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import {
  IntegrationsStateTypes,
  type IntegrationDetailType,
} from "../store/integrationsReducer";
import { IntegrationsContext } from "../store/integrationsContext";
import { useFetcher } from "@remix-run/react";
import { serialize } from "object-to-formdata";
import { IntegrationIntent } from "../integrationSchema";

const IntegrationDetails = ({
  integration,
}: {
  integration: IntegrationDetailType;
}) => {
  const { dispatch } = useContext(IntegrationsContext);
  const fetcher = useFetcher();
  const [checked, setChecked] = useState(false);

  const handleConnect = () => {
    dispatch({
      type: IntegrationsStateTypes.activeIntegration,
      payload: {
        activeIntegration: integration,
      },
    });
  };

  //checks the integration to ensure it is still valid
  useEffect(() => {
    if (!integration.id || checked) return;
    if (fetcher.state === "submitting") return;

    if (fetcher.data) {
      // console.log(fetcher.data);
      setChecked(true);
      return;
    }

    fetcher.submit(
      serialize({
        intent: IntegrationIntent.CHECK,
        integration: integration.integrationType,
      }),
      {
        method: "post",
      },
    );
  }, [fetcher, integration.id, checked, integration.integrationType]);

  return (
    <Card className="">
      <CardHeader className="text-xl">{integration.integrationType}</CardHeader>
      <CardContent>
        <div className="flex">
          <div className="text-sm w-2/3">{integration.shortDescription}</div>
          <div className="flex flex-col text-sm mt-2 w-1/3 items-end">
            <Button className="btn btn-primary" onClick={handleConnect}>
              {integration.id ? "Configure" : "Connect"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationDetails;
