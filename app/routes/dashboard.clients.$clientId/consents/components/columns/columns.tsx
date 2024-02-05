import type { ColumnModel } from "~/components/syncfusion/data-grid";
import AvatarColumn from "~/components/syncfusion/data-grid/columns/AvatarColumn";
import type { ClientConsentItemsType } from "~/models/clientconsent.server";

export const ConsentsColumns = () => {
  return [
    {
      field: "createdAt",
      headerText: "Created",
      width: 100,
      type: "date",
      format: "dd/MM/yy",
    },
    {
      field: "consentTitle",
      headerText: "Title",
    },
    {
      field: "user",
      headerText: "Team Member",
      width: 100,
      template: (props: ClientConsentItemsType) => (
        <AvatarColumn
          firstName={props.creator.firstName}
          lastName={props.creator.lastName}
          avatarData={props.creator.avatarData}
        />
      ),
    },
  ] as ColumnModel[];
};
