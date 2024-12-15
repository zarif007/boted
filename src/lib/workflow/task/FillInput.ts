import { taskParamType, taskType } from "@/types/task";

export const FillInputTask = {
  type: taskType.FILL_INPUT,
  label: "Fill Input",
  isEntryPoint: false,
  inputs: [
    {
      name: "Web page",
      type: taskParamType.BROWSER_INSTANCE,
      required: true,
    },
    {
      name: "Selector",
      type: taskParamType.STRING,
      required: true,
    },
    {
      name: "Value",
      type: taskParamType.STRING,
      required: true,
    },
    {
      name: "IsRequired",
      type: taskParamType.BOOLEAN,
      value: false,
      required: true,
      variant: "switch",
    },
  ],
  outputs: [{ name: "Web page", type: taskParamType.BROWSER_INSTANCE }],
};
