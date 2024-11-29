import { ICustomNode } from "@/types/customNode";
import { taskType } from "@/types/task";

export const CreateFlowNode = (
  nodeType: taskType,
  position?: { x: number; y: number }
): ICustomNode => {
  return {
    id: crypto.randomUUID(),
    type: "Node",
    data: {
      type: nodeType,
      inputs: {},
    },
    position: position ?? { x: 0, y: 0 },
  };
};
