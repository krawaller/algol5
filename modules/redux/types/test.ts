import { Action, ActionPayload, ActionState } from "./action";

export type ActionTest<A extends Action<string, any, any>> = ActionPayload<
  A
> extends undefined
  ? NakedActionTest<A>
  : PayloadActionTest<A>;

export type NakedActionTest<A extends Action<string, undefined, any>> = {
  description: string;
  previous: ActionState<A>;
  expected: ActionState<A>;
};

export type PayloadActionTest<
  A extends Action<string, any, any>
> = NakedActionTest<A> & {
  payload: ActionPayload<A>;
};
