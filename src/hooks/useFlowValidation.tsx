import { FlowValidationContext } from "@/context/FlowValidationContecxt";
import { useContext } from "react";

const useFlowValidation = () => {
  const context = useContext(FlowValidationContext);

  if (!context) {
    throw new Error("useFlowValidation context must be used");
  }

  return context;
};

export default useFlowValidation;
