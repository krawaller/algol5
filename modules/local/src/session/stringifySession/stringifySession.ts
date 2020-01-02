import { AlgolBattleSave, AlgolLocalBattle } from "../../../../types";
import { stringifyBattleSave } from "./stringifyBattleSave";

export const stringifySession = (local: AlgolLocalBattle, method: number) => {
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
