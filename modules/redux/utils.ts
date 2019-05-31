import {
  ReducingAction,
  DraftReducer,
  ReducingActionType,
  ReducingActionPayload,
  ReducingActionCreator,
  ReducingPayloadActionTest,
  ReducingActionTest,
  AppState,
} from "./types";
import { produce } from "immer";

export const makeCreatorAndGuard = <
  A extends ReducingAction<string, any, AppState>
>(
  type: ReducingActionType<A>,
  reducer: DraftReducer<A>
) => {
  const creator = function(payload) {
    return {
      type,
      payload,
      reducer: (state, payload: ReducingActionPayload<A>) =>
        produce(state, draft => reducer(draft, payload)),
    };
  } as ReducingActionCreator<A>;

  creator.actionType = type;
  const guard = (action: ReducingAction<string, any, AppState>): action is A =>
    action.type === (type as string);
  return <const>[creator, guard];
};

export const testCreator = <A extends ReducingAction<string, any, AppState>>(
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
