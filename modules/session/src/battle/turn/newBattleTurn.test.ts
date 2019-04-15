import { newBattleTurn } from ".";
import aries from "../../../../logic/generated/aries";

test("turn/newBattleTurn", () => {
  const res = newBattleTurn(aries);
  const actions = Object.keys(res.steps.root.LINKS.actions);
  expect(actions.sort()).toEqual(["a4", "b4", "c4", "d1", "d2", "d3", "d4"]);
});
