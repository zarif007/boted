import { ICustomNode } from "@/types/customNode";
import {
  IWorkflowExecutionPlan,
  IWorkflowExecutionPlanPhase,
} from "@/types/workflow";
import { Edge, getIncomers } from "@xyflow/react";
import { taskRegistry } from "./task/registry";

export const flowExecutionPlan = (nodes: ICustomNode[], edges: Edge[]) => {
  const entryPoint = nodes.find(
    (node) => taskRegistry[node.data.type].isEntryPoint
  );

  let planned = new Set<string>();

  if (!entryPoint) {
    throw Error("No Valid Entry point");
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
          console.error("Invalid inputs", currentNode.id, invalidInputs);
          throw Error("Invalid inputs");
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
    const inputValueProvided = inputValue?.length > 0;

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
