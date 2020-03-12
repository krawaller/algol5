import { AlgolGame, AlgolStaticGameAPI } from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";
import { inflateBattleSave } from "./battle/helpers";

export function makeStaticGameAPI(game: AlgolGame): AlgolStaticGameAPI {
  const { variants, setups, boards } = game;
  return {
    gameId: game.gameId,
    newBattle: (code = variants[0].code) => {
      const variant = variants.find(v => v.code === code);
      if (!variant) {
        throw new Error(`Couldnt find variant with code "${code}"`);
      }
      game.setBoard(boards[variant.board]);
      const battle = newBattle(game, setups[variant.setup], variant);
      return battle;
    },
    fromSave: save => {
      const variant = variants.find(v => v.code === save.variantCode);
      if (!variant) {
        console.error(save);
        throw new Error(
          `Couldnt find variant with code "${save.variantCode}" when inflating save`
        );
      }
      game.setBoard(boards[variant.board]);
      return inflateBattleSave(game, save);
    },
    performAction: (battle, action, arg) =>
      battleAction(game, battle, action, arg),
    getBattleUI: battle => getBattleUI(game, battle),
    fromFrame: (frame, variantCode: string) =>
      inflateBattleSave(game, {
        ...frame,
        variantCode,
      }),
    iconMap: game.iconMap,
    variants: game.variants,
  };
}
