import { ReducingAction, DraftReducer, Reducer } from "./types";
import { produce } from "immer";

type payloadActionCreator<T, P, S> = (
  payload: P
) => { type: T; payload: P; reducer: Reducer<S, P> };

type nakedActionCreator<T, S> = () => {
  type: T;
  payload: undefined;
  reducer: Reducer<S, undefined>;
};

export const makeCreatorAndGuard = <
  A extends ReducingAction<string, any, object>
>(
  type: A["type"],
  reducer: DraftReducer<ReturnType<A["reducer"]>, A["payload"]>
) => {
  const creator = ((payload: A["payload"]) => ({
    type,
    payload,
    reducer: (state, payload) =>
      produce(state, draft => reducer(draft, payload))
  })) as A["payload"] extends undefined | never
    ? nakedActionCreator<A["type"], ReturnType<A["reducer"]>> // make sure TS doesn't force us to pass undefined as param when action takes no payload
    : payloadActionCreator<A["type"], A["payload"], ReturnType<A["reducer"]>>;
  const guard = (action: ReducingAction<string, any, object>): action is A =>
    action.type === type;
  return <const>[creator, guard];
};
