import { Browser } from "puppeteer";

export type IEnvironment = {
  browser?: Browser;
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type IExecutionEnvironment = {
  getInput(name: string): string;
};
