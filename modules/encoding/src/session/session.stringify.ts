import { AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "../path";
import { stringifyScreenshot } from "../screenshot";
import { stringifyTimestamp } from "../timestamp";
import { stringifyEntities } from "../entity";

export const stringifySession = (local: AlgolLocalBattle, method: number) => {
  if (method === 0) {
    const { id: _omit, ...data } = local;
    return (
      "0" +
      JSON.stringify({
        ...data,
        path: stringifyPath(data.path, 0),
        sprites: stringifyEntities(data.sprites),
        created: stringifyTimestamp(data.created),
        ...(data.updated && {
          updated: stringifyTimestamp(data.updated),
        }),
      })
    );
  }
  throw new Error("Unknown stringification method");
};
