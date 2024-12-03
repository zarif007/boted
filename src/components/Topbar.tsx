import React from "react";
import SaveButton from "./SaveButton";

const Topbar = ({ workflowId }: { workflowId: string }) => {
  return (
    <div className="p-4">
      <div className="flex justify-end">
        <SaveButton workflowId={workflowId} />
      </div>
    </div>
  );
};

export default Topbar;
