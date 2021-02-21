import { AlgolBattleSave } from "../../../types";
import { parsePath } from "../path/path.parse";
import { ongoingPlrCodes, endedPlrCodes } from "./battleSave.codes";
import code2id from "../../../games/dist/code2id";

export const parseBattleSave = (str: string): AlgolBattleSave => {
  const method = Number(str.match(/^[A-Za-z]+([0-9]+)/)?.[1]);
  if (method === 1) {
    const match = str.match(
      /^(?<gameCode>[A-Za-z]+)[0-9]+(?<statusCode>.)(?<variantCode>.)(?<encodedTurn>[^|]*)|(?<encodedPath>.+)/
    );
    if (!match || !match.groups) throw new Error("Failed to parse battlesave!");
    const {
      statusCode,
      variantCode,
      gameCode,
      encodedTurn,
      encodedPath,
    } = match.groups;
    console.log("OMG", str, match.groups);
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

    return {
      player: player as 0 | 1 | 2,
      turn: parseInt(encodedTurn, 20),
      ended,
      path: parsePath(encodedPath, 0),
      variantCode,
      gameId: code2id[gameCode],
    };
  }
  throw new Error(`Unknown parse method "${method}"`);
};
