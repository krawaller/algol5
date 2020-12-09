import { GameId } from "../../../games/dist/list";
import id2code from "../../../games/dist/id2code";
import id2name from "../../../games/dist/id2name";
import { parseBattleSave } from "../battleSave";
import { decorateError, NewAlgolError } from "../../../types";

// The game code is the initial part of the seed consisting of letters.
// It will be followed by encoding method identifier, which always starts with a non-letter.
const codeMatcher = /^([A-Za-z]*)/;

export const parseSeed = (str: string, expectedGameId: GameId) => {
  const expectedCode = Object.entries(id2code)
    .filter(([i]) => i === expectedGameId)
    .map(e => e[1])
    .pop();
  const code = (str.match(codeMatcher) || [""])[0];
  if (!code.length) {
    throw NewAlgolError({
      errorId: "import-seed-missing-code",
      description: "This seed doesn't seem to contain a game identifier!",
      meta: { seed: str, gameId: expectedGameId },
    });
  }
  const codeId = Object.entries(id2code)
    .filter(([, c]) => c === code)
    .map(e => e[0])
    .pop();

  if (code === expectedCode) {
    try {
      const battle = parseBattleSave(str.slice(code.length));
      return battle;
    } catch (err) {
      throw decorateError({
        err,
        errorId: "import-save-parse-failed",
        description: "Failed to parse the import seed!",
        meta: { seed: str, gameId: expectedGameId },
      });
    }
  } else {
    throw NewAlgolError({
      errorId: "import-wrong-seed-code",
      description: `This seed is not valid for ${id2name[expectedGameId]}. ${
        codeId
          ? `It might be for ${id2name[codeId as GameId]}!`
          : "Unable to determine which game it is for."
      }`,
      meta: { seed: str, gameId: expectedGameId },
    });
  }
};
