import { Link, useLocation } from "@remix-run/react";
import type { TabType } from "~/utils/types";

interface Props {
  tabs: TabType[];
  id: string;
}

const Tabs = ({ tabs, id }: Props) => {
  const location = useLocation();
  return (
    <div>
      <div
        className="text-sm font-medium text-center text-gray-500 border-b 
          border-gray-200 dark:text-gray-400 dark:border-gray-700"
      >
        <ul className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <li key={tab.url} className="mr-2">
              <Link
                to={`${tab.url}?id=${id}`}
                className={`${
                  location && location.pathname.indexOf(tab.url) !== -1
                    ? "inline-block px-4 py-3 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500"
                    : "inline-block px-4 py-3 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                }`}
                // aria-current={
                //   location.pathname.indexOf(tab.url) !== -1 ? "page" : ""
                // }
              >
                {tab.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tabs;
