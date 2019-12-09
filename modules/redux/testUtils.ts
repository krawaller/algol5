import { makeStore } from "./store";
import {
  AppState,
  Action,
  PayloadActionTest,
  ActionCreator,
  ActionTest,
} from "./types";

export const buildState = (
  ...actions: Action<string, any, any>[]
): AppState => {
  const store = makeStore();
  for (const action of actions) {
    store.dispatch(action);
  }
  return store.getState();
};

export const testCreator = <A extends Action<string, any, any>>(
  creator: ActionCreator<A>,
  tests: ActionTest<A>[]
) => {
  const name = creator.actionType;
  describe(`The ${name} creator`, () => {
    for (const t of tests) {
      test(t.description, () => {
        const payload = (t as PayloadActionTest<A>).payload;
        const action = creator(payload);
        const result = action.reducer(t.previous, payload);
        expect(result).toEqual(t.expected);
      });
    }
  });
};
