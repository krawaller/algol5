import { makeFirstTurn, newTurnFromRootStep, tryToReachTurnEnd } from ".";
import aries from "../../../logic/generated/aries";

test("makeFirstTurn", () => {
  const res = makeFirstTurn(aries);
  const actions = Object.keys(res.steps.root.LINKS.actions);
  expect(actions.sort()).toEqual(["a4", "b4", "c4", "d1", "d2", "d3", "d4"]);
});

test("tryToReachTurnEnd", () => {
  const rootStep = aries.newBattle();
  const turn = newTurnFromRootStep(rootStep);
  const res = tryToReachTurnEnd(aries, turn);
  expect(turn.canEnd).toBe(true);
});
