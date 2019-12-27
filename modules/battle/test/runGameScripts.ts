import {
  AlgolGameTestSuite,
  AlgolStatefulGameAPI,
  AlgolStaticGameAPI,
} from "../../types";

const identifyMark = /^[a-z][0-9]+$/;

export function runGameScripts(
  gameId: string,
  api: AlgolStatefulGameAPI,
  scripts: AlgolGameTestSuite<string, string>
) {
  for (const scriptName in scripts) {
    test(`Running ${gameId} ${scriptName} stateful`, () => {
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

export function runGameScriptsStatic(
  gameId: string,
  api: AlgolStaticGameAPI,
  scripts: AlgolGameTestSuite<string, string>
) {
  for (const scriptName in scripts) {
    test(`Running ${gameId} ${scriptName} static`, () => {
      const seq = scripts[scriptName]
        .reduce((mem, line) => mem.concat(line.commands), [] as string[])
        .slice(0, 5);
      let battle = api.newBattle();
      for (const action of seq) {
        battle =
          action === "win" || action === "endturn" || action === "endTurn"
            ? api.performAction(battle, "endTurn")
            : identifyMark.test(action)
            ? api.performAction(battle, "mark", action)
            : api.performAction(battle, "command", action);
      }
      expect(gameId).toBe(gameId); // TODO - more checks?
    });
  }
}
