"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeads,
  fetchLeadDetails,
  updateLead,
} from "../../app/store/leads/leadsSlice";
import { fetchAgents, addAgent } from "../../app/store/agents/agentsSlice";
import { useParams, useRouter } from "next/navigation";

const AddAgent = ({ isEditMode = false }: { isEditMode?: boolean }) => {
  const { id } = useParams(); // if `id` exists => edit mode
  const router = useRouter();
  const dispatch = useDispatch();

  //   const { selectedLead } = useSelector((state: any) => state.lead);
  //   const { agents } = useSelector((state: any) => state.agent);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await dispatch(addAgent(formData)).unwrap();
      router.push("/agents");
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit lead: " + (err.message || "Unknown error"));
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode ? "Edit Lead" : "Add New Sales Agent"} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {isEditMode ? "Edit Lead Form" : "Add New Agent Form"}
                </h3>
              </div>
              <div className="p-6.5">
                <InputField
                  label="Agent Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />

                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="mt-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
                >
                  {isEditMode ? "Update Agent" : "Create Agent"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: any) => (
  <div className="mb-4.5">
    <label className="mb-2.5 block text-black dark:text-white">
      {label} {required && <span className="text-meta-1">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
    />
  </div>
);

export default AddAgent;
