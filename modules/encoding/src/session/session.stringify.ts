import { AlgolSession } from "../../../types";
import { stringifyPath } from "../path";
import { stringifyTimestamp } from "../timestamp";
import { stringifySprites } from "../sprites";
import { codeForSession } from "./session.codes";
import id2code from "../../../games/dist/id2code";

export const stringifySession = (local: AlgolSession, method: number) => {
  if (method === 0) {
    return [
      "0" +
        codeForSession(local.player, local.type) +
        local.variantCode +
        local.turn.toString(36),
      stringifyPath(local.path, 0),
      stringifySprites(local.sprites),
      stringifyTimestamp(local.created),
      local.updated ? stringifyTimestamp(local.updated) : "",
      id2code[local.gameId],
      local.endedBy || "",
    ].join("\n");
  }
  throw new Error("Unknown stringification method");
};
