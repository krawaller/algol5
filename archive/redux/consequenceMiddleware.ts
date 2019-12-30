import { ConsequenceGetter } from "./types/consequence";
import { Middleware } from "redux";

export const createConsequenceMiddleware = <S extends object, D extends object>(
  consGetter: ConsequenceGetter<S, D>,
  deps: D
): Middleware => ({ dispatch, getState }) => next => action => {
  next(action);
  const consequences = consGetter({ action, getState, deps });
  for (const cons of consequences) {
    cons({
      action,
      getState,
      deps,
      dispatch: a =>
        dispatch({
          ...a,
          sender: `CONSEQUENCE(${cons.displayName || cons.name})`,
        }),
    });
  }
};
