import {
  isRouteErrorResponse,
  useParams,
  useRouteError,
} from "@remix-run/react";
import { type ErrorResponse } from "@remix-run/router";
import { getErrorMessage } from "~/utils/misc.tsx";
import error404 from "~/assets/10.png";
import mask from "~/assets/auth-v2-mask-light.png";
import tree from "~/assets/tree-2.png";

type StatusHandler = (info: {
  error: ErrorResponse;
  params: Record<string, string | undefined>;
}) => JSX.Element | null;

export default function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => (
    <div className="flex items-center flex-col text-center gap-10">
      <img
        className="absolute inset-x-0 bottom-0"
        style={{ height: 200 }}
        src={tree}
        alt="mask"
      />
      <img className="absolute inset-x-0 bottom-0" src={mask} alt="mask" />
      <div className="flex flex-col gap-2 is-[90vw] sm:is-[unset]">
        <h1 className="text-8xl font-medium">{error.status}</h1>
        <p className="text-xl">
          {isRouteErrorResponse(error) ? error.data : "unknown"}
          {"⚠️"}
        </p>
      </div>
      <img
        className="object-cover bs-[500px] md:bs-[450px]"
        src={error404}
        alt="400"
      />
    </div>
    // <div className="object-contain">
    //   {error.status} {error.data}
    // </div>
  ),
  statusHandlers,
  unexpectedErrorHandler = (error) => (
    <div className="flex items-center flex-col text-center gap-10">
      <img
        className="absolute inset-x-0 bottom-0"
        style={{ height: 200 }}
        src={tree}
        alt="mask"
      />
      <img className="absolute inset-x-0 bottom-0" src={mask} alt="mask" />
      <div className="flex flex-col gap-2 is-[90vw] sm:is-[unset]">
        <h1 className="text-8xl font-medium">404</h1>
        <p className="text-xl">
          {getErrorMessage(error)}
          {"⚠️"}
        </p>
      </div>
      <img
        className="object-cover bs-[500px] md:bs-[450px]"
        src={error404}
        alt="400"
      />
    </div>
  ), // <p>{getErrorMessage(error)}</p>,
}: {
  defaultStatusHandler?: StatusHandler;
  statusHandlers?: Record<number, StatusHandler>;
  unexpectedErrorHandler?: (error: unknown) => JSX.Element | null;
}) {
  const error = useRouteError();
  const params = useParams();
  // if (typeof document !== "undefined") {
  // console.error(error);
  // }

  return (
    <div className=" mx-auto h-full w-full flex items-center justify-center ">
      {isRouteErrorResponse(error)
        ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
            error,
            params,
          })
        : unexpectedErrorHandler(error)}
    </div>
  );
}
