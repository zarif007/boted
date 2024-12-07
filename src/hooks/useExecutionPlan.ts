import { flowExecutionPlan } from "@/lib/workflow/flowExecutionPlan";
import { ICustomNode } from "@/types/customNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan } = flowExecutionPlan(nodes as ICustomNode[], edges);

    return executionPlan;
  }, [toObject]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
