import { cn } from "@/lib/utils";
import { taskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";

const NodeInput = ({ input }: { input: taskParam }) => {
  return (
    <div className="flex justify-start relative p-3 bg-gray-50 w-full">
      <NodeParamField input={input} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
};

export default NodeInput;
