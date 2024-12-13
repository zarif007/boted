import { ICustomNode } from "@/types/customNode";
import { IWorkflowExecutionPlan } from "@/types/workflow";
import "server-only";
import { executeRegistry } from "./executor/registry";
import { IEnvironment, IExecutionEnvironment } from "@/types/executor";
import { taskRegistry } from "./task/registry";

export const executeWorkFlow = async (
  executionPhases: IWorkflowExecutionPlan
) => {
  // Execution env
  const environment: IEnvironment = { phases: {} };

  let executionFailed = false;
  for (const phase of executionPhases) {
    for (const node of phase.nodes) {
      await executePhase(node, environment);
    }
  }
};

const executePhase = async (
  node: ICustomNode,
  environment: IEnvironment
): Promise<boolean> => {
  const runFn = executeRegistry[node.data.type];
  setEnvironmentForPhase(node, environment);
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
  environment: IEnvironment
) => {
  environment.phases[node.id] = { inputs: {}, outputs: {} };
  const inputs = taskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];

    // If given by the user
    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    // If passed by the prev phase
  }
};

const createExecutionEnv = (
  node: ICustomNode,
  environment: IEnvironment
): IExecutionEnvironment => {
  return {
    getInput: (name: string) => environment.phases[node?.id]?.inputs[name],
  };
};
