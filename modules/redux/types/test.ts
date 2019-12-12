import { Action, ActionState } from "./action";
import { AppState } from "./appState";

export type ActionTest<A extends Action<string, any, any>> = {
  description: string;
  previous: Partial<AppState>;
  expected: Partial<AppState>;
} & (A["payload"] extends void
  ? {
      payload?: undefined;
    }
  : {
      payload: A["payload"];
    });
