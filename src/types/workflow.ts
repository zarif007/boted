import { ICustomNode } from "./customNode";

export type IWorkflowExecutionPlanPhase = {
    phase: number;
    nodes: ICustomNode[];
}

export type IWorkflowExecutionPlan = IWorkflowExecutionPlanPhase[]