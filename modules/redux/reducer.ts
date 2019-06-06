import { ReducingAction, ReducingActionState } from "./types";
import { initialState } from "./initialState";

export const reducer = <A extends ReducingAction<string, any, object>>(
  state:
    | ReducingActionState<A>
    | undefined = (initialState as unknown) as ReducingActionState<A>,
  { reducer, payload }: A
): ReducingActionState<A> | undefined =>
  reducer
    ? ((reducer(state, payload) as unknown) as ReducingActionState<A>)
    : state;
