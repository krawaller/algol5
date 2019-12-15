import { GameId } from "../../../games/dist/list";

export type AlgolGameState = {
  loaded: boolean;
  loading: boolean;
  error?: string;
};

export type AlgolGamesState = Record<GameId, AlgolGameState>;

export interface WithAlgolGamesState {
  games: AlgolGamesState;
}
