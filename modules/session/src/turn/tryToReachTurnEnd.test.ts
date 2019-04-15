import { newTurnFromRootStep, tryToReachTurnEnd } from ".";
import aries from "../../../logic/generated/aries";

test("tryToReachTurnEnd", () => {
  const rootStep = aries.newBattle();
  const turn = newTurnFromRootStep(rootStep);
  const res = tryToReachTurnEnd(aries, turn);
  expect(turn.canEnd).toBe(true);
});
