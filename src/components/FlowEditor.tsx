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
  getOutgoers,
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
import { taskRegistry } from "@/lib/workflow/task/registry";

const nodeTypes = {
  Node: NodeComponent,
};

const edgeTypes = {
  default: DeletableEdge,
};

const fitViewOptions = { padding: 5 };

const FlowEditor = ({ workflowId }: { workflowId: string }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<ICustomNode>([
    CreateFlowNode(taskType.LAUNCH_BROWSER),
    CreateFlowNode(taskType.PAGE_TO_HTML),
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const { screenToFlowPosition, updateNodeData } = useReactFlow();

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

    if(!connection.targetHandle) return;

    const node = nodes.find((nd) => nd.id === connection.target);
    if(!node) 
      return;
    const nodeInputs = node.data.inputs;
    delete nodeInputs[connection.targetHandle];
    updateNodeData(node.id, {inputs: nodeInputs})
  }, [setEdges, updateNodeData, nodes]);

  const isValidConnection = useCallback((connection: Edge | Connection) => {
    // Self connect is not allowed
    if(connection.target === connection.source)
      return false;

    // Same task param type not allowed
    const source = nodes.find((node) => node.id === connection.source)
    const target = nodes.find((node) => node.id === connection.target)
    if(!source || !target) {
      console.error("Invalid connection: source or target nodes not found")
      return false;
    }

    const sourceTask = taskRegistry[source.data.type]
    const targetTask = taskRegistry[target.data.type]

    const output = sourceTask.outputs.find(output => output.name === connection.sourceHandle);

    const input = targetTask.inputs.find(input => input.name === connection.targetHandle);
    
    if(input?.type !== output?.type) {
      console.error("Invalid connection: type miss matched");
      return false;
    }

    // Cycle not allowed
    const hasCycle = (node: ICustomNode, visited = new Set()) => {
      if (visited.has(node.id)) return false;

      visited.add(node.id);

      for (const outgoer of getOutgoers(node, nodes, edges)) {
        if (outgoer.id === connection.source) return true;
        if (hasCycle(outgoer, visited)) return true;
      }
    };

    const detectCycle = hasCycle(target)
  
    return !detectCycle;
  }, [nodes, edges])

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
        isValidConnection={isValidConnection}
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
