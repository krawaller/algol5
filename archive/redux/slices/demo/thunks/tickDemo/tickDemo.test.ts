import { tickDemo } from ".";

import { makeStore } from "../../../../store";

import demo from "../../../../../battle/dist/demos/amazons";
import { initDemo, startDemo, inflateDemo } from "../../actions";
import { inflateDemo as inflateDemoData } from "../../../../../common";
import { Store } from "redux";
import { AppState } from "../../../../types";
import { GameId } from "../../../../../battle/commands/helpers/_names";
import { pauseDemo } from "../../actions/pauseDemo";
import { resumeDemo } from "../../actions/resumeDemo";

const gameId: GameId = "amazons";

let store: Store<AppState, any> & {
  dispatch: {};
};

describe("the tickDemo thunk", () => {
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
  describe("when demo doesn't have matching playId", () => {
    test("nothing happens", () => {
      const state = store.getState();
      store.dispatch(tickDemo(gameId, 666));
      jest.runOnlyPendingTimers();
      expect(store.getState()).toEqual(state);
    });
  });
  describe("when demo has matching playID and is playing", () => {
    beforeEach(() => store.dispatch(startDemo({ gameId, playId: 666 })));
    test("it steps the demo once", () => {
      expect(store.getState().demo.demos[gameId]!.frame).toBe(0);
      store.dispatch(tickDemo(gameId, 666));
      expect(store.getState().demo.demos[gameId]!.frame).toBe(1);
    });
    test("it steps again after timeout", () => {
      store.dispatch(tickDemo(gameId, 666));
      jest.runOnlyPendingTimers();
      expect(store.getState().demo.demos[gameId]!.frame).toBe(2);
    });
  });
  describe("when demo has matching playID but isn't playing", () => {
    beforeEach(() => {
      store.dispatch(startDemo({ gameId, playId: 666 }));
      store.dispatch(pauseDemo({ gameId }));
    });
    test("it did not step the demo once", () => {
      expect(store.getState().demo.demos[gameId]!.frame).toBe(0);
      store.dispatch(tickDemo(gameId, 666));
      expect(store.getState().demo.demos[gameId]!.frame).toBe(0);
    });
    test("it steps again after timeout", () => {
      store.dispatch(tickDemo(gameId, 666));
      store.dispatch(resumeDemo({ gameId }));
      jest.runOnlyPendingTimers();
      expect(store.getState().demo.demos[gameId]!.frame).toBe(1);
    });
  });
});
