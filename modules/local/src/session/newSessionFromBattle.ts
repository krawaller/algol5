import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { newSessionId } from "./newSessionId";
import { board2entities } from "../../../encoding/src/entity";

export function newSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "normal",
    player: 1,
    turn: 1,
    path: [],
    sprites: board2entities({
      marks: [],
      units: battle.state.board.units,
      iconMap: battle.iconMap,
    }),
  };
}
