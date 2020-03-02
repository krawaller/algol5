import {
  AlgolGame,
  AlgolStatefulGameAPI,
  AlgolStatefulGameAPISession,
  AlgolBattle,
  AlgolBattleSave,
  AlgolSetupBookAnon,
  AlgolBoardBookAnon,
} from "../../types";
import { newBattle, battleAction, getBattleUI } from "./battle";
import { inflateBattleSave } from "./battle/helpers";

export function makeStatefulGameAPI(
  game: AlgolGame,
  setups: AlgolSetupBookAnon,
  boards: AlgolBoardBookAnon
): AlgolStatefulGameAPI {
  return {
    gameId: game.gameId,
    newBattle: () => {
      // TODO - variants choices selecting which setup and board
      game.setBoard(boards.basic);
      return fromBattle(game, newBattle(game, setups.basic));
    },
    fromSave: (
      save: AlgolBattleSave // TODO - read variant from save
    ) => fromBattle(game, inflateBattleSave(game, save)),
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
