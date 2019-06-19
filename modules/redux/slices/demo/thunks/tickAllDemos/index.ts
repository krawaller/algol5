import { ThunkAction } from "redux-thunk";
import { WithAlgolDemoState } from "../../types";
import { ReducingAction } from "../../../../types";
import { stepAllDemos } from "../../actions";

type TickAllDemosThunk = ThunkAction<
  void,
  WithAlgolDemoState,
  undefined,
  ReducingAction<string, any, any>
>;

export const tickAllDemos = (playId: number): TickAllDemosThunk => {
  return (dispatch, getState) => {
    const demoState = getState().demo;
    if (demoState.playId === playId) {
      dispatch(stepAllDemos());
      setTimeout(() => dispatch(tickAllDemos(playId)), demoState.speed);
    }
  };
};
