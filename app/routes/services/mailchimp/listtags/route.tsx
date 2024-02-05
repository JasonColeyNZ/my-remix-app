import {
  type ActionFunctionArgs,
  json,
  type LoaderFunctionArgs,
} from "@remix-run/server-runtime";
import { getIntegration } from "~/models/integration.server";
import { MailchimpProvider } from "~/utils/marketing-providers/mailchimp.server";
import { invariantResponse } from "~/utils/misc";
import { requireUserSession } from "~/utils/session.server";
import { IntegrationType } from "~/utils/types";
import { MailchimpTagLinkIntent, tagLinkIntentSchema } from "./tagLinkSchema";
import { updateTagIntegrationLink } from "~/models/tag.server";
import { parseWithZod } from "@conform-to/zod";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();

  const submission = parseWithZod(formData, {
    schema: tagLinkIntentSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case MailchimpTagLinkIntent.TAGLINK: {
      await updateTagIntegrationLink(
        {
          id: submission.value.tagId,
          integrationTagId: submission.value.providerTagId,
        },
        sbUser,
      );
      return json({ status: 200, submission, newTag: null });
    }
    case MailchimpTagLinkIntent.TAGCREATE: {
      const [integration] = await Promise.all([
        getIntegration(IntegrationType.MAILCHIMP, sbUser),
      ]);
      if (!integration) {
        return json({ status: "error", submission, newTag: null } as const, {
          status: 400,
        });
      }
      const provider = new MailchimpProvider(sbUser, null, integration);
      const providerTag = await provider.createTag(submission.value.tagName);
      // console.log("providerTag: ", providerTag);
      await updateTagIntegrationLink(
        {
          id: submission.value.tagId,
          integrationTagId: providerTag.id,
        },
        sbUser,
      );
      return json({ status: 200, submission, newTag: providerTag });
    }
  }

  return json({ status: 200, submission, newTag: null });
};

export async function loader({ request }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const [integration] = await Promise.all([
    getIntegration(IntegrationType.MAILCHIMP, sbUser),
  ]);
  let tags = [];
  let error = null;
  // console.log("integration: ", integration);

  if (integration) {
    const provider = new MailchimpProvider(sbUser, null, integration);
    try {
      tags = await provider.getTags();
    } catch (e) {
      error =
        "Error getting tags from Mailchimp, please check the integration configuration.";
    }
  }

  return json({
    tags,
    error,
  });
}
