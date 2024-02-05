import { SectionDescription } from "~/components/typography/section-description";
import { SectionTitle } from "~/components/typography/section-title";
import { Button } from "~/components/ui/button.tsx";

// import { Button } from "../../Button.tsx";

export type FeatureId = "simpleBooking" | "records" | "easyFinancials";

export const features: {
  id: FeatureId;
  tabName: string;
  pictureImgSrc: string;
  title: string;
  message: string;
}[] = [
  {
    id: "simpleBooking",
    tabName: "Simple Booking",
    pictureImgSrc: "/images/illustration-features-tab-1.svg",
    title: "Clients can make bookings",
    message: "Read More",
  },
  {
    id: "records",
    tabName: "Client Records",
    pictureImgSrc: "/images/illustration-features-tab-2.svg",
    title: "Record all appointment info",
    message: "Read More",
  },
  {
    id: "easyFinancials",
    tabName: "Access to Financials",
    pictureImgSrc: "/images/illustration-features-tab-3.svg",
    title: "Easily Download your Financial Records",
    message: "Read More",
  },
];

type Props = {
  featureId: FeatureId;
};

export function Feature({ featureId }: Props) {
  const feature =
    features.find((feature) => feature.id === featureId) ?? features[0];

  return (
    <div className="mt-[4.65rem] grid lg:mt-[4.5rem] lg:grid-cols-2">
      <div className="flex justify-center px-6 lg:items-center lg:justify-end 2xl:pl-0 2xl:pr-[0.95rem]">
        <img
          src={feature.pictureImgSrc}
          alt=""
          className="h-[15.1rem] w-auto sm:h-[17.5rem] xl:h-[20rem] 2xl:h-[26rem]"
        />
      </div>
      <div className="sm: mt-[2.45rem] px-6 sm:mt-[4.1rem] sm:px-24 md:px-36 lg:mt-0 lg:px-8 xl:mt-[2rem] xl:pl-[3rem] xl:pr-[7rem] 2xl:mt-[4.1rem] 2xl:pl-[6.85rem]">
        <SectionTitle className="lg:text-left">{feature.title}</SectionTitle>
        <SectionDescription className="mt-[0.85rem] px-2 lg:mt-[1.75rem] lg:px-0 lg:text-left">
          {feature.message}
        </SectionDescription>
        <Button
          // as="a"
          // href="#"
          className="mt-8 hidden px-[1.375rem] lg:inline-block"
        >
          More Info
        </Button>
      </div>
    </div>
  );
}
