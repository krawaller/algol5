import {
  AlgolGame,
  AlgolStatefulGameAPI,
  AlgolStatefulGameAPISession,
  AlgolBattle,
  AlgolBattleSave,
} from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";
import { inflateBattleSave } from "./battle/helpers";

export function makeStatefulGameAPI(game: AlgolGame): AlgolStatefulGameAPI {
  return {
    gameId: game.gameId,
    newBattle: () => fromBattle(game, newBattle(game)),
    fromSave: (save: AlgolBattleSave) =>
      fromBattle(game, inflateBattleSave(game, save)),
  };
}

const fromBattle = (
  game: AlgolGame,
  battle: AlgolBattle
): AlgolStatefulGameAPISession => ({
  initialUI: getBattleUI(game, battle),
  performAction(action, arg) {
    battle = battleAction(game, battle, action, arg);
    return getBattleUI(game, battle);
  },
});
