import AvatarColumn from "~/components/syncfusion/data-grid/columns/AvatarColumn";
import type { ClientsItemType } from "~/models/client.server";
import LastServicesColumn from "./LastServiceColumn";
import ContactColumn from "./ContactColumn";
import type { ColumnModel } from "~/components/syncfusion/data-grid";

export const clientColumns = [
  {
    field: "id",
    headerText: "Avatar",
    headerTemplate: () => <div></div>,
    width: 50,
    filterTemplate: () => <div></div>,
    template: (props: ClientsItemType) => (
      <AvatarColumn
        firstName={props.firstName}
        lastName={props.lastName}
        avatarData={props.avatarData}
      />
    ),
    allowFiltering: false,
    allowSorting: false,
    allowEditing: false,
    allowResizing: false,
    showColumnMenu: false,
    filterBarTemplate: () => null,
  },
  { field: "firstName", headerText: "First", width: 100 },
  { field: "lastName", headerText: "Last", width: 100 },
  {
    field: "lastBooking",
    headerText: "Last Booking",
    filter: {
      operator: "like",
      params: { ignoreAccent: true }, //still not working....
    },
    type: "string",
    template: (props: ClientsItemType) => (
      <LastServicesColumn service={props.lastBooking} />
    ),
  },
  {
    field: "email",
    headerText: "Email",
    width: "250",
    template: (props: any) => <ContactColumn props={props} />,
  },
] as ColumnModel[];
