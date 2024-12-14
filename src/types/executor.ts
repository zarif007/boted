import { Browser, Page } from "puppeteer";

export type IEnvironment = {
  browser?: Browser;
  page?: Page;
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type IExecutionEnvironment = {
  getInput(name: string): string;
  setOutput(name: string, value: string): void;

  getBrowser(): Browser | null;
  setBrowser(browser: Browser): void;

  getPage(): Page | null;
  setPage(page: Page): void;
};
