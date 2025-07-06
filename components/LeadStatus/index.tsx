import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useState, useMemo, useEffect } from "react";
import { fetchAgents } from "../../app/store/agents/agentsSlice";

const LeadStatus = () => {
  const dispatch = useDispatch();
  const statusLeads = useSelector((state: RootState) => state.lead.statusLeads);
  const { agents } = useSelector((state: any) => state.agent);

  const [selectedAgent, setSelectedAgent] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  const agentMap = useMemo(() => {
    const map: { [key: string]: string } = {};
    agents.forEach((a: any) => (map[a._id] = a.name));
    return map;
  }, [agents]);

  // Get unique agent IDs and priorities
  const uniqueAgentIds = [
    ...new Set(statusLeads.map((lead) => lead.salesAgent)),
  ];
  const priorities = [...new Set(statusLeads.map((lead) => lead.priority))];

  // Apply filter and sort
  const filteredLeads = useMemo(() => {
    let leads = [...statusLeads];

    if (selectedAgent) {
      leads = leads.filter((lead) => lead.salesAgent === selectedAgent);
    }

    if (selectedPriority) {
      leads = leads.filter((lead) => lead.priority === selectedPriority);
    }

    leads.sort((a, b) =>
      sortOrder === "asc"
        ? a.timeToClose - b.timeToClose
        : b.timeToClose - a.timeToClose
    );

    return leads;
  }, [statusLeads, selectedAgent, selectedPriority, sortOrder]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Leads with status: {statusLeads[0]?.status}
        </h1>
        <div className="flex flex-row items-center gap-4">
          <div className="relative w-full min-w-[200px]">
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400 dark:bg-dark-900"
            >
              <option value="">All</option>
              {uniqueAgentIds.map((agentId) => (
                <option key={agentId} value={agentId} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                  {agentMap[agentId] || agentId}
                </option>
              ))}
            </select>
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.792 7.396 10 12.604l5.208-5.208"
                ></path>
              </svg>
            </span>
          </div>

          <div className="relative w-full min-w-[200px]">
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400 dark:bg-dark-900"
            >
              <option value="" className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">All</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority} className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">
                  {priority}
                </option>
              ))}
            </select>
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.792 7.396 10 12.604l5.208-5.208"
                ></path>
              </svg>
            </span>
          </div>

          <div className="relative w-full min-w-[200px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="h-11 w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 text-gray-400 dark:text-gray-400 dark:bg-dark-900"
            >
              <option value="asc" className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">Low to High</option>
              <option value="desc" className="text-gray-700 dark:bg-gray-900 dark:text-gray-400">High to Low</option>
            </select>
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.792 7.396 10 12.604l5.208-5.208"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Leads List */}
      <ul className="space-y-3">
        {filteredLeads.map((lead) => (
          <li key={lead._id} className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark">
            <p className="text-title-md font-bold text-black dark:text-white mb-4">{lead.name}</p>
            <p className="text-lg font-normal"><span className="text-black dark:text-white font-semibold">Status:</span> {lead.status}</p>
            <p className="text-lg font-normal"><span className="text-black dark:text-white font-semibold">Source:</span> {lead.source}</p>
            <p className="text-lg font-normal"><span className="text-black dark:text-white font-semibold">Priority:</span> {lead.priority}</p>
            <p className="text-lg font-normal"><span className="text-black dark:text-white font-semibold">Time to Close:</span> {lead.timeToClose}</p>
            <p className="text-lg font-normal"><span className="text-black dark:text-white font-semibold">Sales Agent:</span> {agentMap[lead.salesAgent] || lead.salesAgent}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeadStatus;
