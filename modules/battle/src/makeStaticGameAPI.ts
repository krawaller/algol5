import {
  AlgolGame,
  AlgolStaticGameAPI,
  AlgolSetupBookAnon,
  AlgolBoardBookAnon,
  AlgolVariantBookAnon,
} from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";
import { inflateBattleSave } from "./battle/helpers";

export function makeStaticGameAPI(
  game: AlgolGame,
  setups: AlgolSetupBookAnon,
  boards: AlgolBoardBookAnon,
  variants: AlgolVariantBookAnon
): AlgolStaticGameAPI {
  return {
    gameId: game.gameId,
    newBattle: () => {
      // TODO - variants choices selecting which setup and board
      game.setBoard(boards.basic);
      return newBattle(game, setups.basic, "basic");
    },
    fromSave: save => {
      game.setBoard(boards.basic); // TODO - read variant from save
      return inflateBattleSave(game, save);
    },
    performAction: (battle, action, arg) =>
      battleAction(game, battle, action, arg),
    getBattleUI: battle => getBattleUI(game, battle),
    fromFrame: frame => inflateBattleSave(game, frame),
    iconMap: game.iconMap,
  };
}
