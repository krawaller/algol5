import { AlgolBattleSave } from "../../../types";
import { stringifyPath } from "../path/path.stringify";
import { endedPlrCodes, ongoingPlrCodes } from "./battleSave.codes";

export const stringifyBattleSave = (save: AlgolBattleSave, method = 0) => {
  const { path, player, turn, ended, variantCode } = save;
  if (!variantCode) {
    console.error(save);
    throw new Error("Asked to stringify save with no variant code");
  }
  if (method === 0) {
    const statusCode = (ended ? endedPlrCodes : ongoingPlrCodes)[player];
    const num = turn.toString(20);
    const str = stringifyPath(path, method);
    return `${method}${statusCode}${variantCode}${num}|${str}`;
  }
  throw new Error("Unknown stringification method");
};
