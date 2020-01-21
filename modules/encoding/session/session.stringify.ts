import { AlgolLocalBattle } from "../../types";
import { stringifyPath } from "../path";

export const stringifySession = (local: AlgolLocalBattle, method: number) => {
  if (method === 0) {
    const { id: _omit, ...data } = local;
    return (
      "0" +
      JSON.stringify({
        ...data,
        path: stringifyPath(data.path, 0),
      })
    );
  }
  throw new Error("Unknown stringification method");
};
