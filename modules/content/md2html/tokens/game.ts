import { TokenHandler } from "./_symbol";
import lib from "../../../games/dist/lib";
import { allIcons } from "../../../graphics/dist/allIconSVGs";

// Takes an GAME token and turns it into clickable link (unless the current game)

export const game: TokenHandler = opts => {
  const { args, gameId: thisGameId } = opts;
  const { gameId } = args;
  if (!gameId) {
    throw new Error("Have to provide gameId");
  }
  const def = lib[gameId];
  if (!def) {
    throw new Error(`Unknown game "${gameId}"!`);
  }
  const name = def.meta.name;
  if (gameId === thisGameId)
    return `<span class="md-game-selfref">${name}</span>`;
  return `<a class="md-game-link" href="#" data-gameId="${gameId}">${name}</a>`;
};
