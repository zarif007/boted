import { taskRegistry } from "@/lib/workflow/task/registry";
import { taskType } from "@/types/task";
import { CopyIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Button } from "./ui/Button";
import { useReactFlow } from "@xyflow/react";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { ICustomNode } from "@/types/customNode";

const NodeHeader = ({
  taskType,
  nodeId,
}: {
  taskType: taskType;
  nodeId: string;
}) => {
  const task = taskRegistry[taskType];
  const { deleteElements, getNode, addNodes } = useReactFlow();

  const deleteNode = () => {
    deleteElements({
      nodes: [{ id: nodeId }],
    });
  };

  const copyNode = () => {
    const node = getNode(nodeId) as ICustomNode;
    const newX = node?.position.x;
    const newY = node?.position.y + (node.measured?.height ?? 0) + 20;

    const newNode = CreateFlowNode(node?.data.type, {
      x: newX,
      y: newY,
    });

    addNodes([newNode]);
  };
  return (
    <div className="flex items-center gap-2 p-2 justify-between bg-slate-900">
      <div className="flex items-center w-full">
        <p className="text-xs font-bold uppercase">{task.label}</p>
      </div>
      {!task.isEntryPoint && (
        <div className="flex space-x-1">
          <Button variant={"ghost"} size={"icon"} onClick={deleteNode}>
            <TrashIcon size={12} />
          </Button>
          <Button variant={"ghost"} size={"icon"} onClick={copyNode}>
            <CopyIcon size={12} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default NodeHeader;
