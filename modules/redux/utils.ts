import { Action, DraftReducer, ActionCreator } from "./types";
import { produce } from "immer";

type FactoryOpts<A extends Action<string, any, any>> = {
  type: A["type"];
  reducer: DraftReducer<A>;
};

export const makeCreatorAndGuard = <A extends Action<string, any, any>>({
  type,
  reducer,
}: FactoryOpts<A>) => {
  const creator = function(payload) {
    return {
      type,
      payload,
      reducer: (state, payload: A["payload"]) =>
        produce(state, draft => reducer(draft, payload)),
    };
  } as ActionCreator<A>;

  creator.actionType = type;
  const guard = (action: Action<string, any, any>): action is A =>
    action.type === (type as string);
  return <const>[creator, guard];
};
