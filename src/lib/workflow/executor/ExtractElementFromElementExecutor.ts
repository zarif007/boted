import { IExecutionEnvironment } from "@/types/executor";
import * as cheerio from "cheerio";

export const ExtractElementFromElementExecutor = async (
  environment: IExecutionEnvironment
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");

    if (!selector) {
      console.error("selector not find");
      return false;
    }

    const html = environment.getInput("Html");

    if (!html) {
      console.error("html not find");
      return false;
    }

    const $ = cheerio.load(html as string);

    const element = $(selector as string);

    if (!element) {
      console.error("Element not find");
      return false;
    }

    const extractedText = $.text(element);
    if (!extractedText) {
      console.error("Element has not text");
      return false;
    }

    environment.setOutput("Extracted text", extractedText);
    console.log("text===============", extractedText);
    return true;
  } catch (error) {
    return false;
  }
};
