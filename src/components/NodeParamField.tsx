import { taskParam, taskParamType } from "@/types/task";
import React, { useCallback } from "react";
import StringParam from "./param/StringParam";
import { useReactFlow } from "@xyflow/react";
import { ICustomNode } from "@/types/customNode";
import BrowserInstanceParam from "./param/BrowserInstanceParam";
import BooleanParam from "./param/BooleanParam";

const NodeParamField = ({
  input,
  nodeId,
}: {
  input: taskParam;
  nodeId: string;
}) => {
  const { updateNodeData, getNode } = useReactFlow();
  const node = getNode(nodeId) as ICustomNode;

  if (!node?.data.inputs?.[input.name]) {
    if (input.type === taskParamType.BOOLEAN) {
      if (node && node.data) {
        if (!node.data.inputs) {
          node.data.inputs = {};
        }
        node.data.inputs[input.name] = input.value ?? false;
      }
    }
  }

  const value = node?.data.inputs?.[input.name];

  const updateNodeParamValue = useCallback(
    (newValue: string | boolean) => {
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
          value={value as string}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case taskParamType.BOOLEAN:
      return (
        <BooleanParam
          input={input}
          value={value as boolean}
          updateNodeParamValue={updateNodeParamValue}
        />
      );
    case taskParamType.BROWSER_INSTANCE:
      return (
        <BrowserInstanceParam
          input={input}
          value={value as string}
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
