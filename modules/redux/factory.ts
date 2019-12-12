import { Action, AnyAction, AppState } from "./types";
import { produce, Draft } from "immer";

type FactoryOpts<Payload, T> = {
  type: T;
  reducer: (draft: Draft<AppState>, payload: Payload) => void | AppState;
};

export const factory = <Payload, Type extends string>({
  type,
  reducer,
}: FactoryOpts<Payload, Type>) => {
  type P = Payload extends unknown ? void : Payload;
  type A = Action<Type, P, AppState>;
  const creator = function(payload: P) {
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
