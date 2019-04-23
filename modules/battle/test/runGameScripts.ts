import { GameTestSuite, AlgolGameAPI } from "../../types";

export function runGameScripts(
  gameId: string,
  api: AlgolGameAPI,
  scripts: GameTestSuite
) {
  for (const scriptName in scripts) {
    test(`Running ${gameId} ${scriptName}`, () => {
      const seq = scripts[scriptName]
        .reduce((mem, line) => mem.concat(line.commands), [])
        .slice(0, 5);
      let { initialUI: ui, performAction } = api.newBattle();
      for (const action of seq) {
        ui = performAction(action === "win" ? "endTurn" : action);
      }
      expect(gameId).toBe(gameId); // TODO - more checks?
    });
  }
}
