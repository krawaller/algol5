import { newTurnFromRootStep, tryToReachTurnEnd } from ".";
import aries from "../../../../logic/generated/aries";

test("tryToReachTurnEnd", () => {
  const rootStep = aries.newBattle();
  let turn = newTurnFromRootStep(rootStep);
  turn = tryToReachTurnEnd(aries, turn);
  expect(turn.canEnd).toBe(true);
});
