import { WithAlgolDemoState } from "../slices/demo/types";
import { WithAlgolBattleState } from "../slices/battle/types";
import { WithAlgolGamesState } from "../slices";
export type AppState = WithAlgolDemoState &
  WithAlgolBattleState &
  WithAlgolGamesState;
