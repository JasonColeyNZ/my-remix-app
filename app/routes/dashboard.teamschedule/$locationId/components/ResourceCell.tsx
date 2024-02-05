import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar.tsx";
import { userInitials } from "~/utils/strings.tsx";

const ResourceCell = (props: any) => {
  const {
    data: {
      color,
      text,
      data: { avatar },
    },
  } = props;
  return (
    <div className="dx-template-wrapper">
      <div className="name" style={{ background: color }}>
        <h2>{text}</h2>
      </div>
      <Avatar>
        <AvatarImage alt={text} src={avatar} />
        <AvatarFallback>{userInitials(text)}</AvatarFallback>
      </Avatar>

      <div className="info" style={{ color }}></div>
    </div>
  );
};
export default ResourceCell;
