"use client";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { fetchAgents } from "../../app/store/agents/agentsSlice";
import { fetchLeads } from "../../app/store/leads/leadsSlice";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useParams } from "next/navigation";

// Pass this via route param or props
// const agentId = "6852c17e072a0a857c7980eb"; // <-- Replace with dynamic value

const AgentsView = () => {
  const { id: agentId } = useParams();
  const dispatch = useDispatch();
  const { agents } = useSelector((state: any) => state.agent);
  const { leads } = useSelector((state: any) => state.lead);

  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    dispatch(fetchAgents());
    dispatch(fetchLeads());
  }, [dispatch]);

  // Get only leads for this agent
  const agentLeads = useMemo(() => {
    let filtered = leads.filter((lead: any) => lead.salesAgent === agentId);

    if (selectedStatus) {
      filtered = filtered.filter((lead: any) => lead.status === selectedStatus);
    }

    if (selectedPriority) {
      filtered = filtered.filter(
        (lead: any) => lead.priority === selectedPriority
      );
    }

    filtered.sort((a: any, b: any) =>
      sortOrder === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose
    );

    return filtered;
  }, [leads, selectedStatus, selectedPriority, sortOrder]);

  // Agent details
  const agent = agents.find((a: any) => a._id === agentId);

  const allStatuses = [
    ...new Set(
      leads
        .filter((lead: any) => lead.salesAgent === agentId)
        .map((l: any) => l.status)
        .filter(Boolean)
    ),
  ];

  const allPriorities = [
    ...new Set(
      leads
        .filter((lead: any) => lead.salesAgent === agentId)
        .map((l: any) => l.priority)
        .filter(Boolean)
    ),
  ];

  return (
    <>
      <Breadcrumb pageName="Agent View" />

      {/* Filters */}
      <div className="mb-6 flex gap-4 flex-wrap">
        <div>
          <label className="mr-2 font-semibold">Status:</label>
          <select
            className="border rounded px-2 py-1"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All</option>
            {allStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Priority:</label>
          <select
            className="border rounded px-2 py-1"
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="">All</option>
            {allPriorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Sort by Time to Close:</label>
          <select
            className="border rounded px-2 py-1"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>
      </div>

      {/* Agent Leads */}
      <div className="mb-8 border rounded p-4 shadow">
        <h2 className="text-xl font-bold mb-4">
          Sales Agent: {agent?.name || "Loading..."}
        </h2>
        {agentLeads.length > 0 ? (
          <ul className="space-y-3">
            {agentLeads.map((lead: any) => (
              <li
                key={lead._id}
                className="p-3 border rounded bg-gray-50 shadow-sm"
              >
                <p className="font-semibold">{lead.name}</p>
                <p>Status: {lead.status}</p>
                <p>Priority: {lead.priority}</p>
                <p>Time to Close: {lead.timeToClose}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No data found.</p>
        )}
      </div>
    </>
  );
};

export default AgentsView;
