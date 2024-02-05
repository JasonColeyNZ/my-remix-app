// import { parse } from "@conform-to/zod";
// import { type LoaderFunctionArgs, json } from "@remix-run/cloudflare";
// import { tableStateSchema } from "~/components/ui/tanstack/tableStateSchema.ts";
// import { setTableDefault } from "~/models/user.default.server.ts";
// import { invariantResponse } from "~/utils/misc.tsx";
// import { requireUserSession } from "~/utils/session.server.ts";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");

//   const formData = await request.formData();

//   const submission = parse(formData, {
//     schema: tableStateSchema,
//   });

// if (submission.status !== "success") {
//   return json(submission.reply(), {
//     status: submission.status === "error" ? 400 : 200,
//   });
// }

//   // console.log("table", submission.value.table);
//   // console.log("sorting", submission.value.sorting);
//   // console.log("columnFiltering", submission.value.columnFiltering);

//   const data = {
//     sorting: submission.value.sorting,
//     columnFiltering: submission.value.columnFiltering,
//     showColumnFilters: submission.value.showColumnFilters,
//   };

//   await setTableDefault(submission.value.table, JSON.stringify(data), sbUser);

//   return json({ status: 200 });
// };

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const { user: sbUser } = await requireUserSession(request);
//   invariantResponse(sbUser, "User should be logged in");
//   return json({ status: 200 });
// };

// const route = () => {
//   return <></>;
// };

// export default route;
