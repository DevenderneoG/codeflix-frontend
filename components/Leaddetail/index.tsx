"use client";

import Link from "next/link";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

const LeadDetail = ({ lead }: { lead: any }) => {
  if (!lead) return <p>No lead data available.</p>;

  return (
    <>
      <Breadcrumb pageName="Lead Detail" />
      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-4">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
            Lead Details
          </h2>
          <div>
            <Link
              href={`/addlead/${lead._id}`}
              className="w-full block rounded bg-primary p-3 font-medium text-gray min-w-[142px] text-center"
            >
              Edit Lead
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ID:
              </span>{" "}
            </p>
            <p>
              <span className="text-sm font-semibold text-black dark:text-white/90">
                {lead._id}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Lead Name:
              </span>{" "}
            </p>
            <p>
              <span className="text-sm font-semibold text-black dark:text-white/90">
                {lead.name}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Sales Agent:
              </span>{" "}
            </p>
            <p>
              <span className="text-sm font-semibold text-black dark:text-white/90">
                {lead.salesAgent}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Lead Source:
              </span>{" "}
            </p>
            <p>
              <span className="text-sm font-semibold text-black dark:text-white/90">
                {lead.source}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Lead Status:
              </span>{" "}
            </p>
            <p>
              <span className="text-sm font-semibold text-black dark:text-white/90">
                {lead.status}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Priority:
              </span>{" "}
            </p>
            <p>
              <span className="text-sm font-semibold text-black dark:text-white/90">
                {lead.priority}
              </span>
            </p>
          </div>
          <div>
            <p>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Time to Close:
              </span>{" "}
            </p>
            <p>
              <span className="text-sm font-semibold text-black dark:text-white/90">
                {lead.timeToClose} Days
              </span>
            </p>
          </div>
        </div>

        {/* Add more fields as needed */}
      </div>
    </>
  );
};

export default LeadDetail;
