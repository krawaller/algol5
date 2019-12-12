import { Action, ActionState } from "./action";

export type ActionTest<A extends Action<string, any, any>> = {
  description: string;
  previous: Partial<ActionState<A>>;
  expected: Partial<ActionState<A>>;
} & (A["payload"] extends void
  ? {
      payload?: undefined;
    }
  : {
      payload: A["payload"];
    });
