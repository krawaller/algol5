import { AlgolBattleSave } from "../../../types";
import { stringifyPath } from "./stringifyPath";

export const stringifyBattleSave = (save: AlgolBattleSave, method: number) => {
  const { path, player, turn, endedBy } = save;
  if (method === 0) {
    return [method, player, endedBy, turn, stringifyPath(path, method)].join(
      "|"
    );
  }
  throw new Error("Unknown stringification method");
};
