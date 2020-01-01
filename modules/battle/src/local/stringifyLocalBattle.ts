import { AlgolBattleSave, AlgolLocalBattle } from "../../../types";
import { stringifyPath } from "./stringifyPath";
import { stringifyBattleSave } from "./stringifyBattleSave";

export const stringifyLocalBattle = (
  local: AlgolLocalBattle,
  method: number
) => {
  if (method === 0) {
    return (
      "0" +
      JSON.stringify({
        ...local,
        save: stringifyBattleSave(local.save, method),
      })
    );
  }
  throw new Error("Unknown stringification method");
};
