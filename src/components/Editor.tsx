"use client";

import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import FlowEditor from "./FlowEditor";
import Topbar from "./Topbar";
import TaskMenu from "./TaskMenu";
import { FlowValidationContextProvider } from "@/context/FlowValidationContecxt";

const Editor = ({ workflowId }: { workflowId: string }) => {
  return (
    <FlowValidationContextProvider>
      <ReactFlowProvider>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <Topbar workflowId={workflowId} />
          <section className="flex h-full w-full overflow-auto">
            <TaskMenu />
            <FlowEditor workflowId={workflowId} />
          </section>
        </div>
      </ReactFlowProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
