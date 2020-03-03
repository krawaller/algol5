import { newTurnFromRootStep, tryToReachTurnEnd } from "../helpers";
import aries from "../../../../../logic/dist/indiv/aries";
import ariesDef from "../../../../../games/dist/games/aries";

test("tryToReachTurnEnd", () => {
  aries.setBoard(ariesDef.boards.basic);
  const rootStep = aries.newBattle(ariesDef.setups.basic);
  let turn = newTurnFromRootStep(rootStep);
  turn = tryToReachTurnEnd(aries, turn);
  expect(turn.canEnd).toBe(true);
});
