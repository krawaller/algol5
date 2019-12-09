import { Action, ActionState } from "./types";
import { initialState } from "./initialState";

export const reducer = <A extends Action<string, any, object>>(
  state: ActionState<A> | undefined = (initialState as unknown) as ActionState<
    A
  >,
  { reducer, payload }: A
): ActionState<A> | undefined =>
  reducer ? ((reducer(state, payload) as unknown) as ActionState<A>) : state;
