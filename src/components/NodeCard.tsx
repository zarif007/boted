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
  return (
    <div
      className={cn(
        "rounded-md cursor-pointer bg-white border-2 border-separate w-[150px] text-xs gap-1 flex flex-col",
        isSelected && "border-gray-500"
      )}
    >
      {children}
    </div>
  );
};

export default NodeCard;
