import { cn } from "@/lib/utils";
import { taskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { ColorForHandle } from "./common";

const NodeOutput = ({ output }: { output: taskParam }) => {
  return (
    <div className="flex justify-end relative p-3 bg-white dark:bg-black w-full">
      <p>{output.name}</p>
      {!output.hideHandle && (
        <Handle
          id={output.name}
          type="source"
          position={Position.Right}
          className={cn(
            "!bg-black dark:!bg-white !border-2 !border-background !-right-2 !w-4 !h-4",
            ColorForHandle[output.type]
          )}
        />
      )}
    </div>
  );
};

export default NodeOutput;
