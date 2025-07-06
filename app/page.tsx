import Leads from "@/components/Dashboard/Leads";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Codeflix CRM App | Next.js Lead Management App",
  description: "This is Home Blog page for Codeflix Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
     <Leads />
    </>
  );
}
