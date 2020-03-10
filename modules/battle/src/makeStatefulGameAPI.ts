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
  const { variants, setups, boards } = game;
  return {
    gameId: game.gameId,
    newBattle: (code = variants[0].code) => {
      const variant = variants.find(v => v.code === code);
      if (!variant) {
        throw new Error(`Couldnt find variant with code "${code}"`);
      }
      game.setBoard(boards[variant.board]);
      return fromBattle(game, newBattle(game, setups[variant.setup], variant));
    },
    fromSave: (save: AlgolBattleSave) => {
      // TODO - read board and variant from save
      game.setBoard(boards.basic);
      return fromBattle(game, inflateBattleSave(game, save));
    },
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
