import { IExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";

export const LaunchBrowserExecutor = async (
  environment: IExecutionEnvironment
): Promise<boolean> => {
  try {
    const websiteUrl = environment.getInput("website url");
    const browser = await puppeteer.launch({
      headless: false, // Show the browser
    });
    // await browser.close();
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
