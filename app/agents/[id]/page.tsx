import Agents from "@/components/Agents";
import AgentsView from "@/components/AgentsView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agents Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const AgentsViewPage = () => {
  return (
    <>
      <AgentsView />
    </>
  );
};

export default AgentsViewPage;
