"use client";
import { useState, useEffect } from "react";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import { useDispatch, useSelector } from "react-redux";
import {
  addLeads,
  fetchLeadDetails,
  updateLead,
} from "../../app/store/leads/leadsSlice";
import { fetchAgents } from "../../app/store/agents/agentsSlice";
import { useParams, useRouter } from "next/navigation";

const AddLead = ({ isEditMode = false }: { isEditMode?: boolean }) => {
  const { id } = useParams(); // if `id` exists => edit mode
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedLead } = useSelector((state: any) => state.lead);
  const { agents } = useSelector((state: any) => state.agent);
  const tagOptions = ["High Value", "Follow-up", "Cold", "Interested"];
  
  const [formData, setFormData] = useState({
    name: "",
    source: "",
    salesAgent: "",
    status: "",
    tags: [],
    timeToClose: "",
    priority: "",
  });

  useEffect(() => {
    dispatch(fetchAgents());

    if (id) {
      dispatch(fetchLeadDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id && selectedLead) {
      setFormData(selectedLead);
    }
  }, [selectedLead, id]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev: any) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t: string) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (id) {
        await dispatch(updateLead({ id, updatedData: formData })).unwrap();
        alert("Lead updated!");
      } else {
        await dispatch(addLeads(formData)).unwrap();
        alert("Lead added!");
      }
      router.push("/");
    } catch (err: any) {
      console.error(err);
      alert("Failed to submit lead: " + (err.message || "Unknown error"));
    }
  };

  return (
    <>
      <Breadcrumb pageName={isEditMode ? "Edit Lead" : "Add New Lead"} />
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
          <div className="flex flex-col gap-9">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  {isEditMode ? "Edit Lead Form" : "Add New Lead Form"}
                </h3>
              </div>
              <div className="p-6.5">
                <InputField
                  label="Lead Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                />
                <SelectField
                  label="Lead Source"
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  options={[
                    "Website",
                    "Referral",
                    "Cold Call",
                    "Advertisement",
                    "Email",
                    "Other",
                  ]}
                />
                <SelectField
                  label="Assigned Sales Agent"
                  name="salesAgent"
                  value={formData.salesAgent}
                  onChange={handleChange}
                  options={agents.map((agent: any) => ({
                    label: agent.name,
                    value: agent._id,
                  }))}
                />
                <SelectField
                  label="Lead Status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  options={[
                    "New",
                    "Contacted",
                    "Qualified",
                    "Proposal Sent",
                    "Closed",
                  ]}
                />
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <span
                        key={tag}
                        onClick={() => handleTagToggle(tag)}
                        className={`cursor-pointer rounded-full px-3 py-1 text-sm border ${
                          formData.tags.includes(tag)
                            ? "bg-primary text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <InputField
                  label="Time to Close (in days)"
                  name="timeToClose"
                  type="number"
                  value={formData.timeToClose}
                  onChange={handleChange}
                />
                <SelectField
                  label="Priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  options={["High", "Medium", "Low"]}
                />
                <button
                  type="submit"
                  className="mt-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-white"
                >
                  {isEditMode ? "Update Lead" : "Add Lead"}
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

const SelectField = ({ label, name, value, onChange, options }: any) => (
  <div className="mb-4.5">
    <label className="mb-2.5 block text-black dark:text-white">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input"
    >
      <option value="">Select {label}</option>
      {options.map((opt: any) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
  </div>
);

export default AddLead;
