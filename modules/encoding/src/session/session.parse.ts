import { AlgolLocalBattle } from "../../../types";
import { parsePath } from "../path";
import { parseTimestamp } from "../timestamp";
import { parseSprites } from "../sprites";
import { sessionCodes } from "./session.codes";

export const parseSession = (str: string, id: string): AlgolLocalBattle => {
  const method = Number(str[0]);
  if (method === 0) {
    const [
      methodCodeTurn,
      encodedPath,
      encodedSprites,
      encodedCreated,
      encodedUpdated,
      endedBy,
    ] = str.split("\n");
    const status = sessionCodes[methodCodeTurn[1]];
    return {
      id,
      player: status[0],
      turn: parseInt(methodCodeTurn.slice(2), 36),
      type: status[1],
      path: parsePath(encodedPath, 0),
      sprites: parseSprites(encodedSprites),
      created: parseTimestamp(encodedCreated),
      ...(encodedUpdated && {
        updated: parseTimestamp(encodedUpdated),
      }),
      ...(endedBy && {
        endedBy, // TODO - encode this too, just for fun?
      }),
    };
  }
  throw new Error("Unknown parse method");
};
