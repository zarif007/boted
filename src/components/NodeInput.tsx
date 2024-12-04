import { cn } from "@/lib/utils";
import { taskParam } from "@/types/task";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";

const NodeInput = ({ input, nodeId }: { input: taskParam; nodeId: string }) => {
  return (
    <div className="flex justify-start relative p-3 bg-white dark:bg-black w-full">
      <NodeParamField input={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-black dark:!bg-white !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
};

export default NodeInput;
