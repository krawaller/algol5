import { createStore, applyMiddleware, Reducer, compose } from "redux";
import thunk from "redux-thunk";
import { createConsequenceMiddleware } from "./consequenceMiddleware";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { AppState, AppDeps, ConsequenceGetter } from "./types";
import { appDeps } from "./appDeps";

const consGetter: ConsequenceGetter<AppState, AppDeps> = ({ action }) =>
  action.consequence ? [action.consequence] : [];

export const makeStore = () => {
  const consMdl = createConsequenceMiddleware<AppState, AppDeps>(
    consGetter,
    appDeps
  );
  const enhancers = [applyMiddleware(thunk, consMdl)];
  const devToolsExtension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
  return createStore(
    reducer as Reducer<AppState, any>,
    initialState,
    compose(...enhancers)
  );
};
