export * from "./selectedMark";
export * from "./potentialHoverMark";
export * from "./potentialMark";

import { selectedMark } from "./selectedMark";
import { potentialHoverMark } from "./potentialHoverMark";
import { potentialMark } from "./potentialMark";

export const allMarks = {
  selectedMark,
  potentialHoverMark,
  potentialMark,
};
