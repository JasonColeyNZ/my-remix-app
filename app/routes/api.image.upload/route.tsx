// import { parseMultipartFormData } from "@remix-run/server-runtime/dist/formData.js";
import { json } from "@remix-run/cloudflare";
import type { ActionFunctionArgs } from "@remix-run/cloudflare";
// import { AreaType } from "~/components/draggable-forms-editor/types.ts";
// import { addUpdateClientAvatar } from "~/models/client.server.ts";
// import { addUpdateUserAvatar } from "~/models/user.server.ts";
// import { imageUploadHandler } from "~/services/supabase-bucket.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

export async function action({ request, params }: ActionFunctionArgs) {
  //console.log("client action", request);
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const clonedData = request.clone();

  const formData = await clonedData.formData();
  // const objectId = formData.get("objectId")?.toString() || "";
  const objectType = formData.get("objectType")?.toString() || "";
  // const fieldId = formData.get("fieldId")?.toString() || "";
  // console.log("data", objectId, objectType, fieldId);

  // const data = await parseMultipartFormData(
  //   request,
  //   imageUploadHandler(sbUser, supabase, objectId, fieldId),
  // );

  // const result = await withZod(uploadUploadedValidation).validate(data);
  // if (result.error) {
  //   console.log("validation error", result);

  //   return validationError(result.error);
  // }
  // console.log("upload image result ", result);

  //move them to the formData object
  try {
    let objectData = null;
    switch (objectType) {
      // case AreaType.CLIENT_DETAIL:
      //   {
      //     const client = await addUpdateClientAvatar(
      //       { id: objectId, avatarData: result.data.image },
      //       sbUser,
      //     );
      //     if (!client) throw { message: "No client data" };
      //     objectData = client.avatarData;
      //   }
      //   break;
      // case AreaType.MEMBER_DETAIL:
      //   {
      //     const member = await addUpdateUserAvatar(
      //       { id: objectId, avatarData: result.data.image },
      //       sbUser,
      //     );
      //     if (!member) throw { message: "No member data" };
      //     objectData = member.avatarData;
      //   }
      //   break;
      default:
        break;
    }
    // if (!clientData) throw { message: "No client data" };
    // const newClient = await addUpdateClient(clientData, sbUser);

    // if (!newClient)
    //   return json({
    //     status: 404,
    //     data: null,
    //     error: adding ? "Client not created" : "Client not updated",
    //   });

    // let newData = { ...newClient, ...formData };

    //return json({ status: 200, data: clientData });
    return json({ data: objectData });
    //return redirect(`/dashboard/clients`);
    //else return json(newData);
  } catch (error) {
    //console.log("error", error);

    throw new Response("Image Upload Action", {
      status: 404,

      //statusText: error,
    });
  }
}
