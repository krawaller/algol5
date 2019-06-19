import { ThunkAction } from "redux-thunk";
import { WithAlgolDemoState } from "../../types";
import { ReducingAction } from "../../../../types";
import { GameId } from "../../../../../games/dist/list";
import { stepDemo } from "../../actions";

type TickDemoThunk = ThunkAction<
  void,
  WithAlgolDemoState,
  undefined,
  ReducingAction<string, any, any>
>;

export const tickDemo = (gameId: GameId): TickDemoThunk => {
  return (dispatch, getState) => {
    const demoState = getState().demo.demos[gameId]!;
    if (demoState.playing) {
      dispatch(stepDemo({ gameId }));
      setTimeout(() => dispatch(tickDemo(gameId)), demoState.speed);
    }
  };
};
