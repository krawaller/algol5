import { TokenHandler } from "./_handler";
import lib from "../../../games/dist/lib";

// Takes an ENDGAME token (reference to an endgame condition) and renders it with special styles. Expexts a "name" arg
// and optionally "gameId"

export const endgame: TokenHandler = opts => {
  const { args, gameId: thisGameId } = opts;
  let { name, gameId } = args;
  if (!gameId) {
    if (thisGameId) {
      gameId = thisGameId;
    } else {
      throw new Error("ENDGAME needs gameId when there's no contextual id!");
    }
  }
  if (!name) {
    throw new Error("ENDGAME must have a name!");
  }
  const ends = lib[gameId].flow.endGame || {};
  if (!ends[name] && name !== "starvation") {
    throw new Error(`Game ${gameId} does not have endGame ${name}`);
  }
  return `<code class="md-endgame" data-endgame="${name}" >${name}</code>`;
};
