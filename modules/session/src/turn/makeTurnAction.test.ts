import { makeTurnAction, newBattleTurn } from ".";
import aries from "../../../logic/generated/aries";

test("turn/makeTurnAction", () => {
  let turn = newBattleTurn(aries);
  const actions = ["d4", "g4", "move"];
  actions.forEach(action => (turn = makeTurnAction(aries, turn, action)));
  const { currentStepId, steps } = turn;
  expect(currentStepId).toBe("root-d4-g4-move");
  expect(steps[currentStepId].LINKS.endTurn).toBe("startTurn2");
});
