import { AlgolGame, AlgolStaticGameAPI } from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";

export function makeStaticGameAPI(game: AlgolGame): AlgolStaticGameAPI {
  return {
    gameId: game.gameId,
    newBattle: () => newBattle(game),
    performAction: (battle, action, arg) =>
      battleAction(game, battle, action, arg),
    getBattleUI: battle => getBattleUI(game, battle),
  };
}
