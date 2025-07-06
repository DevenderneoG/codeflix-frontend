import AddLead from "@/components/Addlead";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Lead Page | Next.js E-commerce Dashboard Template",
  description: "This is Calendar page for TailAdmin Next.js",
  // other metadata
};

const AddLeadPage = () => {
  return (
    <>
      <AddLead isEditMode={false} />
    </>
  );
};

export default AddLeadPage;
