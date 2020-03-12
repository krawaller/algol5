import { AlgolBattleSave } from "../../../types";
import { parsePath } from "../path/path.parse";
import { ongoingPlrCodes, endedPlrCodes } from "./battleSave.codes";

export const parseBattleSave = (str: string): AlgolBattleSave => {
  const method = Number(str[0]);
  if (method === 0) {
    const statusCode = str[1];
    let ended, player;
    if (ongoingPlrCodes.includes(statusCode)) {
      ended = false;
      player = ongoingPlrCodes.indexOf(statusCode);
    } else if (endedPlrCodes.includes(statusCode)) {
      ended = true;
      player = endedPlrCodes.indexOf(statusCode);
    } else {
      throw new Error("Battlesave had unknown status code!");
    }
    const variantCode = str[2];
    const [encodedTurn, encodedPath] = str.slice(3).split("|");

    return {
      player: player as 0 | 1 | 2,
      turn: parseInt(encodedTurn, 20),
      ended,
      path: parsePath(encodedPath, method),
      variantCode,
    };
  }
  throw new Error(`Unknown parse method "${method}"`);
};
