import React from "react";
import Section from "../Section";
import { useLoaderData } from "@remix-run/react";
import type { loader } from "../../route";

const Consents = () => {
  const { consents } = useLoaderData<typeof loader>();
  return (
    <Section header="Client Consents">
      <div className="flex flex-col gap-2">
        {consents?.map((consent) => {
          return (
            <div
              key={consent.id}
              className="flex py-1 px-2 rounded-2xl border-[1px] border-green-500 bg-green-100"
            >
              <div className="text-xs text-green-600">{consent.name}</div>
            </div>
          );
        })}
      </div>
    </Section>
  );
};

export default Consents;
