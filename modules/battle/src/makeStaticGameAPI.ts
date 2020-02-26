import { AlgolGame, AlgolStaticGameAPI, AlgolSetupBookAnon } from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";
import { inflateBattleSave } from "./battle/helpers";

export function makeStaticGameAPI(
  game: AlgolGame,
  setups: AlgolSetupBookAnon
): AlgolStaticGameAPI {
  return {
    gameId: game.gameId,
    // TODO - variants choices selecting which setup
    newBattle: () => newBattle(game, setups.basic),
    fromSave: save => inflateBattleSave(game, save),
    performAction: (battle, action, arg) =>
      battleAction(game, battle, action, arg),
    getBattleUI: battle => getBattleUI(game, battle),
    fromFrame: frame => inflateBattleSave(game, frame),
    iconMap: game.iconMap,
  };
}
