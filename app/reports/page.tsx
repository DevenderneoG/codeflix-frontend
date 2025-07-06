
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartOne from "@/components/Charts/ChartOne";
import ChartThree from "@/components/Charts/ChartThree";
import ChartTwo from "@/components/Charts/ChartTwo";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../../app/store/leads/leadsSlice";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { fetchAgents } from "../../app/store/agents/agentsSlice";
import {
  fetchClosedLeads,
  fetchPipeline,
} from "../../app/store/reports/reportsSlice";

export const metadata: Metadata = {
  title: "Reports Page | Next.js E-commerce Dashboard Template",  
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const ReportsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const dispatch = useDispatch();
  const {
    leads,
    status: productStatus,
    error: productError,
  } = useSelector((state) => state.lead);
  const { agents } = useSelector((state: any) => state.agent);
  const { closedLeads, pipelineCount } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchLeads());
    dispatch(fetchAgents());
    dispatch(fetchClosedLeads());
    dispatch(fetchPipeline());
  }, [dispatch]);

  const statusCounts = leads.reduce(
    (acc: { [x: string]: any }, lead: { status: string | number }) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    },
    {}
  );

  const filteredLeads = selectedStatus
    ? leads.filter((lead: { status: string }) => lead.status === selectedStatus)
    : leads;

  return (
    <>
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
        <ChartThree filteredLeads={filteredLeads}  closedLeads={closedLeads}
          pipelineCount={pipelineCount} />
        <ChartOne filteredLeads={filteredLeads} />
        <div className="col-span-12">
          <ChartTwo filteredLeads={filteredLeads} agents={agents} />
        </div>
        {/* <ChartFour filteredLeads={filteredLeads} agents={agents} /> */}
      </div>
    </>
  );
};

export default ReportsPage;
