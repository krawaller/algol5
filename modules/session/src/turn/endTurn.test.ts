import { makeTurnAction, newBattleTurn, endTurn } from ".";
import aries from "../../../logic/generated/aries";

test("turn/makeTurnAction", () => {
  let turn = newBattleTurn(aries);
  const actions = ["d4", "g4", "move"];
  actions.forEach(action => (turn = makeTurnAction(aries, turn, action)));
  turn = endTurn(aries, turn);
  expect(turn.currentStepId).toBe("root");
  expect(Object.keys(turn.steps.root.LINKS.actions).sort()).toEqual([
    "e5",
    "e6",
    "e7",
    "e8",
    "f5",
    "g5",
    "h5"
  ]);
});
