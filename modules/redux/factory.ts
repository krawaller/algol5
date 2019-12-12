import { Action, AnyAction, AppState, Consequence, AppDeps } from "./types";
import { produce, Draft } from "immer";

type FactoryOpts<Payload, T extends string> = {
  type: T;
  reducer: (draft: Draft<AppState>, payload: Payload) => void | AppState;
  consequence?: Consequence<AppState, AppDeps, Payload, T>;
};

export const factory = <Payload = void, Type extends string = "UNKNOWN">({
  type,
  reducer,
  consequence,
}: FactoryOpts<Payload, Type>) => {
  type A = Action<Type, Payload, AppState, AppDeps>;
  const creator = function(payload: Payload) {
    return {
      type,
      payload,
      consequence,
      reducer: (state: AppState, payload: Payload) =>
        produce(state, draft => reducer(draft, payload)),
    };
  };

  creator.actionType = type;
  const guard = (action: any): action is A => action.type === (type as string);
  return [creator, guard] as const;
};
