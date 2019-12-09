import { Reducer } from "./reducer";

export interface Action<Type extends string, Payload, State> {
  type: Type;
  payload: Payload;
  reducer: Reducer<State, Payload>;
}

export type ActionState<S> = S extends Action<string, any, infer S> ? S : never;
