import { TokenHandler } from "./_handler";
import lib from "../../../games/dist/lib";

// Takes a CMND token (reference to a command) and renders it with special styles. Expexts a "name" arg

export const cmnd: TokenHandler = opts => {
  const { args, gameId: thisGameId } = opts;
  let { name, gameId } = args;
  if (!gameId) {
    if (thisGameId) {
      gameId = thisGameId;
    } else {
      throw new Error("CMND needs gameId when there's no contextual id!");
    }
  }
  const cmnds = lib[gameId].flow.commands;
  if (!name) {
    const names = Object.keys(cmnds);
    if (names.length === 1) {
      name = names[0];
    } else {
      throw new Error("Must provide CMND name since there is more than 1!");
    }
  }
  if (!cmnds[name]) {
    throw new Error(`Game ${gameId} does not have command "${name}"`);
  }
  return `<button class="md-cmnd" data-cmnd="${name}" >${name}</button>`;
};
