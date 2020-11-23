import { prefix } from "./prefix";
import { configKeys } from "./configKeys";

export const getLatestSessionInfoKey = () =>
  `${prefix}${configKeys.latestSessionInfo}`;
