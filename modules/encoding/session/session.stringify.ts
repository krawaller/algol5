import { AlgolLocalBattle } from "../../types";

export const stringifySession = (local: AlgolLocalBattle, method: number) => {
  if (method === 0) {
    const { id: _omit, ...data } = local;
    return "0" + JSON.stringify(data);
  }
  throw new Error("Unknown stringification method");
};
