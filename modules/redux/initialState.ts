import { AppState } from "./types";

import { initialBattleState, initialDemoState } from "./slices";

export const initialState: AppState = {
  battle: initialBattleState,
  demo: initialDemoState,
};
