"use client";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { fetchAgents } from "../../app/store/agents/agentsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TableOne from "../Tables/TableOne";

const Agents = () => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state: any) => state.agent);
  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  return (
    <>
      <Breadcrumb pageName="Agents" />
      <div className="flex flex-col gap-10">
        <TableOne agents={agents} />       
      </div>
    </>
  );
};

export default Agents;
