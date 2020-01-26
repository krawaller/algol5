import { AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "../path";
import { stringifyTimestamp } from "../timestamp";
import { stringifySprites } from "../sprites";

export const stringifySession = (local: AlgolLocalBattle, method: number) => {
  if (method === 0) {
    const { id: _omit, ...data } = local;
    return (
      "0" +
      JSON.stringify({
        ...data,
        path: stringifyPath(data.path, 0),
        sprites: stringifySprites(data.sprites),
        created: stringifyTimestamp(data.created),
        ...(data.updated && {
          updated: stringifyTimestamp(data.updated),
        }),
      })
    );
  }
  throw new Error("Unknown stringification method");
};
