import mask from "~/assets/auth-v2-mask-light.png";
import tree from "~/assets/tree-2.png";
import girl from "~/assets/girl.png";
import AppIcon from "~/assets/app.tsx";
import { cn } from "~/utils/shadcn.utils.ts";

const RightPane = ({ children }: { children: any }) => {
  return (
    <div className="relative flex w-full h-full bg-background">
      <div className="flex flex-1">
        <img
          className="absolute inset-x-0 bottom-0"
          style={{ height: 200 }}
          src={tree}
          alt="mask"
        />
        <img className="absolute inset-x-0 bottom-0" src={mask} alt="mask" />
        <div
          className="flex absolute z-10 t-0 l-0 m-10  text-primary-10 text-decoration-none
              md:text-2xl whitespace-nowrap"
        >
          <span>
            <AppIcon className={cn(" mr-1")}></AppIcon>
          </span>
          <div className="font-[monospace] tracking-wider font-bold">
            Easy MedSpa
          </div>
        </div>
        <div className="z-10 max-w-lg my-auto mx-auto">
          <img className="" src={girl} alt="mask" />
        </div>
      </div>
      <div className="z-10 flex min-w-ml max-w-ml h-full rounded-none bg-header">
        <div className="my-auto p-10">{children}</div>
      </div>
    </div>
  );
};

export default RightPane;
