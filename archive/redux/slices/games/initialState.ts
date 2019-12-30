import { list } from "../../../games/dist/list";
import { AlgolGamesState } from "./types";

export const initialGamesState: AlgolGamesState = list.reduce(
  (memo, gameId) => {
    memo[gameId] = { loaded: false, loading: false };
    return memo;
  },
  {} as AlgolGamesState
);
