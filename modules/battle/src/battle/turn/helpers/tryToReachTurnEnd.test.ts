import { newTurnFromRootStep, tryToReachTurnEnd } from "../helpers";
import aries from "../../../../../logic/dist/indiv/aries";

test("tryToReachTurnEnd", () => {
  const rootStep = aries.newBattle();
  let turn = newTurnFromRootStep(rootStep);
  turn = tryToReachTurnEnd(aries, turn);
  expect(turn.canEnd).toBe(true);
});
