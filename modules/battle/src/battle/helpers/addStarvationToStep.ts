import { AlgolStep } from "../../../../types";

// Will mutate step endGame link with Starvation.
// Used in .battleEndTurn and .hydrateStepInTurn
export function addStarvationToStep(step: AlgolStep) {
  const stepLinks = step.LINKS;
  if (stepLinks.starvation) {
    stepLinks.endGame = stepLinks.starvation.endGame;
    stepLinks.endedBy = stepLinks.starvation.endedBy;
    stepLinks.endMarks =
      stepLinks.starvation.endMarks ||
      Object.keys(step.UNITLAYERS.myunits || {});
  } else {
    stepLinks.endGame = "win";
    stepLinks.endedBy = "starvation";
    stepLinks.endMarks = Object.keys(step.UNITLAYERS.myunits || {});
  }
}
