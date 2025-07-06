import Agents from "@/components/Agents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lead Status Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const LeadStatusPage = () => {
  return (
    <>
      <Agents />
    </>
  );
};

export default LeadStatusPage;
