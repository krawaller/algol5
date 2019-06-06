import { createStore, applyMiddleware, Reducer, Action } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { AppState } from "./types";

export const store = createStore(
  reducer as Reducer<AppState, Action<any>>,
  initialState,
  applyMiddleware(thunk)
);
