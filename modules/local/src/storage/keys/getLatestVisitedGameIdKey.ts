import { configKeys } from "./configKeys";
import { prefix } from "./prefix";

export const getLatestVisitedGameIdKey = () =>
  `${prefix}${configKeys.latestVisitedGameId}`;
