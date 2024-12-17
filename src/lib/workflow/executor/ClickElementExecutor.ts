import { IExecutionEnvironment } from "@/types/executor";

export const ClickElementExecutor = async (
  environment: IExecutionEnvironment
): Promise<boolean> => {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      console.error("No Selector");
    }

    await environment.getPage()!.click(selector as string);
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return true;
  } catch (error) {
    return false;
  }
};
