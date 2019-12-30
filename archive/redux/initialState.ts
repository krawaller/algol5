import { AppState } from "./types";

import {
  initialBattleState,
  initialDemoState,
  initialGamesState,
} from "./slices";

export const initialState: AppState = {
  battles: initialBattleState,
  demo: initialDemoState,
  games: initialGamesState,
};
