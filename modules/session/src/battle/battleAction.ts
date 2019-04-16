import { AlgolBattle, AlgolGame } from "../../../types";

import {
  battleEndTurn,
  battleUndo,
  battleMark,
  battleCommand
} from "./helpers";

export function battleAction(
  game: AlgolGame,
  battle: AlgolBattle,
  action: string
): AlgolBattle {
  if (action === "endturn") return battleEndTurn(game, battle);
  if (action === "undo") return battleUndo(battle);
  if (action.match(/^[a-z][0-9]+$/)) return battleMark(battle, action);
  return battleCommand(battle, action);
}
