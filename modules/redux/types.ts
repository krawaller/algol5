import { Draft } from "immer";

export interface ReducingAction<Type, Payload, State> {
  type: Type;
  payload: Payload;
  reducer: Reducer<State, Payload>;
}

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
export type DraftReducer<State, Payload> = Payload extends undefined
  ? NakedDraftReducer<State>
  : PayloadDraftReducer<State, Payload>;
