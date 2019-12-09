import { ActionCreator } from "./creator";
import { ActionType, Action } from "./action";
import { DraftReducer } from "./draftReducer";

type Guard<T> = (input: any) => input is T;

export type ActionFactory<A extends Action<string, any, any>> = (
  type: ActionType<A>,
  reducer: DraftReducer<A>
) => [ActionCreator<A>, Guard<A>];
