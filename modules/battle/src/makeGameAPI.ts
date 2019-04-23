import { AlgolGame, AlgolGameAPI } from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";

export function makeGameAPI(game: AlgolGame): AlgolGameAPI {
  return {
    newBattle: () => {
      let battle = newBattle(game);
      return {
        initialUI: getBattleUI(game, battle),
        performAction(action) {
          battle = battleAction(game, battle, action);
          return getBattleUI(game, battle);
        }
      };
    }
  };
}
