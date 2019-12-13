import { makeStaticGameAPI } from "../battle/src/";
import games from "../logic/dist";
import { AppDeps } from "./types";

export const appDeps: AppDeps = {
  getGameAPI: gameId => Promise.resolve(makeStaticGameAPI(games[gameId])),
};
