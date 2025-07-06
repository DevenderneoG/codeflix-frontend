import AddAgent from "@/components/AddAgent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Agent | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const AgentsPage = () => {
  return (
    <>
      <AddAgent />
    </>
  );
};

export default AgentsPage;
