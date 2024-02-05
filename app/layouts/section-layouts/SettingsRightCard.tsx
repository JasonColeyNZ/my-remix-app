import type { ReactElement } from "react";
import { Card } from "~/components/ui/card.tsx";

const SettingsRightCard = ({ children }: { children: ReactElement }) => {
  return (
    <div className="flex w-full">
      <Card className="flex flex-1 mb-2 mt-2 pt-1 flex-col rounded-none lg:rounded-md w-full lg:min-w-l ">
        {children}
      </Card>
    </div>
  );
};

export default SettingsRightCard;
