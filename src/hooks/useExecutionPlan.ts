import {
  flowExecutionPlan,
  flowTotExecutionPlanValidationError,
} from "@/lib/workflow/flowExecutionPlan";
import { ICustomNode } from "@/types/customNode";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";

const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const { setInvalidInputs, clearErrors } = useFlowValidation();

  const handleError = useCallback(
    (error: any) => {
      switch (error.type) {
        case flowTotExecutionPlanValidationError.NO_ENTRY_POINT:
          console.error("No Entry point");
          break;
        case flowTotExecutionPlanValidationError.INVALID_INPUTS:
          console.error("Not all inputs are valid");
          setInvalidInputs(error.invalidElements);
          break;
        default:
          console.error("Something went wrong");
          break;
      }
    },
    [setInvalidInputs]
  );

  const generateExecutionPlan = useCallback(() => {
    const { nodes, edges } = toObject();
    const { executionPlan, error } = flowExecutionPlan(
      nodes as ICustomNode[],
      edges
    );

    if (error) {
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors]);

  return generateExecutionPlan;
};

export default useExecutionPlan;
