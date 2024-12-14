import { taskParamType, taskType } from "@/types/task";

export const ClickElementTask = {
  type: taskType.CLICK_ELEMENT,
  label: "Click element",
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
  ],
  outputs: [{ name: "Web page", type: taskParamType.BROWSER_INSTANCE }],
};
