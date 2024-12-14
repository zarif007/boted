import { IExecutionEnvironment } from "@/types/executor";

export const PageToHtmlExecutor = async (
  environment: IExecutionEnvironment
): Promise<boolean> => {
  try {
    const html = await environment.getPage()!.content();
    environment.setOutput("HTML", html);
    return true;
  } catch (error) {
    return false;
  }
};
