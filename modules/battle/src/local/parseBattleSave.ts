import { AlgolBattleSave } from "../../../types";
import { parsePath } from "./parsePath";

export const parseBattleSave = (str: string): AlgolBattleSave => {
  const method = Number(str[0]);
  if (method === 0) {
    const [, player, endedBy, turn, pathStr] = str.split("|");
    return {
      player: Number(player) as 0 | 1 | 2,
      turn: Number(turn),
      endedBy,
      path: parsePath(pathStr, method),
    };
  }
  throw new Error("Unknown parse method");
};
