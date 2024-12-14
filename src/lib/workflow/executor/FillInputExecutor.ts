import { IExecutionEnvironment } from "@/types/executor";

export const FillInputExecutor = async (
  environment: IExecutionEnvironment
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      console.error("No Selector");
    }

    const value = environment.getInput("Value");
    if (!value) {
      console.error("No value");
    }

    await environment.getPage()!.type(selector, value);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return true;
  } catch (error) {
    return false;
  }
};
