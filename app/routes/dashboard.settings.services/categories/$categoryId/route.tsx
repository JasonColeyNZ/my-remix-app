// import type { ShouldRevalidateFunction } from "@remix-run/react";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { json, redirect } from "@remix-run/cloudflare";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { formViewerIntent } from "~/components/form-viewer/formViewerSchema.ts";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary.tsx";
import {
  createCategory,
  getCategoryById,
  updateCategory,
} from "~/models/category.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import { categorySchema } from "./categorySchema.ts";
import CategoryForm from "./components/CategoryForm.tsx";
import { parseWithZod } from "@conform-to/zod";

// export const shouldRevalidate: ShouldRevalidateFunction = ({
//   currentParams,
//   nextParams,
// }) => {
//   if (currentParams.categoryId !== nextParams.categoryId) return true;
//   return false;
// };

export async function action({ request }: ActionFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const formData = await request.formData();
  const submission = parseWithZod(formData, {
    schema: categorySchema,
  });

  if (submission.status !== "success") {
    return json(submission.reply(), {
      status: submission.status === "error" ? 400 : 200,
    });
  }

  switch (submission.value.intent) {
    case formViewerIntent.CREATE: {
      const newCategory = await createCategory(submission.value, sbUser);
      return redirect(
        `/dashboard/settings/services/categories/${newCategory?.id}`,
      );
    }
    case formViewerIntent.UPDATE: {
      const newCategory = await updateCategory(submission.value, sbUser);
      return json({ status: 200, data: newCategory, submission } as const);
    }
    case formViewerIntent.VALIDATE: {
      return json({ status: "success", submission } as const);
    }
  }
  //console.log("user: ", result.data.users);
  //result.data.entityId = entityId;

  // if (!newService)
  //   return json({
  //     status: 404,
  //     data: null,
  //     error: adding ? "Service not created" : "Service not updated",
  //   });

  // if (adding) return redirect(`/dashboard/settings/services/${newService.id}`);
  // else return json({ status: 200, data: newService });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  //console.log(".service:loader: ");
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { categoryId } = params;
  invariantResponse(categoryId, "categoryId is required");

  const [category] = await Promise.all([getCategoryById(categoryId, sbUser)]);

  if (!category) {
    console.log("category not found: ", categoryId);
    redirect("/dashboard/settings/services/categories");
    return;
  }

  return json({
    category,
  });
}

const Category = () => {
  return (
    <div className="flex w-full h-full">
      <CategoryForm />
    </div>
  );
};
export default Category;

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
