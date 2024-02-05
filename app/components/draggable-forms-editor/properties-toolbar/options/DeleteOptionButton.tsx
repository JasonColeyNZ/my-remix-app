import { TrashIcon } from "@radix-ui/react-icons";

import type { FieldOptionType } from "../../types.ts";
import IconButton from "~/components/icon-button/IconButton.tsx";

interface DeleteOptionButtonProps {
  option: FieldOptionType;
  options: FieldOptionType[];
  setOptions: any;
}

const DeleteOptionButton = ({
  option,
  options,
  setOptions,
}: DeleteOptionButtonProps) => {
  const handleClick = () => {
    const newOptions = options.filter((o: FieldOptionType) => {
      return o.value !== option.value;
    });
    setOptions(newOptions);
  };

  return (
    <IconButton
      aria-label="delete"
      onClick={handleClick}
      color="error"
      icon={<TrashIcon />}
      url={null}
      title={""}
    />
  );
};
export default DeleteOptionButton;
