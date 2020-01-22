import { GameId } from "../../games/dist/list";
import id2code from "../../games/dist/id2code";
import id2name from "../../games/dist/id2name";
import { parseBattleSave } from "../battleSave";

export const parseSeed = (str: string, expectedGameId: GameId) => {
  const expectedCode = Object.entries(id2code)
    .filter(([i, c]) => i === expectedGameId)
    .map(e => e[1])
    .pop();
  const code = str[0];
  const codeId = Object.entries(id2code)
    .filter(([, c]) => c === code)
    .map(e => e[0])
    .pop();

  if (code === expectedCode) {
    return parseBattleSave(str.slice(1));
  } else {
    return new Error(
      `This seed is not for ${id2name[expectedGameId]}, it is for ${
        codeId ? id2name[codeId as GameId] : "an unknown game"
      }`
    );
  }
};
