import { createStore, applyMiddleware, Reducer } from "redux";
import thunk from "redux-thunk";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { AppState } from "./types";

export const makeStore = () =>
  createStore(
    reducer as Reducer<AppState, any>,
    initialState,
    applyMiddleware(thunk)
  );
