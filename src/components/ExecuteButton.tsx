import React from "react";
import { Button } from "./ui/Button";
import { PlayIcon } from "lucide-react";
import useExecutionPlan from "@/hooks/useExecutionPlan";

const ExecuteButton = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  return (
    <div>
      <Button
        variant={"outline"}
        className="flex items-center gap-2"
        onClick={() => console.log("@PLAN=====", generate())}
      >
        <PlayIcon size={16} className="stroke-blue-500" />
        Execute
      </Button>
    </div>
  );
};

export default ExecuteButton;
