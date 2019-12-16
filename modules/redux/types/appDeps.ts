import { GameId } from "../../games/dist/list";
import { AlgolStaticGameAPI, AlgolGame } from "../../types";

export type AppDeps = {
  loadGame: (
    gameId: GameId
  ) => Promise<{ game: AlgolGame; api: AlgolStaticGameAPI }>;
  loadedGames: Partial<
    Record<GameId, { game: AlgolGame; api: AlgolStaticGameAPI }>
  >;
  sideloadGame: (gameId: GameId, game: AlgolGame) => void;
  getGameAPI: (gameId: GameId) => Promise<AlgolStaticGameAPI>;
};
