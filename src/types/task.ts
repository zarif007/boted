/* eslint-disable @typescript-eslint/no-explicit-any */
export enum taskType {
  LAUNCH_BROWSER = "LAUNCH_BROWSER",
  PAGE_TO_HTML = "PAGE_TO_HTML",
  EXTRACT_TEXT_FROM_ELEMENT = "EXTRACT_TEXT_FROM_ELEMENT",
  FILL_INPUT = "FILL_INPUT",
  CLICK_ELEMENT = "CLICK_ELEMENT",
}

export enum taskParamType {
  STRING = "STRING",
  BROWSER_INSTANCE = "BROWSER_INSTANCE",
  BOOLEAN = "BOOLEAN",
}

export interface taskParam {
  name: string;
  type: taskParamType;
  helperText?: string;
  required?: boolean;
  hideHandle?: boolean;
  value?: string | boolean;
  [key: string]: any;
}
