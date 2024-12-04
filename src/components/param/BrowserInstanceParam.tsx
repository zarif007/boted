import { taskParam } from "@/types/task";
import React from "react";

const BrowserInstanceParam = ({
  input,
  value,
  updateNodeParamValue,
}: {
  input: taskParam;
  value: string;
  updateNodeParamValue: (newValue: string) => void;
}) => {
  return <div>BrowserInstanceParam</div>;
};

export default BrowserInstanceParam;
