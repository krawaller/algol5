import { Action, ActionState } from "./action";
import { Reducer } from "./reducer";

export interface ActionCreator<A extends Action<string, any, any>> {
  actionType: A["type"];
  (payload: A["payload"] extends undefined ? void : A["payload"]): {
    type: A["type"];
    payload: A["payload"];
    reducer: Reducer<ActionState<A>, A["payload"]>;
  };
}
