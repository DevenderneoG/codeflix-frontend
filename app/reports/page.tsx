
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
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
      <Breadcrumb pageName="Chart" />

      <div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
       <ReportsClient />
      </div>
    </>
  );
};

export default ReportsPage;
