import { firstTurn } from "../turn";
import aries from "../../../../logic/dist/indiv/aries";
import ariesDef from "../../../../games/dist/games/aries";

test("turn/firstTurn", () => {
  aries.setBoard(ariesDef.boards.basic);
  const res = firstTurn(aries, ariesDef.setups.basic, "basic");
  const actions = Object.keys(res.steps.root.LINKS.commands).concat(
    Object.keys(res.steps.root.LINKS.marks)
  );
  expect(actions.sort()).toEqual(["a4", "b4", "c4", "d1", "d2", "d3", "d4"]);
});
