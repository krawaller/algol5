import { AlgolGameTestSuite, AlgolGameAPI } from "../../types";

const identifyMark = /^[a-z][0-9]+$/;

export function runGameScripts(
  gameId: string,
  api: AlgolGameAPI,
  scripts: AlgolGameTestSuite<string, string>
) {
  for (const scriptName in scripts) {
    test(`Running ${gameId} ${scriptName}`, () => {
      const seq = scripts[scriptName]
        .reduce((mem, line) => mem.concat(line.commands), [] as string[])
        .slice(0, 5);
      let { initialUI: ui, performAction } = api.newBattle();
      for (const action of seq) {
        ui =
          action === "win" || action === "endturn" || action === "endTurn"
            ? performAction("endTurn")
            : identifyMark.test(action)
            ? performAction("mark", action)
            : performAction("command", action);
      }
      expect(gameId).toBe(gameId); // TODO - more checks?
    });
  }
}
