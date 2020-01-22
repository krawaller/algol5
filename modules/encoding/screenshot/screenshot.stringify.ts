import { AlgolScreenshot } from "../../types";

export const stringifyScreenshot = (
  screenshot: AlgolScreenshot,
  method = 0
) => {
  return JSON.stringify(screenshot);
};
