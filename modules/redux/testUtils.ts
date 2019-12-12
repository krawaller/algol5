import { makeStore } from "./store";
import { AppState, Action, ActionTest } from "./types";

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
  creator: { actionType: string } & ((p: A["payload"]) => A),
  tests: ActionTest<A>[]
) => {
  const name = creator.actionType;
  describe(`The ${name} creator`, () => {
    for (const t of tests) {
      test(t.description, () => {
        const payload = t.payload;
        const action = creator(payload as any);
        const result = action.reducer(t.previous, payload as any);
        expect(result).toEqual(t.expected);
      });
    }
  });
};
