import { Draft } from "immer";

type Guard<T> = (input: any) => input is T;

export type ReducingActionFactory<
  A extends ReducingAction<string, any, AppState>
> = (
  type: ReducingActionType<A>,
  reducer: DraftReducer<A>
) => [ReducingActionCreator<A>, Guard<A>];

export type ReducingActionCreator<
  A extends ReducingAction<string, any, AppState>
> = ReducingActionPayload<A> extends undefined
  ? NakedActionCreator<A>
  : PayloadActionCreator<A>;

export interface PayloadActionCreator<
  A extends ReducingAction<string, any, AppState>
> extends WithActionType<ReducingActionType<A>> {
  (payload: ReducingActionPayload<A>): {
    type: ReducingActionType<A>;
    payload: ReducingActionPayload<A>;
    reducer: Reducer<ReducingActionState<A>, ReducingActionPayload<A>>;
  };
}

import { WithAlgolDemoState } from "./slices/demo/types";
export type AppState = WithAlgolDemoState;

export interface NakedActionCreator<
  A extends ReducingAction<string, undefined, AppState>
> extends WithActionType<ReducingActionType<A>> {
  (): {
    type: ReducingActionType<A>;
    payload: undefined;
    reducer: Reducer<ReducingActionState<A>, undefined>;
  };
}

interface WithActionType<T = string> {
  actionType: T;
}

export interface ReducingAction<Type extends string, Payload, State> {
  type: Type;
  payload: Payload;
  reducer: Reducer<State, Payload>;
}

export type ReducingActionType<T> = T extends ReducingAction<infer T, any, any>
  ? T
  : never;
export type ReducingActionPayload<P> = P extends ReducingAction<
  string,
  infer P,
  any
>
  ? P
  : never;
export type ReducingActionState<S> = S extends ReducingAction<
  string,
  any,
  infer S
>
  ? S
  : never;

type PayloadReducer<State, Payload> = (state: State, payload: Payload) => State;
type NakedReducer<State> = (state: State) => State;
export type Reducer<State, Payload> = Payload extends undefined
  ? NakedReducer<State>
  : PayloadReducer<State, Payload>;

type PayloadDraftReducer<State, Payload> = (
  draft: Draft<State>,
  payload: Payload
) => void;
type NakedDraftReducer<State> = (draft: Draft<State>) => void;

export type DraftReducer<
  A extends ReducingAction<string, any, AppState>
> = ReducingActionPayload<A> extends undefined
  ? NakedDraftReducer<ReducingActionState<A>>
  : PayloadDraftReducer<ReducingActionState<A>, ReducingActionPayload<A>>;

export type ReducingActionTest<
  A extends ReducingAction<string, any, AppState>
> = ReducingActionPayload<A> extends undefined
  ? ReducingNakedActionTest<A>
  : ReducingPayloadActionTest<A>;

export type ReducingNakedActionTest<
  A extends ReducingAction<string, undefined, AppState>
> = {
  description: string;
  previous: ReducingActionState<A>;
  expected: ReducingActionState<A>;
};

export type ReducingPayloadActionTest<
  A extends ReducingAction<string, any, AppState>
> = ReducingNakedActionTest<A> & {
  payload: ReducingActionPayload<A>;
};
