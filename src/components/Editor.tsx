"use client";

import { ReactFlowProvider } from "@xyflow/react";
import React from "react";
import FlowEditor from "./FlowEditor";

const Editor = ({ workflowId }: { workflowId: string }) => {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-hidden">
        <section className="h-full w-full overflow-auto">
          <FlowEditor workflowId={workflowId} />
        </section>
      </div>
    </ReactFlowProvider>
  );
};

export default Editor;
