import atrium from "../../../../logic/dist/indiv/atrium";
import atriumDef from "../../../../games/dist/games/atrium";
import { makeStaticGameAPI } from "../../makeStaticGameAPI";
import { battleTurnPath } from ".";

const atriumAPI = makeStaticGameAPI(atrium, atriumDef.setups, atriumDef.boards);

describe("the battleTurnPath helper", () => {
  it("gets correct path from atrium (1)", () => {
    let battle = atriumAPI.newBattle();
    battle = atriumAPI.performAction(battle, "mark", "a2");
    battle = atriumAPI.performAction(battle, "mark", "b2");
    battle = atriumAPI.performAction(battle, "command", "move");
    const result = battleTurnPath(battle);
    expect(result).toEqual([
      0, // mark a2, first option out of many
      1, // mark b2, 2nd option out of 2
      // move single option so excluded
      // endturn single option so excluded
    ]);
  });
  it("gets correct path from atrium (2)", () => {
    let battle = atriumAPI.newBattle();
    battle = atriumAPI.performAction(battle, "mark", "a3");
    battle = atriumAPI.performAction(battle, "mark", "b3");
    battle = atriumAPI.performAction(battle, "command", "move");
    const result = battleTurnPath(battle);
    expect(result).toEqual([
      1, // mark a3, 2nd option out of many
      // mark b3, single option so excluded
      // move single option so excluded
      // endturn single option so excluded
    ]);
  });
});
