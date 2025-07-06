import Agents from "@/components/Agents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agents Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const AgentsPage = () => {
  return (
    <>
      <Agents />
    </>
  );
};

export default AgentsPage;
