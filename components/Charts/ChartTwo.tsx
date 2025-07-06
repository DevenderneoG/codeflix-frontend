"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Lead {
  salesAgent: string;
  status: string;
}

interface Agent {
  _id: string;
  name: string;
}

interface ChartTwoProps {
  filteredLeads: Lead[];
  agents: Agent[];
}

const ChartTwo: React.FC<ChartTwoProps> = ({ filteredLeads, agents }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const agentMap: Record<string, { name: string; Closed: number; Others: number }> = {};

    agents.forEach((agent) => {
      agentMap[agent._id] = { name: agent.name, Closed: 0, Others: 0 };
    });

    filteredLeads.forEach((lead) => {
      const agentId = lead.salesAgent;
      const isClosed = lead.status === "Closed";

      if (agentMap[agentId]) {
        if (isClosed) {
          agentMap[agentId].Closed += 1;
        } else {
          agentMap[agentId].Others += 1;
        }
      }
    });

    const categories = Object.values(agentMap).map((a) => a.name);
    const closedData = Object.values(agentMap).map((a) => a.Closed);
    const othersData = Object.values(agentMap).map((a) => a.Others);

    setCategories(categories);
    setSeries([
      { name: "Closed", data: closedData },
      { name: "Others", data: othersData },
    ]);
  }, [filteredLeads, agents]);

  const options: ApexOptions = {
    colors: ["#10B981", "#F59E0B"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "25%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories,
      title: { text: "Sales Agents" },
      labels: { rotate: -45, style: { fontSize: "12px" } },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontSize: "14px",
      markers: { radius: 99 },
    },
    fill: { opacity: 1 },
    tooltip: {
      y: {
        formatter: (val) => `${val} leads`,
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <div className="mb-4">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Leads by Sales Agent
        </h4>
      </div>

      <div>
        {categories.length > 0 ? (
          <ApexCharts options={options} series={series} type="bar" height={350} />
        ) : (
          <p className="text-center text-gray-500 text-sm">No leads data available</p>
        )}
      </div>
    </div>
  );
};

export default ChartTwo;
