import { TokenHandler } from "./_handler";
import lib from "../../../games/dist/lib";

// Takes an GAME token and turns it into clickable link (unless the current game)

export const game: TokenHandler = opts => {
  const { args, gameId: thisGameId } = opts;
  let { id: gameId } = args;
  if (!gameId) {
    if (thisGameId) {
      gameId = thisGameId!;
    } else {
      throw new Error("Game ref but no gameId or default gameId");
    }
  }
  const def = lib[gameId];
  if (!def) {
    throw new Error(`Unknown game "${gameId}"!`);
  }
  const name = def.meta.name;
  if (gameId === thisGameId)
    return `<span class="md-game-selfref">${name}</span>`;
  return `<a class="md-game-link" href="/games/${gameId}" data-gameId="${gameId}">${name}</a>`;
};
