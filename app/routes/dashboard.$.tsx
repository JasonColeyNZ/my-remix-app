import { Link, useLocation } from "@remix-run/react";
import GeneralErrorBoundary from "~/components/error-boundary/ErrorBoundary";

export async function loader() {
  throw new Response("Not found", { status: 404 });
}

export default function NotFound() {
  // due to the loader, this component will never be rendered, but we'll return
  // the error boundary just in case.
  return <ErrorBoundary />;
}

export function ErrorBoundary() {
  const location = useLocation();
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: () => (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1>We can't find this page:</h1>
              <pre className="text-body-lg whitespace-pre-wrap break-all">
                {location.pathname}
              </pre>
            </div>
            <Link to="/dashboard" className="text-body-md underline">
              Back to Dashboard
            </Link>
          </div>
        ),
      }}
    />
  );
}
