"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Lead {
  salesAgent: string; // ID
  status: string;
}

interface Agent {
  _id: string;
  name: string;
}

interface ChartFourProps {
  filteredLeads: Lead[];
  agents: Agent[];
}

const ChartFour: React.FC<ChartFourProps> = ({ filteredLeads, agents }) => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const agentMap: Record<string, { name: string; Closed: number; Others: number }> = {};

    // Step 1: Initialize all agents with 0 counts
    agents.forEach((agent) => {
      agentMap[agent._id] = {
        name: agent.name,
        Closed: 0,
        Others: 0,
      };
    });

    // Step 2: Loop through leads and count status
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

    // Step 3: Extract for chart
    const categories = Object.values(agentMap).map((a) => a.name);
    const closedData = Object.values(agentMap).map((a) => a.Closed);
    const othersData = Object.values(agentMap).map((a) => a.Others);

    setCategories(categories);
    setSeries([
      {
        name: "Closed",
        data: closedData,
      },
      {
        name: "Others",
        data: othersData,
      },
    ]);
  }, [filteredLeads, agents]);

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: false,
      toolbar: { show: false },
    },
    colors: ["#10B981", "#FFA70B"],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
        borderRadius: 4,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories,
      title: { text: "Sales Agents" },
      labels: {
        rotate: -45,
        style: { fontSize: "12px" },
      },
    },
    yaxis: {
      title: {
        text: "Number of Leads",
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} leads`,
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5">
      <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
        Leads Closed by Sales Agent
      </h3>

      {categories.length > 0 ? (
        <ApexCharts options={options} series={series} type="bar" height={350} />
      ) : (
        <p className="text-center text-gray-500 text-sm">No leads data available</p>
      )}
    </div>
  );
};

export default ChartFour;
