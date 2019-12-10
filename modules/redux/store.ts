import { createStore, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";
import { createConsequenceMiddleware } from "./consequenceMiddleware";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { AppState } from "./types";

export const makeStore = () => {
  const consMdl = createConsequenceMiddleware(
    ({ action }) => (action.consequence ? [action.consequence] : []),
    {}
  );
  return createStore(
    reducer as Reducer<AppState, any>,
    initialState,
    applyMiddleware(thunk, consMdl)
  );
};
