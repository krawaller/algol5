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

export const tickDemo = (gameId: GameId, playId: number): TickDemoThunk => {
  return (dispatch, getState) => {
    const demoState = getState().demo.demos[gameId]!;
    if (demoState.playing === playId) {
      dispatch(stepDemo({ gameId }));
      setTimeout(() => dispatch(tickDemo(gameId, playId)), demoState.speed);
    }
  };
};
