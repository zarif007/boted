import { taskParam, taskParamType } from "@/types/task";
import React from "react";
import StringParam from "./param/StringParam";

const NodeParamField = ({ input }: { input: taskParam }) => {
  switch (input.type) {
    case taskParamType.STRING:
      return <StringParam input={input} />;
    default:
      return (
        <div className="w-full">
          <p className="text-xs text-muted-foreground">NOT implemented</p>
        </div>
      );
  }
};

export default NodeParamField;
