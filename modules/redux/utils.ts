import {
  ReducingAction,
  DraftReducer,
  ReducingActionType,
  ReducingActionPayload,
  ReducingActionCreator,
} from "./types";
import { produce } from "immer";

export const makeCreatorAndGuard = <A extends ReducingAction<string, any, any>>(
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
  const guard = (action: ReducingAction<string, any, any>): action is A =>
    action.type === (type as string);
  return <const>[creator, guard];
};
