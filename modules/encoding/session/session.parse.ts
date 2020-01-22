import { AlgolLocalBattle } from "../../types";
import { parsePath } from "../path";
import { parseScreenshot } from "../screenshot";

export const parseSession = (str: string, id: string): AlgolLocalBattle => {
  const method = Number(str[0]);
  if (method === 0) {
    const obj = JSON.parse(str.slice(1)) as AlgolLocalBattle;
    obj.id = id;
    obj.path = parsePath((obj.path as unknown) as string, method);
    obj.screenshot = parseScreenshot((obj.screenshot as unknown) as string);
    return obj;
  }
  throw new Error("Unknown parse method");
};
