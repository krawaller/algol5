import { firstTurn, endTurn } from "../turn";
import aries from "../../../../logic/dist/indiv/aries";

test("turn/endTurn regular", () => {
  let turn = firstTurn(aries);
  // have to add step that wasn't added because of performance thingy
  turn.steps["root-d4-e4-move"] = aries.action["move1"](
    turn.steps["root-d4-e4"]
  );
  turn = endTurn(aries, turn, "root-d4-e4-move");
  expect(
    Object.keys(turn.steps.root.LINKS.marks)
      .concat(Object.keys(turn.steps.root.LINKS.commands))
      .sort()
  ).toEqual(["e5", "e6", "e7", "e8", "f5", "g5", "h5"]);
  expect(
    Object.keys(turn.steps["root-e5"].LINKS.marks)
      .concat(Object.keys(turn.steps["root-e5"].LINKS.commands))
      .sort()
  ).toEqual([
    "a5",
    "b5",
    "c5",
    "d5",
    "e4", // but no more since plr1 moved to e4
  ]);
});
