import { tickAllDemos } from ".";

import { makeStore } from "../../../../store";

import demo from "../../../../../battle/dist/demos/amazons";
import { initDemo, startDemo, inflateDemo } from "../../actions";
import { inflateDemo as inflateDemoData } from "../../../../../common";
import { Store } from "redux";
import { AppState } from "../../../../types";
import { GameId } from "../../../../../battle/commands/helpers/_names";

const gameId: GameId = "amazons";

let store: Store<AppState, any> & {
  dispatch: {};
};

describe("the tickAllDemos thunk", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    store = makeStore();
    store.dispatch(initDemo({ gameId, demo }));
    store.dispatch(
      inflateDemo({
        gameId,
        positions: inflateDemoData(demo).positions,
      })
    );
  });
  afterEach(() => {
    jest.clearAllTimers();
  });
  describe("when demo isn't playing", () => {
    test("nothing happens", () => {
      const state = store.getState();
      store.dispatch(tickAllDemos(666));
      jest.runOnlyPendingTimers();
      expect(store.getState()).toEqual(state);
    });
  });
  describe.skip("when demo is playing", () => {
    beforeEach(() => store.dispatch(startDemo({ gameId, playId: 666 })));
    test("it steps the demo once", () => {
      console.log("OMG", store.getState().demo);
      expect(store.getState().demo.demos[gameId]!.frame).toBe(0);
      store.dispatch(tickAllDemos(666));
      expect(store.getState().demo.demos[gameId]!.frame).toBe(1);
    });
    test("it steps again after timeout", () => {
      store.dispatch(tickAllDemos(666));
      jest.runOnlyPendingTimers();
      jest.runOnlyPendingTimers();
      expect(store.getState().demo.demos[gameId]!.frame).toBe(2);
    });
  });
});
