import { taskParamType, taskType } from "@/types/task";

export const PageToHtmlTask = {
  type: taskType.PAGE_TO_HTML,
  label: "Get Html from page",
  isEntryPoint: false,
  inputs: [
    {
      name: "Website Url",
      type: taskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
  outputs: [
    { name: "HTML", type: taskParamType.STRING },
    { name: "Web page", type: taskParamType.BROWSER_INSTANCE },
  ],
};
