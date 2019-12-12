import { Action, AnyAction, AppState } from "./types";
import { produce, Draft } from "immer";

type FactoryOpts<Payload, T> = {
  type: T;
  reducer: (draft: Draft<AppState>, payload: Payload) => void | AppState;
};

export const factory = <Payload = void, Type extends string = "UNKNOWN">({
  type,
  reducer,
}: FactoryOpts<Payload, Type>) => {
  type A = Action<Type, Payload, AppState>;
  const creator = function(payload: Payload) {
    return {
      type,
      payload,
      reducer: (state: AppState, payload: Payload) =>
        produce(state, draft => reducer(draft, payload)),
    };
  };

  creator.actionType = type;
  const guard = (action: AnyAction): action is A =>
    action.type === (type as string);
  return [creator, guard] as const;
};
