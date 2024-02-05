import { Outlet } from "@remix-run/react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

// import TestSMS from "./components/TestSMS.tsx";
import appInfo from "~/app-info.tsx";
import FullScreenCardLayout from "~/layouts/page-layouts/FullScreenCard.tsx";
import SectionPage from "~/layouts/page-layouts/SectionPage";

export const meta: MetaFunction = () => {
  return [{ title: appInfo.title + " - Marketing" }];
};

//try {
// const Smsglobal = require("Smsglobal")(
//   process.env.SMSGLOBAL_API_KEY,
//   process.env.SMSGLOBAL_API_SECRET,
// );
//} catch (error) {}

export async function action({ request }: ActionFunctionArgs) {
  //console.log("client action", request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  let formData = await request.formData();

  switch (formData.get("intent")) {
    case "sendSMS": {
      // const result = await withZod(sendSMSValidator).validate(formData);
      // invariantResponse(result.error !== null, "Validation error");
      // invariantResponse(result.data, "No data");
      //const { phoneNumber, message } = result.data;
      // console.log("phoneNumber", phoneNumber);
      // console.log("message", message);
      // console.log(process.env.SMSGLOBAL_API_SECRET);
      //console.log("Smsglobal", Smsglobal);
      // const response = await Smsglobal.sms.send({
      //   origin: {appInfo.title},
      //   destination: phoneNumber,
      //   message,
      // });
      // if (response.statusCode === 200) {
      //   console.log("success");
      //   console.log("message", response.data.messages);
      // }
      //console.log("res", response);
      // const smsGlobal = Smsglobal(
      //   process.env.SMSGLOBAL_API_KEY,
      //   process.env.SMSGLOBAL_API_SECRET,
      // );
      // var options = {
      //   offset: 1,
      //   limit: 50,
      // };
      // smsGlobal.sms
      //   .getAll(options)
      //   .then((response: any) => {
      //     console.log("Success:", response);
      //   })
      //   .catch((err: any) => {
      //     console.error("Error:", err);
      //   });
      //Smsglobal.
      //Smsglobal.sendSMS(phoneNumber, message);
    }
  }

  return json({ user: sbUser });
}

const Marketing = () => {
  return (
    <>
      <SectionPage
        id="marketing-background"
        hideUI={false}
        breadcrumbOnly={true}
      >
        <FullScreenCardLayout>
          <Outlet />
        </FullScreenCardLayout>
      </SectionPage>
    </>
  );
};
export default Marketing;
