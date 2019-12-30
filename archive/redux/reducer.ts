import { Action, ActionState } from "./types";
import { initialState } from "./initialState";

export const reducer = <A extends Action<string, any, object>>(
  state: ActionState<A> | undefined = (initialState as unknown) as ActionState<
    A
  >,
  action: A
): ActionState<A> | undefined => {
  const { reducer, payload } = action;
  return reducer
    ? ((reducer(state, payload) as unknown) as ActionState<A>)
    : state;
};
