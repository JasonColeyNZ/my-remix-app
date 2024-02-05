import React from "react";
import { Card, CardContent } from "~/components/ui/card";

const Filters = () => {
  return (
    <Card>
      <CardContent>
        <div className="flex w-full gap-4">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2">
                <div className="text-xs font-bold">Team Member</div>
                <input
                  type="text"
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <div className="text-xs font-bold">Period</div>
                <input
                  type="text"
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col w-1/2">
                <div className="text-xs font-bold">Start Date</div>
                <input
                  type="date"
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <div className="text-xs font-bold">End Date</div>
                <input
                  type="date"
                  className="w-full p-1 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Filters;
