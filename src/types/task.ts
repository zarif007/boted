/* eslint-disable @typescript-eslint/no-explicit-any */
export enum taskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
}

export enum taskParamType {
  STRING = "STRING",
}

export interface taskParam {
  name: string;
  type: taskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string;
  [key: string]: any;
}
