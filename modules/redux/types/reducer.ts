type PayloadReducer<State, Payload> = (state: State, payload: Payload) => State;
type NakedReducer<State> = (state: State) => State;
export type Reducer<State, Payload> = Payload extends undefined
  ? NakedReducer<State>
  : PayloadReducer<State, Payload>;
