import { AlgolStep } from "../../types";

export const stepOptions = (step: AlgolStep) => {
  const canEnd = Boolean(step.LINKS.endTurn || step.LINKS.endGame);
  return [
    ...Object.keys(step.LINKS.marks),
    ...Object.keys(step.LINKS.commands),
    ...(canEnd ? ["endTurn"] : []),
  ].sort();
};
