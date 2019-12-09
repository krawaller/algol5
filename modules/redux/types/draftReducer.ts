import { Draft } from "immer";
import { Action, ActionState } from "./action";

export type DraftReducer<A extends Action<string, any, any>> = (
  draft: Draft<ActionState<A>>,
  payload: A["payload"] extends undefined ? void : A["payload"]
) => void;
