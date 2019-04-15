import { newBattleTurn, endTurn } from ".";
import aries from "../../../logic/generated/aries";

test("turn/endTurn regular", () => {
  let turn = newBattleTurn(aries);
  turn = endTurn(aries, turn, "root-d4-e4-move");
  expect(Object.keys(turn.steps.root.LINKS.actions).sort()).toEqual([
    "e5",
    "e6",
    "e7",
    "e8",
    "f5",
    "g5",
    "h5"
  ]);
  expect(Object.keys(turn.steps["root-e5"].LINKS.actions).sort()).toEqual([
    "a5",
    "b5",
    "c5",
    "d5",
    "e4" // but no more since plr1 moved to e4
  ]);
});
