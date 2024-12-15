/* eslint-disable @typescript-eslint/no-explicit-any */
import { Node } from "@xyflow/react";
import { taskType } from "./task";

export interface ICustomNodeData {
  type: taskType;
  inputs: Record<string, string | boolean>;
  [key: string]: any;
}
export interface ICustomNode extends Node {
  data: ICustomNodeData;
}

export interface ICustomNodeMissingInputs {
  nodeId: string;
  inputs: string[];
}
