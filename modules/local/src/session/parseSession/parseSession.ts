import { AlgolLocalBattle } from "../../../../types";

export const parseSession = (str: string, id: string): AlgolLocalBattle => {
  const method = Number(str[0]);
  if (method === 0) {
    const obj = JSON.parse(str.slice(1)) as AlgolLocalBattle;
    obj.id = id;
    return obj;
  }
  throw new Error("Unknown parse method");
};
