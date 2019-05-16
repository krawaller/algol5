import { firstTurn } from "../turn";
import aries from "../../../../logic/generated/aries";

test("turn/firstTurn", () => {
  const res = firstTurn(aries);
  const actions = Object.keys(res.steps.root.LINKS.commands).concat(
    Object.keys(res.steps.root.LINKS.marks)
  );
  expect(actions.sort()).toEqual(["a4", "b4", "c4", "d1", "d2", "d3", "d4"]);
});
