import { AlgolBattleSave, AlgolLocalBattle } from "../../../../types";
import { stringifyBattleSave } from "./stringifyBattleSave";

export const stringifySession = (local: AlgolLocalBattle, method: number) => {
  if (method === 0) {
    return "0" + JSON.stringify(local);
  }
  throw new Error("Unknown stringification method");
};
