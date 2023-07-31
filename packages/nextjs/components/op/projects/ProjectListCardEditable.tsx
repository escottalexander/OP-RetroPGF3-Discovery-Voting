import React, { useState } from "react";
import Image from "next/image";
import OPInput from "../input/OPInput";
import { IProjectData } from "./ProjectList";
import { TrashIcon } from "@heroicons/react/24/outline";

const ProjectListCardEditable: React.FC<{
  projectData: IProjectData[];
  listAllocation?: IProjectData[];
  emitTotal: (total: number) => void;
}> = ({ projectData, emitTotal, listAllocation = [] }) => {
  const handleChange = (index: number, value: number) => {
    const total = projectData.reduce((a, b) => a + Number(b.op), 0);
    const newTotal = total - Number(projectData[index].op) + value;
    setTotalOP(newTotal);
    // emit the current state
    emitTotal(totalOP);
  };

  const [totalOP, setTotalOP] = useState(projectData.reduce((a, b) => a + Number(b.op), 0));
  return (
    <div>
      {projectData.map((project: IProjectData, index: number) => (
        <div
          key={index}
          className={`border-[#ccd2db] py-6 ${
            index === projectData.length - 1 ? "" : "border-b-2"
          }  grid grid-flow-col items-center justify-between `}
        >
          <div className={`${!project.handle && "items-center"} grid  grid-flow-col gap-4`}>
            <div className={` ${project.handle ? "w-[80px]" : "w-[60px]"}`}>
              <Image
                alt="project list"
                height={"80"}
                width={"80"}
                src="/assets/gradient-bg.png"
                className="w-full rounded-xl"
              />
            </div>
            <div className="">
              <h3 className="font-bold text-lg">{project.name}</h3>
              {project.handle && <p className="mt-0 text-[1.1rem] text-[#7f97b0]">@{project.handle}</p>}
            </div>
          </div>
          <div className="flex flex-row">
            {listAllocation[index] ? (
              <OPInput
                index={index}
                value={listAllocation[index].op}
                handleChange={() => {
                  return;
                }}
                customClassesGroup="mr-2 pointer-events-none"
                customClassesInput="pointer-events-none text-[#8496AE] bg-[#E2E8F0] border-neutral cursor-default"
                customClassesSpan="bg-[#E2E8F0] text-[#8496AE] border-neutral pointer-events-none"
              />
            ) : (
              ""
            )}
            <OPInput index={index} value={project.op} handleChange={handleChange} />
            <button
              onClick={() => {
                console.log("remove");
              }}
              className={`ml-2 btn-md flex items-center rounded-xl p-3 border-[1px] border-slate-200`}
            >
              <TrashIcon className="w-6 h-6 " />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectListCardEditable;
