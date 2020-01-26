import { GameId } from "../../../games/dist/list";
import id2code from "../../../games/dist/id2code";
import id2name from "../../../games/dist/id2name";
import { parseBattleSave } from "../battleSave";
import { decorateError, NewAlgolError } from "../../../types";

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
    try {
      const battle = parseBattleSave(str.slice(1));
      return battle;
    } catch (err) {
      throw decorateError({
        err,
        errorId: "import-save-parse-failed",
        message: "Failed to parse the import seed!",
        meta: { seed: str, gameId: expectedGameId },
      });
    }
  } else {
    throw NewAlgolError({
      errorId: "import-wrong-seed-code",
      message: `This seed is not valid for ${id2name[expectedGameId]}. ${
        codeId
          ? `It might be for ${id2name[codeId as GameId]}!`
          : "Unable to determine which game it is for."
      }`,
      meta: { seed: str, gameId: expectedGameId },
    });
  }
};
