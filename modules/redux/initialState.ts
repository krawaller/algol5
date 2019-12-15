import { AppState } from "./types";

import {
  initialBattleState,
  initialDemoState,
  initialGamesState,
} from "./slices";

export const initialState: AppState = {
  battle: initialBattleState,
  demo: initialDemoState,
  games: initialGamesState,
};
