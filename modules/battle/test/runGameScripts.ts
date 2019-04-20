import { API } from "../src";
import { FullDefAnon } from "../../types";

export function runGameScripts(gameDef: FullDefAnon) {
  const gameId = gameDef.meta.id;

  for (const scriptName in gameDef.scripts) {
    test(`Running ${gameId} ${scriptName}`, () => {
      const seq = gameDef.scripts[scriptName]
        .reduce((mem, line) => mem.concat(line.commands), [])
        .slice(0, 5);
      let ui = API.newBattle(gameId);
      for (const action of seq) {
        ui = API.makeBattleAction(
          ui.sessionId,
          action === "win" ? "endTurn" : action
        );
      }
      expect(gameId).toBe(gameId);
    });
  }
}
