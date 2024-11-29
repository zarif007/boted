import React, { memo } from "react";
import NodeCard from "./NodeCard";
import { NodeProps } from "@xyflow/react";
import NodeHeader from "./NodeHeader";
import { ICustomNodeData } from "@/types/customNode";
import { taskRegistry } from "@/lib/workflow/task/registry";
import NodeInputs from "./NodeInputs";
import NodeInput from "./NodeInput";

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as ICustomNodeData;
  const task = taskRegistry[nodeData.type];
  return (
    <NodeCard nodeId={props.id} isSelected={!!props.selected}>
      <NodeHeader taskType={nodeData.type} />
      <NodeInputs>
        {task.inputs.map((input, index) => (
          <NodeInput key={index} input={input} />
        ))}
      </NodeInputs>
    </NodeCard>
  );
});

export default NodeComponent;

NodeComponent.displayName = "NodeComponent";
