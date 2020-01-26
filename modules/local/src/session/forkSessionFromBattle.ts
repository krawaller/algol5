import { AlgolBattle, AlgolLocalBattle } from "../../../types";
import { newSessionId } from "./newSessionId";
import { board2entities } from "../../../encoding/src/entity";

export function forkSessionFromBattle(battle: AlgolBattle): AlgolLocalBattle {
  return {
    id: newSessionId(),
    created: Date.now(),
    type: "fork",
    player: battle.player,
    turn: battle.turnNumber,
    path: battle.path,
    sprites: board2entities({
      marks: [],
      units: battle.state.board.units,
      iconMap: battle.iconMap,
    }),
  };
}
