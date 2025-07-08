// "use client";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "next/navigation";
// import { fetchLeadStatus } from "@/app/store/leads/leadsSlice";
// import LeadStatus from "@/components/LeadStatus";

// const LeadStatusPage = () => {
//   const dispatch = useDispatch();
//   const params = useParams();
//   const statusname = params.statusname as string;

//   const statusLeads = useSelector((state: any) => state.lead.statusLeads);
//   const status = useSelector((state: any) => state.lead.status);
//   const error = useSelector((state: any) => state.lead.error);

//   useEffect(() => {
//     if (statusname) {
//       dispatch(fetchLeadStatus(statusname));
//     }
//   }, [dispatch, statusname]);

//   return (
//     <div className="">  
//       {status === "loading" && <p>Loading...</p>}
//       {status === "failed" && <p className="text-red-500">{error}</p>}

//       {status === "succeeded" && statusLeads.length > 0 ? (
//         <LeadStatus statusLeads={statusLeads} />
//       ) : (
//         status === "succeeded" && <p>No leads found for status: {statusname}</p>
//       )}     
//     </div>
//   );
// };

// export default LeadStatusPage;

"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchLeadStatus } from "@/app/store/leads/leadsSlice";
import LeadStatus from "@/components/LeadStatus";
import { useAppDispatch } from "../../store/hooks"; // <-- import this

const LeadStatusPage = () => {
  const dispatch = useAppDispatch(); // <-- use typed dispatch
  const params = useParams();
  const statusname = params.statusname as string;

  const statusLeads = useSelector((state: any) => state.lead.statusLeads);
  const status = useSelector((state: any) => state.lead.status);
  const error = useSelector((state: any) => state.lead.error);

  useEffect(() => {
    if (statusname) {
      dispatch(fetchLeadStatus(statusname));
    }
  }, [dispatch, statusname]);

  return (
    <div className="">
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}

      {status === "succeeded" && statusLeads.length > 0 ? (
        <LeadStatus statusLeads={statusLeads} />
      ) : (
        status === "succeeded" && <p>No leads found for status: {statusname}</p>
      )}
    </div>
  );
};

export default LeadStatusPage;

