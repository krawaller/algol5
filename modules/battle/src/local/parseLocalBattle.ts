import { AlgolBattleSave, AlgolLocalBattle } from "../../../types";
import { parsePath } from "./parsePath";
import { parseBattleSave } from "./parseBattleSave";

export const parseLocalBattle = (str: string): AlgolLocalBattle => {
  const method = Number(str[0]);
  if (method === 0) {
    const obj = JSON.parse(str.slice(1));
    return {
      ...obj,
      save: parseBattleSave(obj.save),
    };
  }
  throw new Error("Unknown parse method");
};
