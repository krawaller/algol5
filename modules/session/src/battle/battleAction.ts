import { AlgolBattle, AlgolGame } from "../../../types";

import {
  battleEndTurn,
  battleUndo,
  battleMark,
  battleCommand
} from "./helpers";

const identifyMark = /^[a-z][0-9]+$/;

export function battleAction(
  game: AlgolGame,
  battle: AlgolBattle,
  action: string
): AlgolBattle {
  if (action === "endTurn") return battleEndTurn(game, battle);
  if (action === "undo") return battleUndo(battle);
  if (action.match(identifyMark)) return battleMark(battle, action);
  return battleCommand(battle, action);
}
