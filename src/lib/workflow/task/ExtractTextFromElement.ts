import { taskParamType, taskType } from "@/types/task";

export const ExtractTextFromElement = {
  type: taskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: "Extract text from Element",
  isEntryPoint: true,
  inputs: [
    {
      name: "Html",
      type: taskParamType.STRING,
      required: true,
    },
    {
      name: "Selector",
      type: taskParamType.STRING,
      required: true,
    },
  ],
  outputs: [{ name: "Extract text", type: taskParamType.STRING }],
};
