import {
  AlgolGame,
  AlgolStaticGameAPI,
  AlgolSetupBookAnon,
  AlgolBoardBookAnon,
} from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";
import { inflateBattleSave } from "./battle/helpers";

export function makeStaticGameAPI(
  game: AlgolGame,
  setups: AlgolSetupBookAnon,
  boards: AlgolBoardBookAnon
): AlgolStaticGameAPI {
  return {
    gameId: game.gameId,
    newBattle: () => {
      // TODO - variants choices selecting which setup and board
      game.setBoard(boards.basic);
      return newBattle(game, setups.basic);
    },
    fromSave: save => inflateBattleSave(game, save), // TODO - read variant from save
    performAction: (battle, action, arg) =>
      battleAction(game, battle, action, arg),
    getBattleUI: battle => getBattleUI(game, battle),
    fromFrame: frame => inflateBattleSave(game, frame),
    iconMap: game.iconMap,
  };
}
