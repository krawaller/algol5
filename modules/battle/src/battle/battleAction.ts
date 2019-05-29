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
  action: "endTurn" | "undo" | "mark" | "command",
  arg?: string
): AlgolBattle {
  if (action === "endTurn") return battleEndTurn(game, battle);
  if (action === "undo") return battleUndo(battle);
  if (action === "mark") return battleMark(game, battle, arg as string);
  if (action === "command") return battleCommand(game, battle, arg as string);
  throw new Error(`Unknown battle input: ${action} ${arg || ""}`);
}
