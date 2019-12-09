import { Reducer } from "./reducer";

export interface Action<Type extends string, Payload, State> {
  type: Type;
  payload: Payload;
  reducer: Reducer<State, Payload>;
}

export type ActionType<T> = T extends Action<infer T, any, any> ? T : never;
export type ActionPayload<P> = P extends Action<string, infer P, any>
  ? P
  : never;
export type ActionState<S> = S extends Action<string, any, infer S> ? S : never;
