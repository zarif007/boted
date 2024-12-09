"use server";

import { flowExecutionPlan } from "@/lib/workflow/flowExecutionPlan";
import { IWorkflowExecutionPlan } from "@/types/workflow";

export const RunWorkflow = async (form: {
  workflowId: string;
  flowDefinition?: string;
}) => {
  const { workflowId, flowDefinition } = form;

  if (!flowDefinition) {
    throw new Error("Flow is not valid");
  }

  const flow = JSON.parse(flowDefinition);
  const result = flowExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error("Flow definition is not valid");
  }

  if (!result.executionPlan) {
    throw new Error("No execution plan is generated");
  }

  const executionPlan: IWorkflowExecutionPlan = result.executionPlan;
  console.log("Execution plan for workflow", workflowId, executionPlan);

  return executionPlan;
};
