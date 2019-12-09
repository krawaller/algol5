import { Action, ActionState } from "./action";

export type ActionTest<A extends Action<string, any, any>> = {
  description: string;
  previous: ActionState<A>;
  expected: ActionState<A>;
} & (A["payload"] extends undefined
  ? {
      payload?: undefined;
    }
  : {
      payload: A["payload"];
    });
