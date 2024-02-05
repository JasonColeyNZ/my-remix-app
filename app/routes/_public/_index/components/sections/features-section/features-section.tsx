import { useState } from "react";

import { ContentContainer } from "../../ContentContainer.tsx";
import { FeatureTabs } from "./feature-tabs.tsx";
import type { FeatureId } from "./feature.tsx";
import { Feature } from "./feature.tsx";
import { SectionTitle } from "~/components/typography/section-title.tsx";
import { SectionDescription } from "~/components/typography/section-description.tsx";

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] =
    useState<FeatureId>("simpleBooking");

  return (
    <>
      <section className="relative mt-[9.4rem] lg:mt-[5.75rem]">
        <ContentContainer>
          <div className="px-6 sm:px-24 md:px-36 lg:mx-auto lg:w-[850px]">
            <SectionTitle>Features</SectionTitle>
            <SectionDescription className="mt-3 px-2 2xl:mt-[1.5rem]">
              Our aim is to make it quick and easy for you to access your
              clients records, bookings and financial records.
            </SectionDescription>
          </div>
          <FeatureTabs
            selected={selectedFeature}
            onChange={setSelectedFeature}
          />
        </ContentContainer>
      </section>

      <section className="relative lg:pb-[1rem] xl:pb-[2.75rem] 2xl:pb-[1.175rem]">
        <span className="absolute left-0 bottom-0 top-[2.15rem] right-[calc(50%-7.5rem)] -z-10 h-[12.7rem] rounded-r-full bg-primary-400 sm:top-[2rem] sm:right-[calc(50%-8rem)] sm:h-[16rem] md:top-[2.5rem] lg:top-auto lg:right-[calc(50%+10rem)] xl:h-[20rem] 2xl:right-[calc(50%+5rem)] 2xl:h-[22rem]" />
        <ContentContainer>
          <Feature featureId={selectedFeature} />
        </ContentContainer>
      </section>
    </>
  );
}
