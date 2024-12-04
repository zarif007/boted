"use client";

import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { taskType } from "@/types/task";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import React, { useCallback } from "react";
import NodeComponent from "./NodeComponent";
import { ICustomNode } from "@/types/customNode";
import DeletableEdge from "./DeletableEdge";

const nodeTypes = {
  Node: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const fitViewOptions = { padding: 6 };

const FlowEditor = ({ workflowId }: { workflowId: string }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<ICustomNode>([
    CreateFlowNode(taskType.LAUNCH_BROWSER),
    CreateFlowNode(taskType.PAGE_TO_HTML),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    if (!taskType) return;

    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const newNode = CreateFlowNode(taskType as taskType, position);
    setNodes((nodes) => nodes.concat(newNode));
  }, []);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((edges) => addEdge({ ...connection, animated: true }, edges));
  }, []);

  return (
    <div className="h-screen w-full text-black dark:text-white">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        className="bg-white dark:bg-black"
        proOptions={{ hideAttribution: true }}
        fitViewOptions={fitViewOptions}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onConnect={onConnect}
      >
        <Controls
          position="top-left"
          showZoom={true}
          showFitView={true}
          showInteractive={true}
          fitViewOptions={fitViewOptions}
          className="!text-black"
        />
        <Background
          variant={BackgroundVariant.Dots}
          gap={12}
          size={1}
          className="!bg-white dark:!bg-black"
        />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
