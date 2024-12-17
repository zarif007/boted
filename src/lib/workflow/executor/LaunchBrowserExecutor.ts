import { IExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";

export const LaunchBrowserExecutor = async (
  environment: IExecutionEnvironment
): Promise<boolean> => {
  try {
    const websiteUrl = environment.getInput("Website Url");
    const browser = await puppeteer.launch({
      headless: false, // false = Show the browser
    });
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.goto(websiteUrl as string);
    environment.setPage(page);
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};
