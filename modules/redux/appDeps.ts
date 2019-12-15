import { makeStaticGameAPI } from "../battle/src/";
import games from "../logic/dist";
import { AppDeps } from "./types";

export const appDeps: AppDeps = {
  loadedGames: {},
  loadGame: gameId =>
    new Promise(resolve => {
      // TODO - dynamic load
      setTimeout(() => {
        const game = games[gameId];
        const api = makeStaticGameAPI(game);
        appDeps.loadedGames[gameId] = { game, api };
        resolve({ game, api });
      }, 500);
    }),
  // TODO - kill off this
  getGameAPI: gameId => Promise.resolve(makeStaticGameAPI(games[gameId])),
};
