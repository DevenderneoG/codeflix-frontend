import Link from "next/link";


const TableOne = ({ agents } : any) => {
  console.log("Agents in TableOne:", agents);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="mb-6 flex items-center justify-between">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Agents List
        </h4>
        <div>
          <Link
            href={"/agents/addagent"}
            className="mt-4 flex w-full justify-center rounded bg-primary p-3 font-medium text-white min-w-[140px]"
          >
            Add Agent
          </Link>
        </div>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-5 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
          <div className="p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Name
            </h5>
          </div>
          <div className="p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Email
            </h5>
          </div>
        </div>

        {agents.map((agent, key) => (
          <div
            className={`grid grid-cols-5 sm:grid-cols-5 ${
              key === agents.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block font-bold">
                <Link href={`/agents/${agent._id}`}>{agent.name}</Link>
              </p>
            </div>

            <div className="flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{agent.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
