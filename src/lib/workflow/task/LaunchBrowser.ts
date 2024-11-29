import { taskParamType, taskType } from "@/types/task";

export const LaunchBrowserTask = {
  type: taskType.LAUNCH_BROWSER,
  label: "Launch Browser",
  isEntryPoint: true,
  inputs: [
    {
      name: "Website Url",
      type: taskParamType.STRING,
      helperText: "eg: https://www.google.com",
      required: true,
      hideHandle: true,
    },
  ],
};
