import { AlgolBattleSave } from "../../../types";
import { stringifyPath } from "../path/path.stringify";
import { endedPlrCodes, ongoingPlrCodes } from "./battleSave.codes";

export const stringifyBattleSave = (save: AlgolBattleSave, method = 0) => {
  const { path, player, turn, ended } = save;
  if (method === 0) {
    return `${method}${
      (ended ? endedPlrCodes : ongoingPlrCodes)[player]
    }${turn.toString(20)}|${stringifyPath(path, method)}`;
  }
  throw new Error("Unknown stringification method");
};
