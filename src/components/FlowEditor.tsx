"use client";

import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { taskType } from "@/types/task";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React from "react";
import NodeComponent from "./NodeComponent";

const nodeTypes = {
  Node: NodeComponent,
};

const fitViewOptions = { padding: 6 };

const FlowEditor = ({ workflowId }: { workflowId: string }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(taskType.LAUNCH_BROWSER),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="h-screen w-full text-black">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="bg-white"
        proOptions={{ hideAttribution: true }}
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
      >
        <Controls
          position="top-left"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
          fitViewOptions={fitViewOptions}
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          className="!bg-gray-50"
        />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
