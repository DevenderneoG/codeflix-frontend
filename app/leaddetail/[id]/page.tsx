"use client";

import LeadDetail from "@/components/Leaddetail";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadDetails } from "@/app/store/leads/leadsSlice";
import { fetchComments } from "@/app/store/comments/commentSlice";
import { AppDispatch } from "@/app/store/store";
import Comments from "@/components/Comments";

const LeadDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const selectedLead = useSelector(
    (state: any) => state.lead.selectedLead
  );
  const status = useSelector((state: any) => state.lead.status);
  const error = useSelector((state: any) => state.lead.error);

  const {
    comments,
    status: commentsStatus,
    error: commentsError,
  } = useSelector((state: any) => state.comment);

  useEffect(() => {
    if (id) {
      dispatch(fetchLeadDetails(id as string));
      dispatch(fetchComments(id as string));
    }
  }, [dispatch, id]);

  if (status === "loading") return <p>Loading lead details...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <>
      {selectedLead ? (
        <>
          <LeadDetail lead={selectedLead} />

          {/* Comments Section */}
          <div className="mt-8">
            <h2 className="text-xl text-black dark:text-white font-bold mb-5">Comments</h2>
            {commentsStatus === "loading" && <p>Loading comments...</p>}
            {commentsStatus === "failed" && <p>Error: {commentsError}</p>}
            <Comments comments={comments} leadId={id as string} authorId={selectedLead?.salesAgent} />
          </div>
        </>
      ) : (
        <p>No lead data found.</p>
      )}
    </>
  );
};

export default LeadDetailsPage;
