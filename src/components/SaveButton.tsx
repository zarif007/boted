import { useReactFlow } from "@xyflow/react";
import React from "react";

const SaveButton = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();
  return (
    <div>
      <button
        className="text-black dark:text-white"
        onClick={() => console.log("@FLOW", toObject())}
      >
        Save
      </button>
    </div>
  );
};

export default SaveButton;
