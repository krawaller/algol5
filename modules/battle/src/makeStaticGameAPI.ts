import { AlgolGame, AlgolStaticGameAPI } from "../../types";
import { newBattle, battleAction } from "./battle";

export function makeStaticGameAPI(game: AlgolGame): AlgolStaticGameAPI {
  return {
    newBattle: () => newBattle(game),
    performAction: (battle, action, arg) =>
      battleAction(game, battle, action, arg),
  };
}
