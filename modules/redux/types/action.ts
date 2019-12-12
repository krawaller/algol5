import { Consequence } from "./consequence";

export interface Action<
  Type extends string,
  Payload,
  State extends object,
  Deps extends object = {}
> {
  type: Type;
  payload: Payload;
  reducer: (
    state: State,
    payload: Payload extends undefined ? void : Payload
  ) => State;
  consequence?: Consequence<State, Deps>;
  sender?: string;
}

export type AnyAction = Action<string, any, any, any>;
export type ActionState<A> = A extends Action<string, any, infer S> ? S : never;
export type ActionDeps<A> = A extends Action<string, any, any, infer D>
  ? D
  : never;
