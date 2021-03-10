import { AlgolSession, localParticipants } from "../../../types";
import { parsePath } from "../path";
import { parseTimestamp } from "../timestamp";
import { parseSprites } from "../sprites";
import { sessionCodes } from "./session.codes";
import { GameId } from "../../../games/dist/list";
import code2id from "../../../games/dist/code2id";

export const parseSession = (str: string, id: string): AlgolSession => {
  const method = Number(str[0]);
  if (method === 0) {
    const [
      methodCodeTurn,
      encodedPath,
      encodedSprites,
      encodedCreated,
      encodedUpdated,
      gameCode,
      endedBy,
    ] = str.split("\n");
    const status = sessionCodes[methodCodeTurn[1]];
    return {
      id,
      gameId: code2id[gameCode as keyof typeof code2id] as GameId,
      player: status[0],
      variantCode: methodCodeTurn[2],
      turn: parseInt(methodCodeTurn.slice(3), 36),
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
      participants: localParticipants,
    };
  }
  throw new Error("Unknown parse method");
};
