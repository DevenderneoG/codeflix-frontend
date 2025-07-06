"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Lead {
  status: string;
}

interface ChartThreeProps {
  filteredLeads: Lead[];
}

const ChartOne: React.FC<ChartThreeProps> = ({ filteredLeads }) => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const statusMap: Record<string, number> = {};

    filteredLeads.forEach((lead) => {
      const status = lead.status;
      if (statusMap[status]) {
        statusMap[status] += 1;
      } else {
        statusMap[status] = 1;
      }
    });

    const statuses = Object.keys(statusMap);
    const counts = Object.values(statusMap);

    setLabels(statuses);
    setSeries(counts);
  }, [filteredLeads]);

  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: labels,
    colors: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#22D3EE", "#F472B6"],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} leads`,
      },
    },
    responsive: [
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-6">
      <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
        Lead Status Distribution
      </h3>

      {series.length > 0 ? (
        <div className="flex justify-center">
          <ApexCharts options={options} series={series} type="donut" height={320} />
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">No lead data available</p>
      )}
    </div>
  );
};

export default ChartOne;
