import { WithAlgolDemoState } from "../slices/demo/types";
import { WithAlgolBattleState } from "../slices/battle/types";
export type AppState = WithAlgolDemoState & WithAlgolBattleState;
