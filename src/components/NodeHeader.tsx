import { taskRegistry } from "@/lib/workflow/task/registry";
import { taskType } from "@/types/task";
import React from "react";

const NodeHeader = ({ taskType }: { taskType: taskType }) => {
  const task = taskRegistry[taskType];
  return (
    <div className="flex items-center gap-2 p-2">
      <div className="flex items-center justify-center w-full">
        <p className="text-xs font-bold uppercase">{task.label}</p>
      </div>
    </div>
  );
};

export default NodeHeader;
