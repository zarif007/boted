import { ICustomNode, ICustomNodeMissingInputs } from "@/types/customNode";
import {
  IWorkflowExecutionPlan,
  IWorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge } from "@xyflow/react";
import { taskRegistry } from "./task/registry";
import { toast } from "sonner";

export enum flowTotExecutionPlanValidationError {
  "NO_ENTRY_POINT",
  "INVALID_INPUTS",
}

type flowExecutionPlanType = {
  executionPlan?: IWorkflowExecutionPlan;
  error?: {
    type: flowTotExecutionPlanValidationError;
    invalidElements?: ICustomNodeMissingInputs[];
  };
};

export const flowExecutionPlan = (nodes: ICustomNode[], edges: Edge[]) => {
  const entryPoint = nodes.find(
    (node) => taskRegistry[node.data.type].isEntryPoint
  );

  const planned = new Set<string>();
  const inputsWithErrors: ICustomNodeMissingInputs[] = [];

  const invalidInputs = getInvalidInputs(entryPoint!, edges, planned);
  if (invalidInputs.length) {
    inputsWithErrors.push({
      nodeId: entryPoint?.id ?? "",
      inputs: invalidInputs,
    });
  }

  if (!entryPoint) {
    return {
      error: {
        type: flowTotExecutionPlanValidationError.NO_ENTRY_POINT,
      },
    };
  }

  const executionPlan: IWorkflowExecutionPlan = [
    {
      phase: 1,
      nodes: [entryPoint],
    },
  ];
  planned.add(entryPoint.id);

  for (
    let phase = 2;
    phase <= nodes.length || planned.size < nodes.length;
    phase++
  ) {
    const nextPhase: IWorkflowExecutionPlanPhase = { phase, nodes: [] };

    for (const currentNode of nodes) {
      if (planned.has(currentNode.id)) continue;

      const invalidInputs = getInvalidInputs(currentNode, edges, planned);

      if (invalidInputs.length) {
        const incomers = getIncomers(currentNode, nodes, edges);
        if (incomers.every((incomer) => planned.has(incomer.id))) {
          console.log(currentNode, planned);
          toast.error("Invalid inputs");
          inputsWithErrors.push({
            nodeId: currentNode?.id ?? "",
            inputs: invalidInputs,
          });
        } else {
          continue;
        }
      }

      nextPhase.nodes.push(currentNode);
    }

    for (const node of nextPhase.nodes) {
      planned.add(node.id);
    }

    executionPlan.push(nextPhase);
  }

  if (inputsWithErrors.length) {
    return {
      error: {
        type: flowTotExecutionPlanValidationError.INVALID_INPUTS,
        invalidElements: inputsWithErrors,
      },
    };
  }

  return { executionPlan };
};

const getInvalidInputs = (
  node: ICustomNode,
  edges: Edge[],
  planned: Set<string>
) => {
  const invalidInputs = [];
  const inputs = taskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];
    const inputValueProvided =
      (typeof inputValue === "string" && inputValue?.length > 0) ||
      typeof inputValue === "boolean";

    if (inputValueProvided) continue;

    const incomingEdges = edges.filter((edge) => edge.target === node.id);

    const inputLinkToOutput = incomingEdges.find(
      (edge) => edge.targetHandle === input.name
    );

    const requiredInputProvidedByVisitedOutput =
      input.required &&
      inputLinkToOutput &&
      planned.has(inputLinkToOutput.source);

    // Checking for valid inputs
    if (requiredInputProvidedByVisitedOutput) {
      continue;
    } else if (!input.required) {
      if (!inputLinkToOutput) continue;
      if (inputLinkToOutput && planned.has(inputLinkToOutput.source)) {
        continue;
      }
    }

    invalidInputs.push(input.name);
  }

  return invalidInputs;
};

const getIncomers = (
  node: ICustomNode,
  nodes: ICustomNode[],
  edges: Edge[]
) => {
  if (!node.id) {
    return [];
  }

  const inComersIds = new Set();

  edges.forEach((edge) => {
    if (edge.target === node.id) {
      inComersIds.add(edge.source);
    }
  });

  return nodes.filter((node) => inComersIds.has(node.id));
};
