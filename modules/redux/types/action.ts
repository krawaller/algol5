import { Reducer } from "./reducer";
import { Consequence } from "./consequence";

export interface Action<
  Type extends string,
  Payload,
  State extends object,
  Deps extends object = {}
> {
  type: Type;
  payload: Payload;
  reducer: Reducer<State, Payload>;
  consequence?: Consequence<State, Deps>;
  sender?: string;
}

export type ActionState<S> = S extends Action<string, any, infer S> ? S : never;
export type ActionDeps<A> = A extends Action<string, any, any, infer D>
  ? D
  : never;
