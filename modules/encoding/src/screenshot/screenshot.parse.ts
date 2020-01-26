import { AlgolScreenshot } from "../../../types";

export const parseScreenshot = (str: string): AlgolScreenshot => {
  return JSON.parse(str);
};
