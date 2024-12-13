import React from "react";
import { Button } from "./ui/Button";
import { PlayIcon } from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useMutation } from "@tanstack/react-query";
import { RunWorkflow } from "@/actions/workflows/runWorkflow";
import { toast } from "sonner";
import useExecutionPlan from "@/hooks/useExecutionPlan";

const ExecuteButton = ({ workflowId }: { workflowId: string }) => {
  const { toObject } = useReactFlow();
  const generate = useExecutionPlan();

  const mutation = useMutation({
    mutationFn: (data: { workflowId: string; flowDefinition: string }) => {
      console.log("Mutation called with:", data);
      return RunWorkflow(data);
    },
    onSuccess: () => {
      toast.success("Execution Ended");
    },
    onError: (error) => {
      toast.error("Execution went wrong");
    },
  });

  const handleExecute = () => {
    try {
      const plan = generate();
      if (!plan) {
        toast.error("Failed to generate execution plan");
        return;
      }

      const flowObj = toObject();
      if (!flowObj) {
        toast.error("Failed to get flow definition");
        return;
      }
      toast.success("Execution started");
      mutation.mutate({
        workflowId,
        flowDefinition: JSON.stringify(flowObj),
      });
    } catch (error) {
      toast.error("Failed to prepare workflow execution");
    }
  };

  return (
    <div>
      <Button
        variant="outline"
        className="flex items-center gap-2"
        disabled={mutation.isPending}
        onClick={handleExecute}
      >
        <PlayIcon size={16} className="stroke-blue-500" />
        Execute
      </Button>
    </div>
  );
};

export default ExecuteButton;
