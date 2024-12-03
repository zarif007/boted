import { taskParam, taskParamType } from "@/types/task";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { ICustomNode } from "@/types/customNode";

const NodeParamField = ({
  input,
  nodeId,
}: {
  input: taskParam;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as ICustomNode;
  const value = node?.data.inputs?.[input.name];

  const updateNodeParamValue = useCallback(
    (newValue: string) => {
      updateNodeData(nodeId, {
        inputs: {
          ...node?.data.inputs,
          [input.name]: newValue,
        },
      });
    },
    [nodeId, updateNodeData, input.name, node?.data.inputs]
  );

  switch (input.type) {
    case taskParamType.STRING:
      return (
        <StringParam
          input={input}
          value={value}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">NOT implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
