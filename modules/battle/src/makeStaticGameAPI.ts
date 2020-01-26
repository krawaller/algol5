import { AlgolGame, AlgolStaticGameAPI, FullDefAnon } from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";
import { inflateBattleSave } from "./battle/helpers";

export function makeStaticGameAPI(game: AlgolGame): AlgolStaticGameAPI {
  return {
    gameId: game.gameId,
    newBattle: () => newBattle(game),
    fromSave: save => inflateBattleSave(game, save),
    performAction: (battle, action, arg) =>
      battleAction(game, battle, action, arg),
    getBattleUI: battle => getBattleUI(game, battle),
    fromFrame: frame => inflateBattleSave(game, frame),
    iconMap: game.iconMap,
  };
}
