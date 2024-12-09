import React from "react";
import ExecuteButton from "./ExecuteButton";

const Topbar = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="p-4 fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="flex space-x-2 justify-end">
        {/* <SaveButton workflowId={workflowId} /> */}
        <ExecuteButton workflowId={workflowId} />
      </div>
    </div>
  );
};

export default Topbar;
