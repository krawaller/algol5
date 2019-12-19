import { AlgolGame, AlgolStatefulGameAPI } from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";

export function makeStatefulGameAPI(game: AlgolGame): AlgolStatefulGameAPI {
  return {
    gameId: game.gameId,
    newBattle: () => {
      let battle = newBattle(game);
      return {
        initialUI: getBattleUI(game, battle),
        performAction(action, arg) {
          battle = battleAction(game, battle, action, arg);
          return getBattleUI(game, battle);
        },
        history() {
          return battle.history;
        },
      };
    },
  };
}
