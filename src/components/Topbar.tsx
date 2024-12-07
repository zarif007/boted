import React from "react";
import SaveButton from "./SaveButton";
import ExecuteButton from "./ExecuteButton";

const Topbar = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="p-4">
      <div className="flex space-x-2 justify-end">
        {/* <SaveButton workflowId={workflowId} /> */}
        <ExecuteButton workflowId={workflowId} />
      </div>
    </div>
  );
};

export default Topbar;
