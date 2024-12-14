import { ICustomNode } from "@/types/customNode";
import { IWorkflowExecutionPlan } from "@/types/workflow";
import "server-only";
import { executeRegistry } from "./executor/registry";
import { IEnvironment, IExecutionEnvironment } from "@/types/executor";
import { taskRegistry } from "./task/registry";
import { taskParamType } from "@/types/task";
import { Browser, Page } from "puppeteer";
import { Edge } from "@xyflow/react";

export const executeWorkFlow = async (
  executionPhases: IWorkflowExecutionPlan,
  edges: Edge[]
) => {
  // Execution env
  const environment: IEnvironment = { phases: {} };

  let executionFailed = false;
  for (const phase of executionPhases) {
    for (const node of phase.nodes) {
      await executePhase(node, environment, edges);
    }
  }

  await cleanUpEnv(environment);
};

const cleanUpEnv = async (environment: IEnvironment) => {
  if (environment.browser) {
    await environment.browser.close().catch((err) => {
      console.log("Can not close", err);
    });
  }
};

const executePhase = async (
  node: ICustomNode,
  environment: IEnvironment,
  edges: Edge[]
): Promise<boolean> => {
  const runFn = executeRegistry[node.data.type];
  setEnvironmentForPhase(node, environment, edges);
  if (!runFn) {
    return false;
  }

  const executionEnvironment: IExecutionEnvironment = createExecutionEnv(
    node,
    environment
  );

  return await runFn(executionEnvironment);
};

const setEnvironmentForPhase = (
  node: ICustomNode,
  environment: IEnvironment,
  edges: Edge[]
) => {
  environment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputs = taskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    if (input.type === taskParamType.BROWSER_INSTANCE) continue;
    const inputValue = node.data.inputs[input.name];

    // If given by the user
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // If passed by the prev phase
    const connectedEdges = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );

    if (!connectedEdges) {
      continue;
    }

    const outputValue =
      environment.phases[connectedEdges.source].outputs[
        connectedEdges.sourceHandle!
      ];

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
};

const createExecutionEnv = (
  node: ICustomNode,
  environment: IEnvironment
): IExecutionEnvironment => {
  return {
    getInput: (name: string) => environment.phases[node?.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },
    getBrowser: () => environment.browser ?? null,
    setBrowser: (browser: Browser) => (environment.browser = browser),

    getPage: () => environment.page ?? null,
    setPage: (page: Page) => (environment.page = page),
  };
};
