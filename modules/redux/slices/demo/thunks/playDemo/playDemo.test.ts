import { playDemo } from ".";

import { makeStore } from "../../../../store";

import demo from "../../../../../battle/dist/demos/amazons";
import { initDemo, startDemo, inflateDemo } from "../../actions";
import { inflateDemo as inflateDemoData } from "../../../../../common";
import { buildState } from "../../../../testUtils";
import { Store } from "redux";
import { AppState } from "../../../../types";
import { GameId } from "../../../../../battle/commands/helpers/_names";

const gameId: GameId = "amazons";

let store: Store<AppState, any> & {
  dispatch: {};
};

describe("the playDemo thunk", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    store = makeStore();
  });
  afterEach(() => jest.clearAllTimers());
  describe("when no demo in state", () => {
    test("will init and start it", () => {
      store.dispatch(playDemo(gameId, demo));
      expect(store.getState()).toEqual(
        buildState(initDemo({ demo, gameId }), startDemo({ gameId }))
      );
    });
    test("will inflate it asyncronously", () => {
      store.dispatch(playDemo("amazons", demo));
      jest.advanceTimersByTime(0);
      expect(store.getState()).toEqual(
        buildState(
          initDemo({ demo, gameId }),
          startDemo({ gameId }),
          inflateDemo({
            gameId,
            positions: inflateDemoData(demo).positions,
          })
        )
      );
    });
  });
  describe("when demo in state and hydrated", () => {
    beforeEach(() => {
      store.dispatch(initDemo({ demo, gameId }));
      store.dispatch(
        inflateDemo({
          gameId,
          positions: inflateDemoData(demo).positions,
        })
      );
    });
    describe("and playing", () => {
      beforeEach(() => {
        store.dispatch(startDemo({ gameId }));
      });
      test("it will not do anything ever", () => {
        const state = store.getState();
        store.dispatch(playDemo("amazons", demo));
        expect(store.getState()).toEqual(state);
        jest.runAllTimers();
        expect(store.getState()).toEqual(state);
      });
    });
    describe("and not playing", () => {
      beforeEach(() => {
        store.dispatch(playDemo(gameId, demo));
      });
      test("it steps the demo once", () => {
        jest.runOnlyPendingTimers();
        expect(store.getState().demo.demos[gameId]!.frame).toBe(1);
      });
      test("it steps again after timeout", () => {
        jest.runOnlyPendingTimers();
        jest.runOnlyPendingTimers();
        expect(store.getState().demo.demos[gameId]!.frame).toBe(2);
      });
    });
  });
});
