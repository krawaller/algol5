import {
  AlgolGameTestSuite,
  AlgolStatefulGameAPI,
  AlgolStaticGameAPI,
  AlgolGameBlobAnon,
} from "../../types";
import { isPos } from "../../common";
import { makeBattleSave } from "../src/battle/helpers";
import {
  parseBattleSave,
  stringifyBattleSave,
} from "../../encoding/src/battleSave";

export function runGameScripts(
  gameId: string,
  api: AlgolStatefulGameAPI,
  scripts: AlgolGameTestSuite<AlgolGameBlobAnon>
) {
  for (const script of scripts) {
    test(`Running ${gameId} ${script.desc} stateful`, () => {
      const seq = script.lines
        .reduce((mem, line) => mem.concat(line.commands), [] as string[])
        .slice(0, 5);
      // eslint-disable-next-line prefer-const
      let { initialUI: ui, performAction } = api.newBattle(script.variantCode);
      for (const action of seq) {
        // eslint-disable-next-line
        ui =
          action === "endTurn"
            ? performAction("endTurn")
            : isPos(action)
            ? performAction("mark", action)
            : performAction("command", action);
      }
    });
  }
}

export function runGameScriptsStatic(
  gameId: string,
  api: AlgolStaticGameAPI,
  scripts: AlgolGameTestSuite<AlgolGameBlobAnon>
) {
  for (const script of scripts) {
    test(`Running ${gameId} ${script.desc} static`, () => {
      const seq = script.lines.reduce(
        (mem, line) => mem.concat(line.commands),
        [] as string[]
      );
      let battle = api.newBattle(script.variantCode);
      for (const action of seq) {
        battle =
          action === "win" || action === "endturn" || action === "endTurn"
            ? api.performAction(battle, "endTurn")
            : isPos(action)
            ? api.performAction(battle, "mark", action)
            : api.performAction(battle, "command", action);
      }
      const save = parseBattleSave(
        stringifyBattleSave(makeBattleSave(battle), 0)
      );
      if (seq.slice(-1)[0] === "endTurn") {
        const inflatedBattle = api.fromSave(save);
        expect(battle).toEqual(inflatedBattle);
      }
      const lastLine = script.lines.slice(-1)[0];
      if (lastLine.endedBy) {
        expect(battle.gameEndedBy).toEqual(lastLine.endedBy);
      }
    });
  }
}
