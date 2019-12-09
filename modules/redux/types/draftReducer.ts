import { Draft } from "immer";
import { Action, ActionPayload, ActionState } from "./action";

type PayloadDraftReducer<State, Payload> = (
  draft: Draft<State>,
  payload: Payload
) => void;
type NakedDraftReducer<State> = (draft: Draft<State>) => void;

export type DraftReducer<A extends Action<string, any, any>> = ActionPayload<
  A
> extends undefined
  ? NakedDraftReducer<ActionState<A>>
  : PayloadDraftReducer<ActionState<A>, ActionPayload<A>>;
