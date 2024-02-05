import React from "react";
import { Badge } from "~/components/ui/badge";
import type { GetUserItemsType } from "~/models/user.server";

const RoleColumn = ({ props }: { props: GetUserItemsType }) => {
  if (!props.role) return null;
  return <Badge>{props.role?.name}</Badge>;
};

export default RoleColumn;
