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
    mutationFn: (data: { workflowId: string; flowDefinition: string }) =>
      RunWorkflow(data),
    onSuccess: () => {
      toast.success("Execution started");
    },
    onError: () => {
      toast.error("Execution went wrong");
    },
  });

  return (
    <div>
      <Button
        variant={"outline"}
        className="flex items-center gap-2"
        disabled={mutation.isPending}
        onClick={() => {
          const plan = generate();
          if (!plan) {
            return;
          }
          mutation.mutate({
            workflowId: workflowId,
            flowDefinition: JSON.stringify(toObject()),
          });
        }}
      >
        <PlayIcon size={16} className="stroke-blue-500" />
        Execute
      </Button>
    </div>
  );
};

export default ExecuteButton;
