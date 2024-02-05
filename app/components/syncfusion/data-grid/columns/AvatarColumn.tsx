import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { userInitials } from "~/utils/strings";
import type { ImageUploadDataType } from "~/utils/types";

interface AvatarColumnProps {
  firstName: string;
  lastName: string;
  avatarData: ImageUploadDataType | null;
}

const AvatarColumn = ({
  firstName,
  lastName,
  avatarData,
}: AvatarColumnProps) => {
  return (
    <div className="flex">
      <Avatar className="mx-auto">
        {avatarData?.publicUrl && (
          <AvatarImage
            alt={`${firstName} ${lastName}`}
            src={`${avatarData?.publicUrl}` ?? ""}
          />
        )}

        <AvatarFallback>{userInitials(firstName, lastName)}</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default AvatarColumn;
