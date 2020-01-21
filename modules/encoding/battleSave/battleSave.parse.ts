import { AlgolBattleSave } from "../../types";
import { parsePath } from "../path/path.parse";

export const parseBattleSave = (str: string): AlgolBattleSave => {
  const method = Number(str[0]);
  if (method === 0) {
    const [, player, ended, turn, pathStr] = str.split("|");
    return {
      player: Number(player) as 0 | 1 | 2,
      turn: Number(turn),
      ended: Boolean(ended),
      path: parsePath(pathStr, method),
    };
  }
  throw new Error("Unknown parse method");
};