import { AlgolGame, AlgolGameAPI } from "algol-types";
import { newBattle, battleAction, getBattleUI } from "./battle";

export function makeGameAPI(game: AlgolGame): AlgolGameAPI {
  return {
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
        }
      };
    }
  };
}
