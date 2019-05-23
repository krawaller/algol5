import { ReducingAction, ReducingActionState } from "./types";

export const reducer = <A extends ReducingAction<string, any, object>>(
  state: ReducingActionState<A>,
  { reducer, payload }: A
): ReducingActionState<A> =>
  reducer
    ? ((reducer(state, payload) as unknown) as ReducingActionState<A>)
    : state;
