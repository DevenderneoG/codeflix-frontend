// "use client";
// import { ApexOptions } from "apexcharts";
// import React, { useState, useEffect } from "react";
// import dynamic from "next/dynamic";

// const ReactApexChart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

// interface ChartThreeProps {
//   filteredLeads: any[];
// }

// const ChartThree: React.FC<ChartThreeProps> = ({ filteredLeads }) => {
//   const pipelineStatuses = ["New", "Qualified", "Contacted", "Proposal Sent"];

//   const closedLeadsCount = filteredLeads.filter(
//     (lead) => lead.status === "Closed"
//   ).length;

//   const pipelineLeadsCount = filteredLeads.filter((lead) =>
//     pipelineStatuses.includes(lead.status)
//   ).length;

//   const [series, setSeries] = useState<number[]>([0, 0]);

//   useEffect(() => {
//     setSeries([closedLeadsCount, pipelineLeadsCount]);
//   }, [filteredLeads]);

//   const options: ApexOptions = {
//     chart: {
//       type: "donut",
//     },
//     labels: ["Closed", "Pipeline"],
//     colors: ["#10B981", "#259AE6"],
//     legend: {
//       show: true,
//       position: "bottom",
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           size: "65%",
//         },
//       },
//     },
//     dataLabels: {
//       enabled: false,
//     },
//     responsive: [
//       {
//         breakpoint: 640,
//         options: {
//           chart: {
//             width: 200,
//           },
//         },
//       },
//     ],
//   };

//   return (
//     <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
//       <h5 className="mb-4 text-xl font-semibold text-black dark:text-white">
//         Lead Status Overview
//       </h5>

//       {filteredLeads.length > 0 ? (
//         <>
//           <div className="flex justify-center mb-4">
//             <ReactApexChart
//               options={options}
//               series={series}
//               type="donut"
//               height={250}
//             />
//           </div>

//           <div className="flex justify-around text-sm font-medium text-black dark:text-white">
//             <div className="flex items-center gap-2">
//               <span className="block h-3 w-3 rounded-full bg-[#10B981]"></span>
//               Closed ({series[0]})
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="block h-3 w-3 rounded-full bg-[#259AE6]"></span>
//               Pipeline ({series[1]})
//             </div>
//           </div>
//         </>
//       ) : (
//         <p className="text-center text-sm text-gray-500">No leads found</p>
//       )}
//     </div>
//   );
// };

// export default ChartThree;

"use client";
import { ApexOptions } from "apexcharts";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartThreeProps {
  filteredLeads: any[];
  closedLeads: number;
  pipelineCount: number;
}

const ChartThree: React.FC<ChartThreeProps> = ({
  filteredLeads,
  closedLeads,
  pipelineCount,
}) => {
  const [series, setSeries] = useState<number[]>([0, 0]);

  useEffect(() => {
    setSeries([closedLeads, pipelineCount]);
  }, [closedLeads, pipelineCount]);

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: ["Closed", "Pipeline"],
    colors: ["#10B981", "#259AE6"],
    legend: {
      show: true,
      position: "bottom",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <h5 className="mb-4 text-xl font-semibold text-black dark:text-white">
        Lead Status Overview
      </h5>

      {/* {filteredLeads.length > 0 ? (
        <>
          <div className="flex justify-center mb-4">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={250}
            />
          </div>

          <div className="flex justify-around text-sm font-medium text-black dark:text-white">
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-[#10B981]"></span>
              Closed ({series[0]})
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-[#259AE6]"></span>
              Pipeline ({series[1]})
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-sm text-gray-500">No leads found</p>
      )} */}

      {closedLeads + pipelineCount > 0 ? (
        <>
          <div className="flex justify-center mb-4">
            <ReactApexChart
              options={options}
              series={series}
              type="donut"
              height={250}
            />
          </div>

          <div className="flex justify-around text-sm font-medium text-black dark:text-white">
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-[#10B981]"></span>
              Closed ({series[0]})
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-3 w-3 rounded-full bg-[#259AE6]"></span>
              Pipeline ({series[1]})
            </div>
          </div>
        </>
      ) : (
        <p className="text-center text-sm text-gray-500">
          No closed or pipeline leads found in the last 7 days.
        </p>
      )}
    </div>
  );
};

export default ChartThree;
