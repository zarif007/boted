import useFlowValidation from "@/hooks/useFlowValidation";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

const NodeCard = ({
  children,
  nodeId,
  isSelected,
}: {
  children: ReactNode;
  nodeId: string;
  isSelected: boolean;
}) => {
  const { invalidInputs } = useFlowValidation();
  const hasInValidInputs = invalidInputs.some((node) => node.nodeId === nodeId);
  console.log(invalidInputs);
  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-white dark:bg-black border-2 border-separate w-[350px] text-xs gap-1 flex flex-col rounded-sm",
        isSelected && "border-blue-500",
        hasInValidInputs && "border-red-500 border-2"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
