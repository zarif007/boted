import { ClickElementExecutor } from "./ClickElementExecutor";
import { ExtractElementFromElementExecutor } from "./ExtractElementFromElementExecutor";
import { FillInputExecutor } from "./FillInputExecutor";
import { LaunchBrowserExecutor } from "./LaunchBrowserExecutor";
import { PageToHtmlExecutor } from "./PageToHtmlExecutor";

export const executeRegistry = {
  LAUNCH_BROWSER: LaunchBrowserExecutor,
  PAGE_TO_HTML: PageToHtmlExecutor,
  EXTRACT_TEXT_FROM_ELEMENT: ExtractElementFromElementExecutor,
  FILL_INPUT: FillInputExecutor,
  CLICK_ELEMENT: ClickElementExecutor,
};
