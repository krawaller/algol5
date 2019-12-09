export type Reducer<State, Payload> = (
  state: State,
  payload: Payload extends undefined ? void : Payload
) => State;
