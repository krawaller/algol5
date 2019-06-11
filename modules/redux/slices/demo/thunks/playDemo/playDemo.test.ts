import { playDemo } from ".";

import { makeStore } from "../../../../store";

import demo from "../../../../../battle/dist/demos/amazons";
import { initDemo, startDemo, inflateDemo } from "../../actions";
import { inflateDemo as inflateDemoData } from "../../../../../common";
import { buildState } from "../../../../testUtils";
import { Store } from "redux";
import { AppState } from "../../../../types";

let store: Store<AppState, any> & {
  dispatch: {};
};

describe("the playDemo thunk", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    store = makeStore();
  });
  describe("when no demo in state", () => {
    test("will init and start it", () => {
      store.dispatch(playDemo("amazons", demo));
      expect(store.getState()).toEqual(
        buildState(
          initDemo({ demo, gameId: "amazons" }),
          startDemo({ gameId: "amazons" })
        )
      );
    });
    test("will inflate it asyncronously", () => {
      store.dispatch(playDemo("amazons", demo));
      jest.advanceTimersByTime(0);
      expect(store.getState()).toEqual(
        buildState(
          initDemo({ demo, gameId: "amazons" }),
          startDemo({ gameId: "amazons" }),
          inflateDemo({
            gameId: "amazons",
            positions: inflateDemoData(demo).positions,
          })
        )
      );
    });
  });
  describe("when demo in state and hydrated", () => {
    beforeEach(() => {
      store.dispatch(initDemo({ demo, gameId: "amazons" }));
      store.dispatch(
        inflateDemo({
          gameId: "amazons",
          positions: inflateDemoData(demo).positions,
        })
      );
    });
    describe("and playing", () => {
      beforeEach(() => {
        store.dispatch(startDemo({ gameId: "amazons" }));
      });
      test("it will not do anything ever", () => {
        const thunk = playDemo("amazons", demo);
        const dispatch = jest.fn();
        const getState = () => store.getState();
        thunk(dispatch, getState, undefined);
        jest.runAllTimers();
        expect(dispatch).not.toHaveBeenCalled();
      });
    });
  });
});
