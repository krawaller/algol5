import { AlgolBattleSave } from "../../types";
import { parsePath } from "../path/path.parse";
import { ongoingPlrCodes, endedPlrCodes } from "./battleSave.codes";

export const parseBattleSave = (str: string): AlgolBattleSave => {
  const method = Number(str[0]);
  if (method === 0) {
    const code = str[1];
    let ended, player;
    if (ongoingPlrCodes.includes(code)) {
      ended = false;
      player = ongoingPlrCodes.indexOf(code);
    } else if (endedPlrCodes.includes(code)) {
      ended = true;
      player = endedPlrCodes.indexOf(code);
    } else {
      throw new Error("Battlesave had unknown status code!");
    }
    const [encodedTurn, encodedPath] = str.slice(2).split("|");

    return {
      player: player as 0 | 1 | 2,
      turn: parseInt(encodedTurn, 20),
      ended,
      path: parsePath(encodedPath, method),
    };
  }
  throw new Error(`Unknown parse method "${method}"`);
};
