import { AlgolBattleSave } from "../../../types";
import { stringifyPath } from "../path/path.stringify";
import { endedPlrCodes, ongoingPlrCodes } from "./battleSave.codes";
import id2code from "../../../games/dist/id2code";

export const stringifyBattleSave = (save: AlgolBattleSave, method = 1) => {
  const { path, player, turn, ended, variantCode, gameId } = save;
  const gameCode = id2code[gameId];
  if (!variantCode) {
    console.error(save);
    throw new Error("Asked to stringify save with no variant code");
  }
  if (method === 1) {
    const statusCode = (ended ? endedPlrCodes : ongoingPlrCodes)[player];
    const encodedTurn = turn.toString(20);
    const encodedPath = stringifyPath(path, 0);
    const str = `${gameCode}${method}${statusCode}${variantCode}${encodedTurn}|${encodedPath}`;
    console.log("WTF?!?!?!", { encodedTurn, encodedPath }, str);
    return str;
  }
  throw new Error(`Unknown stringification method "${method}"`);
};
