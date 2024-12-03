import { cn } from "@/lib/utils";
import { taskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";

const NodeInput = ({ input, nodeId }: { input: taskParam; nodeId: string }) => {
  return (
    <div className="flex justify-start relative p-3 bg-white dark:bg-black w-full">
      <NodeParamField input={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type={input.type === "BROWSER_INSTANCE" ? "target" : "source"}
          position={Position.Left}
          className={cn(
            "!bg-black dark:!bg-white !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
};

export default NodeInput;
