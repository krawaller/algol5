import {
  ReducingAction,
  DraftReducer,
  ReducingActionType,
  ReducingActionPayload,
  ReducingActionState,
  ReducingActionCreator,
  ReducingPayloadActionTest,
  ReducingActionTest
} from "./types";
import { produce } from "immer";

export const makeCreatorAndGuard = <
  A extends ReducingAction<string, any, object>
>(
  type: ReducingActionType<A>,
  reducer: DraftReducer<A>
) => {
  const creator = function(payload: ReducingActionPayload<A>) {
    return {
      type,
      payload,
      reducer: (
        state: ReducingActionState<A>,
        payload: ReducingActionPayload<A>
      ) => produce(state, draft => reducer(draft, payload))
    };
  };
  // @ts-ignore
  creator.actionName = type;
  const guard = (action: ReducingAction<string, any, object>): action is A =>
    action.type === type;
  return <const>[creator, guard];
};

export const testCreator = <A extends ReducingAction<string, any, object>>(
  creator: ReducingActionCreator<A>,
  tests: ReducingActionTest<A>[]
) => {
  // @ts-ignore
  const name = creator.actionName;
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
