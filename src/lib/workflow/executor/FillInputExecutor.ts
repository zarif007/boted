import { IExecutionEnvironment } from "@/types/executor";

export const FillInputExecutor = async (
  environment: IExecutionEnvironment
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      console.error("No Selector");
      return false;
    }

    const value = environment.getInput("Value");
    const isRequired = environment.getInput("IsRequired");

    const element = await environment.getPage()!.$(selector);
    if (!element) {
      console.error("Element not found");
      return false;
    }

    const isDisabled = await element.evaluate((el) => {
      return (
        el.hasAttribute("disabled") ||
        el.getAttribute("aria-disabled") === "true"
      );
    });

    if (isDisabled && !isRequired) {
      console.log("Input is disabled and not required, skipping");
      return true;
    }

    if (isDisabled && isRequired) {
      console.error("Input is disabled but required");
      return false;
    }

    if (!value && isRequired) {
      console.error("No value provided for required input");
      return false;
    }

    await environment.getPage()!.type(selector, value);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return true;
  } catch (error) {
    console.error("Error in FillInputExecutor:", error);
    return false;
  }
};
