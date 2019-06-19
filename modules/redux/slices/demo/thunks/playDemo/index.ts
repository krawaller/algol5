import { ThunkAction } from "redux-thunk";
import { WithAlgolDemoState } from "../../types";
import { ReducingAction } from "../../../../types";
import { GameId } from "../../../../../games/dist/list";
import { AlgolDemo } from "../../../../../types";
import { initDemo, startDemo, inflateDemo } from "../../actions";
import { tickDemo } from "../tickDemo";
import { inflateDemo as inflateDemoData } from "../../../../../common";

type PlayDemoThunk = ThunkAction<
  void,
  WithAlgolDemoState,
  undefined,
  ReducingAction<string, any, any>
>;

export const playDemo = (gameId: GameId, demo: AlgolDemo): PlayDemoThunk => {
  return (dispatch, getState) => {
    let gameDemoState = getState().demo.demos[gameId];
    if (!gameDemoState) {
      dispatch(initDemo({ gameId, demo })); // register the non-inflated non-playing demo
      gameDemoState = getState().demo.demos[gameId];
    }
    if (gameDemoState!.playing) {
      // if we're already playing we don't need to do anything
      return;
    }
    dispatch(startDemo({ gameId })); // sets playing to true and sets speed
    gameDemoState = getState().demo.demos[gameId];
    if (!gameDemoState!.inflated) {
      setTimeout(() =>
        dispatch(
          inflateDemo({ gameId, positions: inflateDemoData(demo).positions })
        )
      );
    }
    setTimeout(() => dispatch(tickDemo(gameId)), gameDemoState!.speed);
  };
};
