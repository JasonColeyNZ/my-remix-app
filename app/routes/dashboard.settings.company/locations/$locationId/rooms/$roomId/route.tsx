import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import { getRoomById } from "~/models/room.server.ts";
import { getLocationServices } from "~/models/services.server.ts";
import { invariantResponse } from "~/utils/misc.tsx";
import { requireUserSession } from "~/utils/session.server.ts";

import RoomDetails from "./components/RoomDetails.tsx";
// import { roomSchema } from "./roomSchema.ts";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  const { roomId, locationId } = params;
  invariantResponse(roomId, "roomId is required");
  invariantResponse(locationId, "locationId is required");

  const [room, services] = await Promise.all([
    getRoomById(roomId, sbUser),
    getLocationServices(locationId, sbUser),
  ]);

  return json({ room, roomId, services });
}

export async function action({ request }: ActionFunctionArgs) {
  const { user: sbUser } = await requireUserSession(request);
  invariantResponse(sbUser, "User should be logged in");

  // let formData = await request.formData();

  // const result = await withZod(roomSchema).validate(formData);
  // if (result.error) {
  //   console.log("result.error: ", result.error);
  //   return validationError(result.error);
  // }

  // const room = {
  //   ...result.data,
  //   services:
  //     result.data.services === "" ? [] : result.data.services.trim().split(";"),
  // };

  // const updatedLocation = await updateRoom(room, sbUser);

  // return json({ status: "ok", data: updatedLocation });
}

const LocationRoom = () => {
  return <RoomDetails />;
};
export default LocationRoom;
