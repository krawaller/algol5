import { AlgolBattleSave } from "../../../../types";
import { stringifyPath } from "./stringifyPath";

export const stringifyBattleSave = (save: AlgolBattleSave, method: number) => {
  const { path, player, turn, ended } = save;
  if (method === 0) {
    return [
      method,
      player,
      ended ? "1" : "",
      turn,
      stringifyPath(path, method),
    ].join("|");
  }
  throw new Error("Unknown stringification method");
};
