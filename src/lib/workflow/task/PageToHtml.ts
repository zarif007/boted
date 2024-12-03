import { taskParamType, taskType } from "@/types/task";

export const PageToHtmlTask = {
  type: taskType.PAGE_TO_HTML,
  label: "Get Html from page",
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: taskParamType.BROWSER_INSTANCE,
      required: true,
    },
  ],
};
