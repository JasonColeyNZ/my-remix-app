import type { LoaderFunctionArgs } from "@remix-run/cloudflare";
import { json } from "@remix-run/cloudflare";
import type { AddEditItemObject } from "~/components/add-edit-item/AddEditItem.tsx";
import AddEditItem from "~/components/add-edit-item/AddEditItem.tsx";
import Modal from "~/components/modal/Modal";

export async function loader({ request }: LoaderFunctionArgs) {
  // if the user isn't authenticated, this will redirect to login
  return json({});
}

const Add = () => {
  const objects: AddEditItemObject[] = [
    { name: "name", label: "Category" },
    { name: "id", hidden: true, value: "" },
  ];

  return (
    <Modal showTitle={false} title="" width={560} height={600}>
      <AddEditItem objects={objects} data={undefined} />
    </Modal>
  );
};
export default Add;
