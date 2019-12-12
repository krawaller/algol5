import { GameId } from "../../games/dist/list";
import { AlgolStaticGameAPI } from "../../types";

export type AppDeps = {
  getGameAPI: (gameId: GameId) => Promise<AlgolStaticGameAPI>;
};
