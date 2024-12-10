"use client";

import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import FlowEditor from "./FlowEditor";
import Topbar from "./Topbar";
import TaskMenu from "./TaskMenu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FlowValidationContextProvider } from "@/context/FlowValidationContecxt";
import { Toaster } from "sonner";

const Editor = ({ workflowId }: { workflowId: string }) => {
  const queryClient = new QueryClient();

  return (
    <FlowValidationContextProvider>
      <Toaster richColors />
      <QueryClientProvider client={queryClient}>
        <ReactFlowProvider>
          <div className="flex flex-col h-full w-full overflow-hidden">
            <Topbar workflowId={workflowId} />
            <section className="flex h-full w-full overflow-auto">
              <TaskMenu />
              <FlowEditor workflowId={workflowId} />
            </section>
          </div>
        </ReactFlowProvider>
      </QueryClientProvider>
    </FlowValidationContextProvider>
  );
};

export default Editor;
