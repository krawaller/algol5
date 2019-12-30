import { ThunkAction } from "redux-thunk";
import { WithAlgolDemoState } from "../../types";
import { Action, AppDeps, AppState } from "../../../../types";
import { GameId } from "../../../../../games/dist/list";
import { stepDemo } from "../../actions";

type TickDemoThunk = ThunkAction<
  void,
  WithAlgolDemoState,
  undefined,
  Action<any, any, AppState, AppDeps>
>;

export const tickDemo = (gameId: GameId, playId: number): TickDemoThunk => {
  return (dispatch, getState) => {
    const demoState = getState().demo.demos[gameId]!;
    if (demoState.playId === playId) {
      if (demoState.playing) {
        dispatch(stepDemo({ gameId }));
      }
      setTimeout(() => dispatch(tickDemo(gameId, playId)), demoState.speed);
    }
  };
};
