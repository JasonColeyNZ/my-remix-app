import type { ShouldRevalidateFunction } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import { tagSchema } from "./tagSchema.ts";
import TagForm from "./components/TagForm.tsx";
import { createTag, getTagById, updateTag } from "~/models/tag.server.ts";
import { TagType } from "@prisma/client";
import { getIntegration } from "~/models/integration.server.ts";
import { IntegrationType } from "~/utils/types.ts";
import { parseWithZod } from "@conform-to/zod";

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  if (currentParams.tagId !== nextParams.tagId) return true;
  return false;
};

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: tagSchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const _tag = {
        ...submission.value,
        tagType: TagType.Client,
      };
      const newTag = await createTag(_tag, sbUser);
      return json({ status: 200, data: newTag, submission } as const);
    }
    case formViewerIntent.UPDATE: {
      const newTag = await updateTag(submission.value, sbUser);
      return json({ status: 200, data: newTag, submission } as const);
    }
    case formViewerIntent.VALIDATE: {
      return json({ status: "success", submission } as const);
    }
  }
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log(".service:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { tagId } = params;
  invariantResponse(tagId, "tagId is required");

  const [tag, integration] = await Promise.all([
    getTagById(tagId, sbUser),
    getIntegration(IntegrationType.MAILCHIMP, sbUser),
  ]);
  // let providerTags = [];
  // if (integration) {
  //   const provider = new MailchimpProvider(sbUser, null, integration);
  //   providerTags = await provider.getTags();
  // }

  // console.log("providerTags: ", providerTags);
  if (!tag) {
    // console.log("tag not found: ", tagId);
    redirect("/dashboard/settings/client/tags");
    return;
  }

  return json({
    tag,
    integration,
    // providerTags,
  });
}

const Tag = () => {
  return (
    <div className="flex w-full h-full">
      <TagForm />
    </div>
  );
};
export default Tag;

export function ErrorBoundary() {
  const error = useRouteError();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        400: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>{isRouteErrorResponse(error) ? error.data : "unknown"}</p>
            </div>
          );
        },
        404: ({ params }) => {
          return (
            <div>
              <h1 style={{ fontSize: "2em" }}>400</h1>
              <p>Page not found</p>
            </div>
          );
        },
      }}
    />
  );
}
