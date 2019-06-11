import { makeStore } from "./store";
import {
  AppState,
  ReducingAction,
  ReducingPayloadActionTest,
  ReducingActionCreator,
  ReducingActionTest,
} from "./types";

export const buildState = (
  ...actions: ReducingAction<string, any, any>[]
): AppState => {
  const store = makeStore();
  for (const action of actions) {
    store.dispatch(action);
  }
  return store.getState();
};

export const testCreator = <A extends ReducingAction<string, any, any>>(
  creator: ReducingActionCreator<A>,
  tests: ReducingActionTest<A>[]
) => {
  const name = creator.actionType;
  describe(`The ${name} creator`, () => {
    for (const t of tests) {
      test(t.description, () => {
        const payload = (t as ReducingPayloadActionTest<A>).payload;
        const action = creator(payload);
        const result = action.reducer(t.previous, payload);
        expect(result).toEqual(t.expected);
      });
    }
  });
};
