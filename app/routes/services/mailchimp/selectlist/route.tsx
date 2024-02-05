import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/server-runtime";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import { MailchimpIntent, mailchimpSchema } from "./mailchimpSchema";
import {
  addUpdateIntegrationList,
  getIntegration,
  updateIntegrationPrimaryListId,
} from "~/models/integration.server";
import { IntegrationType } from "~/utils/types";
import { MailchimpProvider } from "~/utils/marketing-providers/mailchimp.server";
import { parseWithZod } from "@conform-to/zod";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: mailchimpSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case MailchimpIntent.SELECTLIST: {
      await updateIntegrationPrimaryListId(submission.value, sbUser);
      // console.log("select-list");
      return json({ status: 200, submission });
    }
  }

  return json({ status: 200, submission });
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  //get integration
  const integration = await getIntegration(IntegrationType.MAILCHIMP, sbUser);
  invariantResponse(integration, "Integration not found");

  //get provider
  const provider = new MailchimpProvider(sbUser, null, integration);
  invariantResponse(provider, "Provider not found");

  //get lists
  const lists = await provider.getLists();
  // console.log("lists", lists);

  //save lists to integration
  const newLists = [];
  for (const list of lists) {
    newLists.push(
      await addUpdateIntegrationList(
        { listId: list.id, listName: list.name, integrationId: integration.id },
        sbUser,
      ),
    );
  }

  return json({ status: 200, newLists });
};

const route = () => {
  return <></>;
};

export default route;
