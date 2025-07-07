
import ReportsClient from "@/components/ReportsClient/ReportsClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reports Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const ReportsPage = () => {
  return (
    <>
      <ReportsClient />
    </>
  );
};

export default ReportsPage;
