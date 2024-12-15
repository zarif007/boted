import { Browser, Page } from "puppeteer";

export type IEnvironment = {
  browser?: Browser;
  page?: Page;
  phases: {
    [key: string]: {
      inputs: Record<string, string | boolean>;
      outputs: Record<string, string | boolean>;
    };
  };
};

export type IExecutionEnvironment = {
  getInput(name: string): string | boolean;
  setOutput(name: string, value: string): void;

  getBrowser(): Browser | null;
  setBrowser(browser: Browser): void;

  getPage(): Page | null;
  setPage(page: Page): void;
};
